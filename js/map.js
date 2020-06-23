'use strict';

(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var mapPinListElement = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('input[name = "address"]');

  var activatePage = function () {
    map.classList.remove('map--faded');
    mapFilters.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    inputAddress.disabled = true;
    inputAddress.value = (570 + MAIN_PIN_WIDTH * 0.5) + ', ' + (375 + MAIN_PIN_HEIGHT + 5);
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
    window.addObjects(mapPinListElement);
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinListElement.disabled = true;
    mapFilters.classList.add('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }
    inputAddress.disabled = true;
    inputAddress.value = (570 + MAIN_PIN_WIDTH * 0.5) + ',' + (375 + MAIN_PIN_HEIGHT * 0.5);
  };

  deactivatePage();

  mapPinMain.addEventListener('mousedown', function (event) {
    if (event.button === 0) {
      activatePage();
    }
  });

  mapPinMain.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      activatePage();
    }
  });
})();