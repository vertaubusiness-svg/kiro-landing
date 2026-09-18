function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

export async function onRequestPost({ request }) {
  let data;
  try {
    data = await request.json();
  } catch (e) {
    return json(400, { ok: false, error: 'invalid_body' });
  }

  const shopName = (data.shopName || '').toString().trim().slice(0, 120);
  const contact = (data.contact || '').toString().trim().slice(0, 160);
  const website = (data.website || '').toString().trim();

  if (website) {
    return json(200, { ok: true });
  }
  if (!shopName || !contact) {
    return json(400, { ok: false, error: 'missing_fields' });
  }

  return json(200, { ok: true });
}
