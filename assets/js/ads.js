(function () {
  var AD_KEY = '0904ad35441041fb9869e5eaf83d8b07';
  var AD_W = 300;
  var AD_H = 250;
  var fitted = [];

  /* Responsif: skala iklan mengikuti lebar layar, tanpa memotong isi. */
  function fit(slot, wrap) {
    var avail = slot.clientWidth || 300;
    var limit = Math.max(160, Math.min(avail, (window.innerWidth || 320) - 24));
    var scale = Math.min(1, limit / AD_W);
    wrap.style.transform = 'scale(' + scale + ')';
    wrap.style.height = (AD_H * scale) + 'px';
  }

  function fitAll() {
    for (var i = 0; i < fitted.length; i++) {
      try { fit(fitted[i][0], fitted[i][1]); } catch (e) {}
    }
  }

  function inject(slot) {
    if (!slot || slot.querySelector('iframe')) return;
    slot.style.cssText = 'display:block!important;text-align:center;margin:16px auto;background:transparent!important';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'width:' + AD_W + 'px;margin:0 auto;transform-origin:top center;background:transparent';
    var frame = document.createElement('iframe');
    frame.srcdoc =
      '<!DOCTYPE html><html><head><style>body{margin:0;background:transparent}</style></head><body>' +
      '<script>atOptions={key:"' + AD_KEY + '",format:"iframe",height:' + AD_H + ',width:' + AD_W + ',params:{}};<\/script>' +
      '<script src="https://www.highperformanceformat.com/' + AD_KEY + '/invoke.js"><\/script>' +
      '</body></html>';
    frame.width = AD_W;
    frame.height = AD_H;
    frame.frameBorder = '0';
    frame.scrolling = 'no';
    frame.allowTransparency = 'true';
    frame.loading = 'lazy';
    frame.style.cssText = 'border:none;display:block;margin:auto;background:transparent';
    wrap.appendChild(frame);
    slot.appendChild(wrap);
    fitted.push([slot, wrap]);
    fit(slot, wrap);
  }

  function init() {
    var slots = document.querySelectorAll('.ad-slot');
    for (var i = 0; i < slots.length; i++) {
      inject(slots[i]);
    }
  }

  if (typeof MutationObserver !== 'undefined') {
    var mo = new MutationObserver(function () { init(); });
    function arm() {
      try { mo.observe(document.body, { childList: true, subtree: true }); } catch (e) {}
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', arm);
    } else {
      arm();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  var resizeTimer = null;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitAll, 150);
  });

  window.AKMDAds = { reload: init, fitAll: fitAll };
  window.__AKMD_ADS_OK = 1;
})();
