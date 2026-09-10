// api.js
export async function apiCall(url, options = {}) {
    let res = await fetch(url, {
      ...options,
      credentials: "include"
    });
  
    // 🔥 if access token expired
    if (res.status === 401) {
      console.log("Access expired → refreshing...");
  
      await fetch("http://localhost:5000/refresh", {
        method: "POST",
        credentials: "include"
      });
  
      // retry original request
      res = await fetch(url, {
        ...options,
        credentials: "include"
      });
    }
  
    return res.json();
  }