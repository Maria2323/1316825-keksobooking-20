'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomElement = function (characteristic) {
  return characteristic[Math.round(Math.random() * (characteristic.length - 1))];
};

var randomValue = Math.round(Math.random() * 10);

var createArray = function (number) {
  var finalArray = [];
  for (var i = 0; i < (number + 1); i++) {
    var randomNumeral = Math.round(Math.random() * 10);
    finalArray.push(randomNumeral);
  }
  return finalArray;
};

var createTitle = function () {
  return 'Предложение ' + createArray(randomValue)[i];
};

var createAddress = function () {
  var x = 100 * createArray(randomValue)[i];
  var y = 50 * createArray(randomValue)[i];
  return '{' + x + ', ' + y + '}';
};

var createPrice = function () {
  var price = 500 * createArray(randomValue)[i];
  return price + 'руб./сутки';
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
  return 'Описание ' + createArray(randomValue)[i];
};

var createXY = function () {
  return 100 * createArray(randomValue)[i];
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
      rooms: createArray(randomValue)[i],
      guests: createArray(randomValue)[i],
      checkin: getRandomElement(CHECKIN_CHECKOUT),
      checkout: getRandomElement(CHECKIN_CHECKOUT),
      features: createCharacteristic(FEATURES),
      description: createDescription(),
      photos: createCharacteristic(PHOTOS)
    },
    location: {
      x: createXY(),
      y: createXY(),
    }
  };
};

var objects = [];
for (var i = 0; i < 8; i++) {
  objects.push(createObject());
}
