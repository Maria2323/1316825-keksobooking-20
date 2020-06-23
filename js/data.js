'use strict';

(function () {
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var objects = [];

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

  var createObject = function () {
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
        checkin: getRandomElement(CHECKIN_CHECKOUT),
        checkout: getRandomElement(CHECKIN_CHECKOUT),
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

  for (var i = 0; i < 8; i++) {
    objects.push(createObject());
  }

  var addObjects = function (list) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < objects.length; j++) {
      fragment.appendChild(window.pin(objects[j]));
    }
    list.appendChild(fragment);
  };
  window.addObjects = addObjects;
})();
