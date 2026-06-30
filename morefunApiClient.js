export const MOREFUN_API_BASE_URL =
  window.MOREFUN_API_BASE_URL ||
  localStorage.getItem("morefun_api_base_url") ||
  "https://script.google.com/macros/s/AKfycbzp2OzaZFFGpvtA0-DJwo2TjKa_4FG0grTH4gLJpNyQsIqHfpbjqUmgfUIVQmDDNFY0pA/exec";

export async function morefunAction(action, payload = {}, context = {}) {
  const response = await fetch(MOREFUN_API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ action, payload, context }),
    redirect: "follow"
  });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Invalid Apps Script response: ${text.slice(0, 300)}`);
  }
  if (!json.ok) {
    throw new Error(`${json.error?.code || "ERROR"}: ${json.error?.message || action}`);
  }
  return json.data;
}

export async function morefunHealthCheck() {
  const response = await fetch(MOREFUN_API_BASE_URL, {
    method: "GET",
    redirect: "follow"
  });
  const text = await response.text();
  return JSON.parse(text);
}
