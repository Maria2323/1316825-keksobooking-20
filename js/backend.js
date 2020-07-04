'use strict';

(function () {
  window.load = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var statusCode = {
      OK: 200
    };
    var URL = 'https://javascript.pages.academy/keksobooking/data';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.statusText);
      }
    });
    xhr.open('GET', URL);
    xhr.send(data);
  };
})();
