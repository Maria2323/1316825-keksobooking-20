'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };
  window.backend = {
    load: function (onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var URL = 'https://javascript.pages.academy/keksobooking/data';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(xhr.statusText);
        }
      });
      xhr.open('GET', URL);
      xhr.send();
    },
    post: function (data, onSuccess, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var URL = 'https://javascript.pages.academy/keksobooking';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(xhr.statusText);
        }
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
