(function () {
  'use strict';
  var KEY = 'xtra-poc-v1';
  var HASH = 'Q0cgTG95YWx0eSBTdGlqbg=='; // btoa('CG Loyalty Stijn')

  if (sessionStorage.getItem(KEY) === HASH) return;

  // Hide page instantly to avoid flash
  document.documentElement.style.visibility = 'hidden';

  function mount() {
    document.documentElement.style.visibility = '';

    var style = document.createElement('style');
    style.textContent = [
      '#xtra-auth-overlay{position:fixed;inset:0;z-index:999999;background:#0F0A1E;display:flex;align-items:center;justify-content:center;font-family:Inter,system-ui,sans-serif;}',
      '#xtra-auth-box{background:#1a1430;border:1px solid rgba(139,92,246,0.35);border-radius:20px;padding:48px 44px;width:100%;max-width:400px;text-align:center;box-shadow:0 32px 80px rgba(0,0,0,0.6);}',
      '#xtra-auth-logo{width:56px;height:56px;background:linear-gradient(135deg,#7C3AED,#4F46E5);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:26px;}',
      '#xtra-auth-title{font-size:20px;font-weight:800;color:#fff;margin-bottom:6px;}',
      '#xtra-auth-sub{font-size:13px;color:rgba(255,255,255,0.45);margin-bottom:32px;line-height:1.5;}',
      '#xtra-auth-input{width:100%;padding:13px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.07);color:#fff;font-size:14px;font-family:inherit;outline:none;box-sizing:border-box;transition:border-color .2s;text-align:center;letter-spacing:1px;}',
      '#xtra-auth-input:focus{border-color:#7C3AED;}',
      '#xtra-auth-input::placeholder{color:rgba(255,255,255,0.3);letter-spacing:0;}',
      '#xtra-auth-btn{margin-top:14px;width:100%;padding:13px;border-radius:10px;background:linear-gradient(135deg,#7C3AED,#4F46E5);color:#fff;font-size:14px;font-weight:700;border:none;cursor:pointer;font-family:inherit;transition:opacity .2s;}',
      '#xtra-auth-btn:hover{opacity:.9;}',
      '#xtra-auth-err{margin-top:12px;font-size:12px;color:#F87171;min-height:18px;}',
      '#xtra-auth-footer{margin-top:28px;font-size:11px;color:rgba(255,255,255,0.2);}',
      'body.xtra-locked{overflow:hidden!important;}'
    ].join('');
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'xtra-auth-overlay';
    overlay.innerHTML =
      '<div id="xtra-auth-box">' +
        '<div id="xtra-auth-logo">✦</div>' +
        '<div id="xtra-auth-title">Colruyt Group Loyalty POC</div>' +
        '<div id="xtra-auth-sub">Geef het wachtwoord in<br>om toegang te krijgen tot het platform</div>' +
        '<input id="xtra-auth-input" type="password" placeholder="Wachtwoord" autocomplete="off">' +
        '<button id="xtra-auth-btn" onclick="__xtraCheck()">Toegang krijgen →</button>' +
        '<div id="xtra-auth-err"></div>' +
        '<div id="xtra-auth-footer">Colruyt Group · Confidentieel · 2026</div>' +
      '</div>';

    document.body.classList.add('xtra-locked');
    document.body.appendChild(overlay);

    var inp = document.getElementById('xtra-auth-input');
    inp.focus();
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') window.__xtraCheck();
    });
  }

  window.__xtraCheck = function () {
    var val = document.getElementById('xtra-auth-input').value;
    if (btoa(val) === HASH) {
      sessionStorage.setItem(KEY, HASH);
      document.getElementById('xtra-auth-overlay').remove();
      document.body.classList.remove('xtra-locked');
    } else {
      var err = document.getElementById('xtra-auth-err');
      err.textContent = 'Ongeldig wachtwoord. Probeer opnieuw.';
      document.getElementById('xtra-auth-input').value = '';
      document.getElementById('xtra-auth-input').focus();
      setTimeout(function () { err.textContent = ''; }, 3000);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
