'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  window.debounce = function (cb) {

    return function () {
      if (window.lastTimeout) {
        window.clearTimeout(window.lastTimeout);
      } else {
        DEBOUNCE_INTERVAL = 0;
      }
      window.lastTimeout = window.setTimeout(function () {
        cb();
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
