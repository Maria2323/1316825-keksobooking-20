'use strict';

(function () {
  var mapPinListElement = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('input[name = "address"]');

  var activatePage = function () {
    window.data.map.classList.remove('map--faded');
    mapFilters.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    inputAddress.disabled = true;
    inputAddress.value = (570 + (window.data.MAIN_PIN_WIDTH / 2)) + ',' + (375 + (window.data.MAIN_PIN_HEIGHT + 22));
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
    window.addRentalAds(mapPinListElement);
  };

  var deactivatePage = function () {
    window.data.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinListElement.disabled = true;
    mapFilters.classList.add('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }
    inputAddress.disabled = true;
    inputAddress.value = (570 + (window.data.MAIN_PIN_WIDTH / 2)) + ',' + (375 + (window.data.MAIN_PIN_HEIGHT / 2));
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

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var PinCoord = {
        x: (mapPinMain.offsetLeft - shift.x) + (window.data.MAIN_PIN_WIDTH / 2),
        y: (mapPinMain.offsetTop - shift.y) + window.data.MAIN_PIN_HEIGHT
      };
      if (PinCoord.y > 130 && PinCoord.y < 630) {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
      if (PinCoord.x > 0 && PinCoord.x < 1200) {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      inputAddress.value = PinCoord.x + ', ' + (PinCoord.y + 22);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
