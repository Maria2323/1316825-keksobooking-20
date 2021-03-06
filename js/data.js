'use strict';

(function () {
  var AVATARS =
    ['img/avatars/user01.png',
      'img/avatars/user02.png',
      'img/avatars/user03.png',
      'img/avatars/user04.png',
      'img/avatars/user05.png',
      'img/avatars/user06.png',
      'img/avatars/user07.png',
      'img/avatars/user08.png'];
  var TYPES =
    ['palace',
      'flat',
      'house',
      'bungalo'];
  var CHECKIN_CHECKOUTS =
    ['12:00',
      '13:00',
      '14:00'];
  var FEATURES =
    ['wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'];
  var PHOTOS =
    ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
      'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CONST = 8;
  var CONST_PINS = 5;
  var MAIN_PIN_WIDTH = 64;
  var MAIN_PIN_HEIGHT = 64;
  var MAIN_PIN_ACTIVE_HEIGHT = 80;
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var MAP_AREA = {
    yMin: 130,
    yMax: 630,
    xMin: 0,
    xMax: 1200
  };
  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;

  var getRandomElement = function (characteristic) {
    return characteristic[Math.round(Math.random() * (characteristic.length - 1))];
  };

  var createTitle = function () {
    return 'Предложение ' + Math.round((Math.random() + 0.1) * 10);
  };

  var createAddress = function () {
    var x = 10 * Math.round((Math.random() + 0.1) * 10);
    var y = 5 * Math.round((Math.random() + 0.1) * 10);
    return '{' + x + ', ' + y + '}';
  };

  var createPrice = function () {
    var price = 500 * Math.round((Math.random() + 0.1) * 10);
    return price + '₽/ночь';
  };

  var createCharacteristic = function (array) {
    var resultArray = [];
    for (var i = 0; i < array.length; i++) {
      if (Math.random() > 0.5) {
        resultArray.push(array[i]);
      }
    }
    return resultArray;
  };

  var createDescription = function () {
    return 'Описание ' + Math.round((Math.random() + 0.1) * 10);
  };

  var createXY = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var createBookingData = function () {
    return {
      author: {
        avatar: getRandomElement(AVATARS)
      },
      offer: {
        title: createTitle(),
        address: createAddress(),
        price: createPrice(),
        type: getRandomElement(TYPES),
        rooms: Math.round((Math.random() + 0.1) * 10),
        guests: Math.round((Math.random() + 0.1) * 10),
        checkin: getRandomElement(CHECKIN_CHECKOUTS),
        checkout: getRandomElement(CHECKIN_CHECKOUTS),
        features: createCharacteristic(FEATURES),
        description: createDescription(),
        photos: createCharacteristic(PHOTOS)
      },
      location: {
        x: createXY(25, 1200),
        y: createXY(200, 700)
      }
    };
  };
  window.data = {
    createBookingData: createBookingData,
    CHECKIN_CHECKOUTS: CHECKIN_CHECKOUTS,
    MAIN_PIN_ACTIVE_HEIGHT: MAIN_PIN_ACTIVE_HEIGHT,
    FEATURES: FEATURES,
    CONST: CONST,
    MAIN_PIN_WIDTH: MAIN_PIN_WIDTH,
    MAIN_PIN_HEIGHT: MAIN_PIN_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    MAP_AREA: MAP_AREA,
    CONST_PINS: CONST_PINS,
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y
  };
})();
