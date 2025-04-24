async function apiRequest(url, { method = "GET", headers = {}, body = null } = {}) {
  const fetch = (await import('node-fetch')).default;

  const options = { method, headers };
  if (body) options.body = body;

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Request failed: ${response.status} ${errorText}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return response.json();
  } else {
    return response.text();
  }
}

module.exports = { apiRequest };
