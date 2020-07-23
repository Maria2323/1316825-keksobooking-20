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
  var filterFeaturesHousing = mapFilters.querySelector('#housing-features');

  var priceScale = {
    'any': {
      min: 0,
      max: Infinity
    },
    'middle': {
      min: 10000,
      max: 50000
    },
    'low': {
      min: 0,
      max: 10000
    },
    'high': {
      min: 50000,
      max: Infinity
    }
  };

  var getCoordMainPin = function () {
    var pinCoordinatesX;
    var pinCoordinatesY;
    if (!map.classList.contains('map--faded')) {
      pinCoordinatesX =
        (window.data.MAIN_PIN_X + (window.data.MAIN_PIN_WIDTH / 2));
      pinCoordinatesY =
        (window.data.MAIN_PIN_Y + window.data.MAIN_PIN_ACTIVE_HEIGHT);
      inputAddress.value =
        (window.data.MAIN_PIN_X + (window.data.MAIN_PIN_WIDTH / 2)) + ','
        + (window.data.MAIN_PIN_Y + window.data.MAIN_PIN_ACTIVE_HEIGHT);
    } else {
      pinCoordinatesX =
        (window.data.MAIN_PIN_X + (window.data.MAIN_PIN_WIDTH / 2));
      pinCoordinatesY =
        (window.data.MAIN_PIN_Y + (window.data.MAIN_PIN_HEIGHT / 2));
      inputAddress.value =
        (window.data.MAIN_PIN_X + (window.data.MAIN_PIN_WIDTH / 2)) + ','
        + (window.data.MAIN_PIN_Y + (window.data.MAIN_PIN_HEIGHT / 2));
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

  var updateRentals = window.debounce(function () {
    removePins();
    removeCard();
    var rentalsFiltering = rentals.filter(function (it) {
      return it.offer;
    });
    var filtering = function (it, input, key) {
      if (input.value === 'any') {
        return it;
      }
      return it[key].toString() === input.value;
    };
    var filteringByTypeHousing = rentalsFiltering.filter(function (it) {
      return filtering(it.offer, filterTypeHousing, 'type');
    });
    var filteringByPriceHousing = function (it) {
      var filteredPrice = priceScale[filterPriceHousing.value];
      return ((it.offer.price >= filteredPrice.min) && (it.offer.price <= filteredPrice.max));
    };
    var filteringByRoomsHousing = function (it) {
      return filtering(it.offer, filterRoomsHousing, 'rooms');
    };
    var filteringByGuestsHousing = function (it) {
      return filtering(it.offer, filterGuestsHousing, 'guests');
    };

    var filteringByFeaturesHousing = function (it) {
      var checkedFeatures = filterFeaturesHousing.querySelectorAll(':checked');
      return Array.from(checkedFeatures).every(function (elm) {
        return it.offer.features.includes(elm.value);
      });
    };
    var filteredRentals = filteringByTypeHousing
        .filter(filteringByPriceHousing)
        .filter(filteringByRoomsHousing)
        .filter(filteringByGuestsHousing)
        .filter(filteringByFeaturesHousing);
    window.addRentalAds(filteredRentals);
  });

  mapFilters.addEventListener('change', updateRentals);

  var activatePage = function () {
    map.classList.remove('map--faded');
    mapFilters.classList.remove('ad-form--disabled');
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < formFieldsets.length; i++) {
      formFieldsets[i].disabled = false;
    }
    window.backend.load(function (data) {
      rentals = data;
      window.addRentalAds(rentals);
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
    if (event.button === 0 && map.classList.contains('map--faded')) {
      activatePage();
    }
  });

  mapPinMain.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && map.classList.contains('map--faded')) {
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
        PinCoord.x < window.data.MAP_AREA.xMin ||
        PinCoord.x > window.data.MAP_AREA.xMax;
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
  window.map = {
    deactivatePage: deactivatePage,
    removePins: removePins,
    removeCard: removeCard
  };
})();
