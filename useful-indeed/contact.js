/*!
 * useful-indeed — contact form
 * Master copy: WORKSPACE-do-not-upload/shared/useful-indeed/contact.js (deploy.ps1 copies it everywhere).
 *
 * Messages are delivered to your inbox by Web3Forms (https://web3forms.com).
 * 1. Go to web3forms.com → "Create Access Key", enter the email that should receive messages.
 * 2. Paste the key you receive below, replacing PASTE-YOUR-WEB3FORMS-ACCESS-KEY.
 * The key is safe to be public: it can only send messages to your inbox.
 */
(function () {
  "use strict";
  var WEB3FORMS_ACCESS_KEY = "2d98fe4b-2366-4e33-9aa5-a0e1a8b95558";

  function ready(fn) { if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn); else fn(); }
  ready(function () {
    var form = document.getElementById("ui-contact");
    if (!form) return;
    var out = form.querySelector(".cf-status");
    var btn = form.querySelector("button[type=submit]");
    var configured = WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.indexOf("PASTE-") !== 0;

    function status(msg, kind) { out.textContent = msg; out.className = "cf-status " + (kind || ""); }

    var openedAt = Date.now();
    var COOLDOWN = 60 * 1000;
    function lastSent() { try { return +sessionStorage.getItem("ui-contact-sent") || 0; } catch (e) { return 0; } }
    function markSent() { try { sessionStorage.setItem("ui-contact-sent", String(Date.now())); } catch (e) {} }
    function fakeOk() { form.reset(); status("Thank you! Your message was sent. We'll get back to you by email.", "ok"); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      // --- spam guards (invisible to real people) ---
      if (form.botcheck && form.botcheck.checked) { fakeOk(); return; }  // bots tick hidden boxes
      if (Date.now() - openedAt < 4000) { fakeOk(); return; }           // filled in faster than a human can type
      if (!form.reportValidity()) return;
      var links = (form.message.value.match(/https?:\/\/|www\./gi) || []).length;
      if (links > 2) { status("Please include no more than 2 links in your message.", "err"); return; }
      if (form.message.value.trim().length < 10) { status("Please write a little more so I can help.", "err"); return; }
      if (Date.now() - lastSent() < COOLDOWN) { status("Thanks — your last message was just sent. Please wait a minute before sending another.", "err"); return; }
      if (!configured) { status("The contact form isn't connected yet. Please try again later.", "err"); return; }

      var data = {
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: "[" + (form.dataset.site || "useful-indeed") + "] " + form.topic.value + " — from " + form.name.value,
        from_name: "useful-indeed contact form",
        site: form.dataset.site || "",
        page: location.href,
        name: form.name.value,
        email: form.email.value,
        topic: form.topic.value,
        message: form.message.value,
        botcheck: false
      };
      btn.disabled = true; status("Sending…", "");
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      }).then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && res.j.success !== false) {
            markSent(); fakeOk();
          } else {
            status("Sorry, the message couldn't be sent" + (res.j.message ? " (" + res.j.message + ")" : "") + ". Please try again.", "err");
          }
        })
        .catch(function () { status("Sorry, the message couldn't be sent. Check your connection and try again.", "err"); })
        .then(function () { btn.disabled = false; });
    });
  });
})();
