(function () {
  const configured = window.COMPLETION_IQ_API_BASE || "";
  const stored = localStorage.getItem("completionIqApiBase") || "";
  const base = (configured || stored || "").replace(/\/$/, "");
  window.COMPLETION_IQ_API_BASE = base;
  window.completionIqApiUrl = function (path) {
    return `${base}${path}`;
  };
  window.completionIqStaffApiKey = function () {
    return window.COMPLETION_IQ_STAFF_API_KEY || sessionStorage.getItem("completionIqStaffApiKey") || "";
  };
  window.completionIqSetStaffApiKey = function (value) {
    const key = String(value || "").trim();
    if (key) {
      sessionStorage.setItem("completionIqStaffApiKey", key);
    } else {
      sessionStorage.removeItem("completionIqStaffApiKey");
    }
  };
  window.completionIqAuthHeaders = function (headers) {
    const next = new Headers(headers || {});
    const key = window.completionIqStaffApiKey();
    if (key && !next.has("X-API-Key")) {
      next.set("X-API-Key", key);
    }
    return next;
  };
  window.completionIqFetch = function (input, options) {
    const next = { ...(options || {}) };
    next.headers = window.completionIqAuthHeaders(next.headers);
    return fetch(input, next);
  };
})();
