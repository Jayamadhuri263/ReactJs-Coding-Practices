export const MOBILITY_API_BASE = "http://localhost:8080";

export async function mobilityPost(path, body, options = {}) {
  const isForm = body instanceof FormData;
  const res = await fetch(`${MOBILITY_API_BASE}${path}`, {
    method: "POST",
    headers: isForm
      ? { ...options.headers }
      : { "Content-Type": "application/json", ...options.headers },
    body: isForm ? body : JSON.stringify(body),
  });
  return res;
}

export async function mobilityGet(path) {
  return fetch(`${MOBILITY_API_BASE}${path}`);
}

/** Multipart file POST with upload progress (matches Angular HttpRequest reportProgress). */
export function mobilityPostFileWithProgress({
  path,
  file,
  queryParam,
  queryValue,
  onProgress,
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const qs = `${encodeURIComponent(queryParam)}=${encodeURIComponent(
      String(queryValue ?? "")
    )}`;
    xhr.open("POST", `${MOBILITY_API_BASE}${path}?${qs}`);
    xhr.responseType = "json";
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((100 * e.loaded) / e.total));
      }
    };
    xhr.onload = () => {
      const body = xhr.response;
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(body);
      } else {
        const err =
          body && typeof body === "object"
            ? { status: xhr.status, ...body }
            : { status: xhr.status, message: xhr.statusText || "Upload failed" };
        reject(err);
      }
    };
    xhr.onerror = () => reject(new Error("Network error"));
    const fd = new FormData();
    fd.append("file", file);
    xhr.send(fd);
  });
}
