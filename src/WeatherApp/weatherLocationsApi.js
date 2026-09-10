/**
 * India states & cities via Countries Now (countriesnow.space) — no API key.
 *
 * States: POST /api/v0.1/countries/states  body: { country: "India" }
 *   → result.data.states — { name, state_code }[]
 *
 * Cities: POST /api/v0.1/countries/state/cities  body: { country: "India", state: "<state name>" }
 *   → result.data — string[] city names
 *
 * Responses are cached in localStorage (24h) to reduce traffic while developing.
 */

const CN_BASE = "https://countriesnow.space/api/v0.1";
const COUNTRY_NAME = "India";

const CACHE_PREFIX = "weatherapp-cn:v1:";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function readCache(key) {
  if (typeof localStorage === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { t, payload } = JSON.parse(raw);
    if (Date.now() - t > CACHE_TTL_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function writeCache(key, payload) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify({ t: Date.now(), payload }));
  } catch {
    /* quota */
  }
}

function mapStateRow(raw) {
  const name = raw.name ?? raw.state_name ?? String(raw);
  const code = raw.state_code ?? raw.code ?? name;
  return {
    state_name: name,
    state_code: String(code),
  };
}

/** POST /countries/states — same as StateSelector snippet */
export async function fetchStatesIndia() {
  const cacheKey = `${CACHE_PREFIX}states:${COUNTRY_NAME}`;
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const url = `${CN_BASE}/countries/states`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: COUNTRY_NAME,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`States failed (${response.status}): ${text}`);
  }

  const result = await response.json();
  if (result.error) {
    throw new Error(result.msg || "States API returned an error");
  }

  const rows = result?.data?.states;
  if (!Array.isArray(rows)) {
    throw new Error("Unexpected states response shape");
  }

  const mapped = rows.map(mapStateRow);
  writeCache(cacheKey, mapped);
  return mapped;
}

/**
 * POST /countries/state/cities — needs state name (e.g. Maharashtra), not code.
 */
export async function fetchCitiesIndia(stateName) {
  if (!stateName || !String(stateName).trim()) {
    return [];
  }

  const keyPart = encodeURIComponent(stateName.trim());
  const cacheKey = `${CACHE_PREFIX}cities:${COUNTRY_NAME}:${keyPart}`;
  const cached = readCache(cacheKey);
  if (cached) return cached;

  const url = `${CN_BASE}/countries/state/cities`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country: COUNTRY_NAME,
      state: stateName.trim(),
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Cities failed (${response.status}): ${text}`);
  }

  const result = await response.json();
  if (result.error) {
    throw new Error(result.msg || "Cities API returned an error");
  }

  const data = result?.data;
  const names = Array.isArray(data)
    ? data
    : Array.isArray(data?.cities)
      ? data.cities
      : [];

  const mapped = names
    .map((item, index) => {
      const cityName =
        typeof item === "string"
          ? item
          : item?.name ?? item?.city ?? String(item);
      return {
        city_name: cityName,
        city_id: index,
      };
    })
    .filter((c) => c.city_name);

  const seen = new Set();
  const deduped = mapped.filter((c) => {
    const k = c.city_name.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  const MAX = 400;
  const out = deduped.length > MAX ? deduped.slice(0, MAX) : deduped;
  writeCache(cacheKey, out);
  return out;
}
