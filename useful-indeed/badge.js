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
  var KOFI = "https://ko-fi.com/usefulindeed"; // tip jar, shown in every footer
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
    ".ui-vlog .ui-ft a img{width:18px;height:18px;border-radius:5px}" +
    ".ui-tipdlg .ui-tipgrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:4px 0 8px}.ui-tipdlg .ui-tipbox{border-radius:14px;padding:14px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}.ui-tipdlg .ui-tipbox b{font-size:15px;display:block}.ui-tipdlg .ui-tipbox small{font-size:12px;opacity:.7;display:block}.ui-tipdlg .ui-cup{width:120px;height:120px;margin:4px 0;display:block}.ui-tipdlg .ui-tipbtn{margin-top:auto;white-space:nowrap;font-size:13px!important;padding:10px 14px;border-radius:999px;font-weight:700;font-size:14px;text-decoration:none;display:inline-block}.ui-tipdlg .ui-qr{width:100%;max-width:200px;height:auto;border-radius:10px;background:#fff;padding:6px;image-rendering:pixelated;display:block}.ui-tipdlg .ui-tipnote{font-size:12px;text-align:center;margin:6px 0 0}@media (max-width:520px){.ui-tipdlg .ui-tipgrid{grid-template-columns:1fr}.ui-tipdlg .ui-cup{width:84px;height:84px}}";


  var cssDone = false;
  function ensureCss() { if (cssDone) return; cssDone = true; var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); }

  // Support pop-up: Ko-fi + GCash QR. Works on any page that loads this script.
  var CUP = "<svg class='ui-cup' viewBox='0 0 120 120' aria-hidden='true'>" +
    "<path d='M46 30c-4-6 4-10 0-16M60 30c-4-6 4-10 0-16M74 30c-4-6 4-10 0-16' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' opacity='.45'/>" +
    "<path d='M26 42h66v26c0 18-14 32-32 32h-2c-18 0-32-14-32-32z' fill='#ff5e5b'/>" +
    "<path d='M92 50h6c8 0 13 5 13 12s-5 12-13 12h-8' fill='none' stroke='#ff5e5b' stroke-width='7'/>" +
    "<path d='M59 84s-15-8-15-18c0-5 4-8 8-8 3 0 5 2 7 4 2-2 4-4 7-4 4 0 8 3 8 8 0 10-15 18-15 18z' fill='#fff'/>" +
    "<rect x='18' y='102' width='84' height='6' rx='3' fill='currentColor' opacity='.2'/></svg>";
  var tipDlg = null;
  function openTip(slot) {
    ensureCss();
    var p = palette(slot || document.body);
    if (!tipDlg) { tipDlg = document.createElement("dialog"); tipDlg.className = "ui-vlog ui-tipdlg"; document.body.appendChild(tipDlg); }
    tipDlg.style.cssText = "background:" + p.bg + ";color:" + p.fg + ";font-family:" + p.font + ";border:1px solid " + p.line;
    tipDlg.innerHTML =
      "<div class='ui-in'><div class='ui-hd'><img src='" + BASE + "logo.svg' alt=''><div><b>Support useful-indeed</b><small>Thank you for keeping the tools free!</small></div>" +
      "<button class='ui-x' aria-label='Close' style='background:" + p.soft + "'>×</button></div>" +
      "<div class='ui-tipgrid'>" +
        "<div class='ui-tipbox' style='border:1px solid " + p.line + "'><b>Ko-fi</b><small>PayPal or card, from anywhere</small>" + CUP +
        "<a class='ui-tipbtn' href='" + KOFI + "' target='_blank' rel='noopener' style='background:" + p.fg + ";color:" + p.bg + "'>Buy me a coffee ↗</a></div>" +
        "<div class='ui-tipbox' style='border:1px solid " + p.line + "'><b>GCash / InstaPay</b><small>Scan with GCash, Maya or your bank app</small>" +
        "<img class='ui-qr' src='" + BASE + "gcash-qr.png' alt='GCash QR code for donations' width='200' height='200' loading='lazy'></div>" +
      "</div><p class='ui-tipnote' style='opacity:.65'>Any amount helps. Donations are optional and don't unlock anything; every tool stays free.</p></div>";
    tipDlg.querySelector(".ui-x").onclick = function () { tipDlg.close(); };
    tipDlg.onclick = function (e) { if (e.target === tipDlg) tipDlg.close(); };
    if (tipDlg.showModal) tipDlg.showModal(); else tipDlg.setAttribute("open", "");
  }
  window.usefulSupport = openTip;
  // Any link with data-ui-support opens the pop-up (used on the main page).
  document.addEventListener("click", function (e) {
    var t = e.target.closest ? e.target.closest("[data-ui-support]") : null;
    if (t) { e.preventDefault(); openTip((t.closest && t.closest("footer, .ui-foot")) || document.body); }
  });

  var SOCIAL = [
    ["Facebook", "https://www.facebook.com/usefulindeed", "<path fill='currentColor' d='M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3z'/>"],
    ["Instagram", "https://www.instagram.com/usefulindeed/", "<rect x='3.5' y='3.5' width='17' height='17' rx='5' fill='none' stroke='currentColor' stroke-width='1.9'/><circle cx='12' cy='12' r='3.9' fill='none' stroke='currentColor' stroke-width='1.9'/><circle cx='17.2' cy='6.8' r='1.2' fill='currentColor'/>"],
    ["Telegram", "https://t.me/usefulindeed", "<path fill='currentColor' d='M20.7 4.3 2.9 11.2c-1 .4-1 1.6.1 1.9l4.4 1.4 1.7 5.3c.2.7 1.1.9 1.6.4l2.5-2.3 4.6 3.4c.6.4 1.4.1 1.6-.6l3-14.2c.2-.9-.7-1.6-1.7-1.2zM9.9 14.6l-.4 3.4-1.2-3.9 9.6-6.3-8 6.8z'/>"]
  ];

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
    ensureCss();

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
      var nav = foot.querySelector(".ui-foot-nav");
      if (nav && !nav.querySelector(".ui-tip")) {
        var tip = document.createElement("a");
        tip.className = "ui-tip"; tip.href = KOFI; tip.target = "_blank"; tip.rel = "noopener";
        tip.title = "Like these free tools? Buy me a coffee on Ko-fi";
        tip.innerHTML = "<span>Support</span><svg viewBox='0 0 24 24' aria-hidden='true'><path d='M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z' fill='#ff5e5b'/><path d='M17 10.5h1.5a2.5 2.5 0 0 1 0 5H17' fill='none' stroke='#ff5e5b' stroke-width='2'/><path d='M10.5 16.5s-3-1.7-3-3.6c0-1 .8-1.6 1.6-1.6.6 0 1 .4 1.4.8.4-.4.8-.8 1.4-.8.8 0 1.6.6 1.6 1.6 0 1.9-3 3.6-3 3.6z' fill='#fff'/></svg>";
        tip.addEventListener("click", function (e) { e.preventDefault(); openTip(foot); });
        nav.appendChild(tip);
      }
      if (nav && !nav.querySelector(".ui-soc")) {
        var soc = document.createElement("span");
        soc.className = "ui-soc"; soc.setAttribute("aria-label", "useful-indeed on social media");
        soc.innerHTML = SOCIAL.map(function (x) {
          return "<a href='" + x[1] + "' target='_blank' rel='noopener' aria-label='" + x[0] + "' title='" + x[0] + "'><svg viewBox='0 0 24 24' aria-hidden='true'>" + x[2] + "</svg></a>";
        }).join("");
        nav.appendChild(soc);
      }
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
