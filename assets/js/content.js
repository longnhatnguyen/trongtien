/**
 * Loads content.json (edited via /admin.html) and fills elements marked with:
 *   data-ct="text {path} text"  -> text template
 *   data-ci="path"               -> <img src>
 *   data-cbg="path"              -> background-image
 *   data-ch="path"               -> href
 * If the fetch fails (e.g. opened via file://), the HTML defaults stay as-is.
 */
(function () {
  function get(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
  }

  function fill(tpl, data) {
    let ok = true;
    const out = tpl.replace(/\{([\w.]+)\}/g, (_, p) => {
      const v = get(data, p);
      if (v == null) ok = false;
      return v == null ? '' : String(v);
    });
    return ok ? out : null;
  }

  function setText(el, text) {
    // Replace only the first direct text node so nested markup survives.
    const node = Array.from(el.childNodes).find(n => n.nodeType === 3 && n.textContent.trim());
    if (node && el.children.length) node.textContent = text;
    else el.textContent = text;
  }

  function applyContent(data, root) {
    root = root || document;
    root.querySelectorAll('[data-ct]').forEach(el => {
      const tpl = el.getAttribute('data-ct').replace(/&amp;/g, '&');
      const text = fill(tpl, data);
      if (text != null) setText(el, text);
    });
    root.querySelectorAll('[data-ci]').forEach(el => {
      const v = get(data, el.getAttribute('data-ci'));
      if (v) el.setAttribute('src', v);
    });
    root.querySelectorAll('[data-cbg]').forEach(el => {
      const v = get(data, el.getAttribute('data-cbg'));
      if (v) el.style.backgroundImage = `url("${encodeURI(String(v)).replace(/"/g, '%22')}")`;
    });
    root.querySelectorAll('[data-ch]').forEach(el => {
      const v = get(data, el.getAttribute('data-ch'));
      if (window.safeUrl(v)) el.setAttribute('href', v);
    });
  }

  // Only allow http(s) links from admin-edited data (blocks javascript: URLs)
  window.safeUrl = (v) => typeof v === 'string' && /^https?:\/\//i.test(v.trim());
  window.applyContent = applyContent;
  window.WEDDING = null;
  const domReady = new Promise(ok => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ok, { once: true });
    else ok();
  });
  // Abort slow fetches so the invitation never stays inert on bad networks
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);

  // Resolves only AFTER the DOM has been filled, so main.js init always sees final content
  window.contentReady = fetch('content.json?t=' + Date.now(), { cache: 'no-store', signal: ctrl.signal })
    .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
    .then(data => domReady.then(() => {
      clearTimeout(timer);
      window.WEDDING = data;
      applyContent(data);
      if (data.groomName && data.brideName) {
        document.title = `THIỆP MỜI CƯỚI ${data.groomName} & ${data.brideName}`.toUpperCase();
      }
      return data;
    }))
    .catch(err => {
      console.warn('content.json not loaded, using HTML defaults:', err);
      return null;
    });
})();
