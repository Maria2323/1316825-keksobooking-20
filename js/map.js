'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinListElement = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapPinMain = document.querySelector('.map__pin--main');
  var inputAddress = adForm.querySelector('input[name = "address"]');
  var rentals = [];
  var filterTypeHousing = mapFilters.querySelector('#housing-type');
  var filterPriceHousing = mapFilters.querySelector('#housing-price');
  var filterRoomsHousing = mapFilters.querySelector('#housing-rooms');
  var filterGuestsHousing = mapFilters.querySelector('#housing-guests');
  var filterFeaturesHousing = mapFilters.querySelector('#housing-type');

  var getCoordMainPin = function () {
    var pinCoordinatesX;
    var pinCoordinatesY;
    if (!map.classList.contains('map--faded')) {
      pinCoordinatesX = (570 + (window.data.MAIN_PIN_WIDTH / 2));
      pinCoordinatesY = (375 + window.data.MAIN_PIN_ACTIVE_HEIGHT);
      inputAddress.value = (570 + (window.data.MAIN_PIN_WIDTH / 2)) + ',' + (375 + window.data.MAIN_PIN_ACTIVE_HEIGHT);
    } else {
      pinCoordinatesX = (570 + (window.data.MAIN_PIN_WIDTH / 2));
      pinCoordinatesY = (375 + (window.data.MAIN_PIN_HEIGHT / 2));
      inputAddress.value = (570 + (window.data.MAIN_PIN_WIDTH / 2)) + ',' + (375 + (window.data.MAIN_PIN_HEIGHT / 2));
    }
    return {
      x: pinCoordinatesX,
      y: pinCoordinatesY
    };
  };

  var displayDataAddress = function () {
    var pinCoordinates = getCoordMainPin();
    inputAddress.value = pinCoordinates.x + ',' + pinCoordinates.y;
  };

  var getRank = function (rental) {
    var rank = 0;

    if (rental.offer.type === filterTypeHousing.value) {
      rank += 1;
    }
    if (rental.offer.price === filterPriceHousing.value) {
      rank += 1;
    }
    if (rental.offer.rooms === filterRoomsHousing.value) {
      rank += 1;
    }
    if (rental.offer.guests === filterGuestsHousing.value) {
      rank += 1;
    }
    if (rental.offer.features === filterFeaturesHousing.value) {
      rank += 1;
    }

    return rank;
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };
  var removeCard = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
  };
  var updateRentals = function () {
    removePins();
    removeCard();
    window.addRentalAds(rentals.slice(0).sort(function (left, right) {
      return getRank(right) - getRank(left);
    }));
  };

  mapFilters.addEventListener('change', updateRentals);

  var activatePage = function () {
    map.classList.remove('map--faded');
    mapFilters.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
    window.load(function (data) {
      rentals = data;
      updateRentals();
    }, function () {});
    displayDataAddress();
  };

  var deactivatePage = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    mapPinListElement.disabled = true;
    mapFilters.classList.add('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = true;
    }
    displayDataAddress();
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

      var PinCoord = {
        x: (mapPinMain.offsetLeft - shift.x) + (window.data.MAIN_PIN_WIDTH / 2),
        y: (mapPinMain.offsetTop - shift.y) + window.data.MAIN_PIN_ACTIVE_HEIGHT
      };

      var isCursorOutside = function () {
        return PinCoord.y < window.data.MAP_AREA.yMin ||
        PinCoord.y > window.data.MAP_AREA.yMax ||
        PinCoord.x < 0 ||
        PinCoord.x > 1200;
      };
      if (isCursorOutside()) {
        mapPinMain.style.top = mapPinMain.offsetTop + 'px';
        mapPinMain.style.left = mapPinMain.offsetLeft + 'px';
        startCoords = {
          x: moveEvt.clientX - shift.x,
          y: moveEvt.clientY - shift.y
        };
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };
      }
      inputAddress.value = PinCoord.x + ',' + PinCoord.y;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  window.deactivatePage = deactivatePage;
})();
