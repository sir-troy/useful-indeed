/*!
 * useful-indeed — shared footer + version log
 * Master copy: /shared/useful-indeed/badge.js (deploy.ps1 copies it into every tool).
 *
 * Every tool has, in this order:
 *   <link rel="stylesheet" href="useful-indeed/footer.css">   (in <head>)
 *   <script src="version-log.js"></script>                     (in <head>)
 *   <footer class="ui-foot"> … </footer>                         (end of <body>)
 *   <script src="useful-indeed/badge.js" defer></script>       (before </body>)
 */
(function () {
  "use strict";
  var HUB = "https://useful-indeed.com";
  var me = document.currentScript;
  var BASE = me && me.src ? me.src.replace(/[^\/]*$/, "") : "useful-indeed/";
  var LOG = window.USEFUL_VERSION_LOG || { app: document.title, entries: [] };
  var entries = (LOG.entries || []).slice();
  var latest = entries[0];

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtDate(d) {
    try {
      return new Date(d + "T00:00:00").toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
    } catch (e) { return d; }
  }
  function parseRGB(s) {
    var m = String(s).match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    var p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  }
  function lum(c) { return (0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b) / 255; }

  // Pick colours that belong to the page it sits in.
  function palette(slot) {
    var fg = parseRGB(getComputedStyle(slot).color) || { r: 20, g: 20, b: 20, a: 1 };
    var dark = lum(fg) > 0.55; // light text => dark page
    var bg = null, el = slot;
    while (el && el.nodeType === 1) {
      var c = parseRGB(getComputedStyle(el).backgroundColor);
      if (c && c.a > 0.9) { bg = c; break; }
      el = el.parentElement;
    }
    if (!bg || (lum(bg) > 0.5) === dark) bg = dark ? { r: 20, g: 20, b: 26 } : { r: 255, g: 255, b: 255 };
    var font = getComputedStyle(slot).fontFamily;
    return {
      bg: "rgb(" + bg.r + "," + bg.g + "," + bg.b + ")",
      fg: dark ? "#f2f2f5" : "#17171c",
      line: dark ? "rgba(255,255,255,.14)" : "rgba(0,0,0,.12)",
      soft: dark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)",
      font: font
    };
  }

  var css =
                                        "dialog.ui-vlog{position:fixed!important;inset:0!important;margin:auto!important;transform:none!important;border:0;padding:0!important;max-width:min(460px,calc(100vw - 32px))!important;width:100%!important;height:fit-content!important;min-height:0!important;max-height:none!important;border-radius:18px!important;box-shadow:0 30px 80px rgba(0,0,0,.35)!important;z-index:2147483647;overflow:hidden}" +
    "dialog.ui-vlog:not([open]){display:none!important}" +
    ".ui-vlog *{box-sizing:border-box;margin:0;letter-spacing:normal;text-transform:none;background:none;border:0;box-shadow:none;float:none;position:static;width:auto;height:auto;min-height:0;max-width:none}" +
    "dialog.ui-vlog::backdrop{background:rgba(8,8,12,.5);backdrop-filter:blur(3px)}" +
    ".ui-vlog .ui-in{padding:22px 22px 18px;max-height:min(78vh,640px);overflow:auto;text-align:left;line-height:1.5;font-size:15px}" +
    ".ui-vlog .ui-hd{display:flex;align-items:center;gap:12px;margin-bottom:16px}" +
    ".ui-vlog .ui-hd img{width:40px;height:40px;border-radius:10px}" +
    ".ui-vlog .ui-hd div{flex:1;min-width:0}" +
    ".ui-vlog .ui-hd b{display:block;font-size:18px;line-height:1.2}" +
    ".ui-vlog .ui-hd small{opacity:.65;font-size:13px}" +
    ".ui-vlog .ui-x{all:unset;cursor:pointer;width:32px;height:32px;border-radius:50%;display:grid;place-items:center;font-size:20px;line-height:1}" +
    ".ui-vlog ol{list-style:none;margin:0;padding:0 0 0 14px;position:relative!important}" +
    ".ui-vlog ol:before{content:'';position:absolute!important;left:4px;top:8px;bottom:8px;width:2px;border-radius:2px}" +
    ".ui-vlog li{position:relative!important;padding:0 0 16px 14px;list-style:none}" +
    ".ui-vlog li:before{content:'';position:absolute!important;left:-14px;top:6px;width:10px;height:10px;border-radius:50%}" +
    ".ui-vlog .ui-v{display:inline-block;font-weight:700;font-size:13px;padding:1px 9px;border-radius:99px;margin-right:8px}" +
    ".ui-vlog .ui-d{font-size:13px;opacity:.65}" +
    ".ui-vlog ul{margin:6px 0 0;padding-left:18px;list-style:disc}" +
    ".ui-vlog ul li{padding:0 0 2px;list-style:disc;display:list-item}.ui-vlog ul li:before{display:none}" +
    ".ui-vlog .ui-ft{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:12px;margin-top:4px;font-size:13px}" +
    ".ui-vlog .ui-ft a{color:inherit;display:inline-flex;align-items:center;gap:6px;text-decoration:none;font-weight:600}" +
    ".ui-vlog .ui-ft a img{width:18px;height:18px;border-radius:5px}";


  // Full-screen tools: the footer lives in a small panel opened from a bottom-right button.
  function floating(foot) {
    var pal = palette(foot);
    var panel = pal.bg.replace("rgb(", "rgba(").replace(")", ",.9)");
    if (!getComputedStyle(foot).getPropertyValue("--ui-panel").trim()) foot.style.setProperty("--ui-panel", panel);
    if (!foot.id) foot.id = "ui-foot";
    var t = document.createElement("button");
    t.type = "button"; t.className = "ui-foot-toggle";
    t.setAttribute("aria-label", "About this site, legal and version");
    t.setAttribute("aria-controls", foot.id); t.setAttribute("aria-expanded", "false");
    t.innerHTML = "<img src='" + BASE + "logo.svg' alt=''>";
    foot.parentNode.insertBefore(t, foot.nextSibling);
    if (!getComputedStyle(t).getPropertyValue("--ui-panel").trim()) t.style.setProperty("--ui-panel", pal.bg.replace("rgb(", "rgba(").replace(")", ",.55)"));
    function set(open) { foot.classList.toggle("ui-open", open); t.setAttribute("aria-expanded", open ? "true" : "false"); }
    t.addEventListener("click", function (e) { e.stopPropagation(); set(!foot.classList.contains("ui-open")); });
    foot.addEventListener("click", function (e) { e.stopPropagation(); });
    document.addEventListener("click", function () { set(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") set(false); });
  }

  function mount() {
    var slots = document.querySelectorAll(".ui-foot");
    if (!slots.length) return;
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    var dlg = null;
    function openLog(slot) {
      var p = palette(slot);
      if (!dlg) { dlg = document.createElement("dialog"); dlg.className = "ui-vlog"; document.body.appendChild(dlg); }
      dlg.style.cssText = "background:" + p.bg + ";color:" + p.fg + ";font-family:" + p.font + ";border:1px solid " + p.line;
      var items = entries.map(function (e, i) {
        return "<li><span class='ui-v' style='background:" + (i ? p.soft : p.fg) + ";color:" + (i ? p.fg : p.bg) + "'>v" + esc(e.version) + "</span>" +
          "<span class='ui-d'>" + esc(fmtDate(e.date)) + (i === 0 ? " · latest" : "") + "</span>" +
          "<ul>" + (e.notes || []).map(function (n) { return "<li>" + esc(n) + "</li>"; }).join("") + "</ul></li>";
      }).join("");
      dlg.innerHTML =
        "<div class='ui-in'><div class='ui-hd'><img src='logo.svg' alt=''><div><b>" + esc(LOG.app || document.title) + "</b><small>Version log</small></div>" +
        "<button class='ui-x' aria-label='Close' style='background:" + p.soft + "'>×</button></div>" +
        "<ol>" + (items || "<li>No entries yet.</li>") + "</ol>" +
        "<div class='ui-ft' style='border-top:1px solid " + p.line + "'><span style='opacity:.65'>One of the small tools on</span>" +
        "<a href='" + HUB + "'><img src='" + BASE + "logo.svg' alt=''>useful-indeed.com ↗</a></div></div>";
      var s2 = document.createElement("style");
      s2.textContent = ".ui-vlog ol:before{background:" + p.line + "}.ui-vlog li:before{background:" + p.bg + ";box-shadow:0 0 0 2px " + p.fg + "}";
      dlg.appendChild(s2);
      dlg.querySelector(".ui-x").onclick = function () { dlg.close(); };
      dlg.onclick = function (e) { if (e.target === dlg) dlg.close(); };
      if (dlg.showModal) dlg.showModal(); else dlg.setAttribute("open", "");
    }

    Array.prototype.forEach.call(slots, function (foot) {
      if (/\bui-foot--float\b/.test(foot.className)) floating(foot);
      var y = foot.querySelector("[data-ui-year]");
      if (y) y.textContent = Math.max(2026, new Date().getFullYear());
      var b = foot.querySelector("[data-ui-ver]");
      if (!b) return;
      if (latest) b.textContent = "v" + latest.version + " · Version log";
      b.addEventListener("click", function () { openLog(foot); });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
