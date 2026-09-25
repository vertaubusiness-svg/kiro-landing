const TRADES = new Set(['detailing', 'hair', 'nails', 'massage', 'fitness', 'food', 'retail', 'other']);

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

function isValidEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json(400, { ok: false, error: 'invalid_body' });
  }

  if ((data.hp || '').toString().trim()) {
    return json(200, { ok: true });
  }

  const email = (data.email || '').toString().trim().toLowerCase().slice(0, 200);
  const tradeRaw = (data.trade || '').toString().trim();
  const trade = TRADES.has(tradeRaw) ? tradeRaw : null;
  const lang = data.lang === 'ko' ? 'ko' : 'en';
  const consent = data.consent === true;
  const utmSource = (data.utm_source || '').toString().trim().slice(0, 100) || null;
  const utmCampaign = (data.utm_campaign || '').toString().trim().slice(0, 100) || null;

  if (!isValidEmail(email) || !consent) {
    return json(400, { ok: false, error: 'missing_fields' });
  }

  if (!env.DB) {
    console.error('DB binding is not set');
    return json(500, { ok: false, error: 'server_not_configured' });
  }

  try {
    await env.DB.prepare(
      `INSERT OR IGNORE INTO start_waitlist (email, trade, lang, consent, utm_source, utm_campaign)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
    ).bind(email, trade, lang, consent ? 1 : 0, utmSource, utmCampaign).run();
  } catch (e) {
    console.error('d1 insert error', e);
    return json(502, { ok: false, error: 'save_failed' });
  }

  return json(200, { ok: true });
}
