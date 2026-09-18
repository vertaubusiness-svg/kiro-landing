const RESEND_URL = 'https://api.resend.com/emails';
const NOTIFY_TO = 'hello@pobare.com';
const FROM = 'Pobare <hello@pobare.com>';

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

async function sendEmail(apiKey, payload) {
  const res = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    console.error('resend error', res.status, await res.text());
  }
  return res.ok;
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json(400, { ok: false, error: 'invalid_body' });
  }

  const shopName = (data.shopName || '').toString().trim().slice(0, 120);
  const contact = (data.contact || '').toString().trim().slice(0, 160);
  const instagram = (data.instagram || '').toString().trim().slice(0, 60);
  const website = (data.website || '').toString().trim();

  if (website) {
    return json(200, { ok: true });
  }
  if (!shopName || !contact) {
    return json(400, { ok: false, error: 'missing_fields' });
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return json(500, { ok: false, error: 'server_not_configured' });
  }

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

  const notifyOk = await sendEmail(apiKey, {
    from: FROM,
    to: [NOTIFY_TO],
    ...(isEmail ? { reply_to: contact } : {}),
    subject: `[Inquiry] ${shopName}`,
    html: `<p><b>Shop:</b> ${escapeHtml(shopName)}</p><p><b>Contact:</b> ${escapeHtml(contact)}</p>${instagram ? `<p><b>Instagram:</b> ${escapeHtml(instagram)}</p>` : ''}`,
  });

  if (!notifyOk) {
    return json(502, { ok: false, error: 'send_failed' });
  }

  if (isEmail) {
    await sendEmail(apiKey, {
      from: FROM,
      to: [contact],
      subject: 'Pobare — we got your message',
      html: `<p>Hi,</p><p>Thanks for reaching out about Pobare${shopName ? ` for ${escapeHtml(shopName)}` : ''}. We read every message ourselves — expect a reply within a day.</p><p>— Pobare</p>`,
    });
  }

  return json(200, { ok: true });
}
