'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var objects = [];
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var getRandomElement = function (characteristic) {
  return characteristic[Math.round(Math.random() * (characteristic.length - 1))];
};

var createArray = function () {
  var finalArray = [];
  for (var i = 0; i < 10; i++) {
    var randomNumeral = Math.round(Math.random() * 10);
    finalArray.push(randomNumeral);
  }
  return finalArray;
};

var createTitle = function () {
  return 'Предложение ' + createArray()[i];
};

var createAddress = function () {
  var x = 100 * createArray()[i];
  var y = 50 * createArray()[i];
  return '{' + x + ', ' + y + '}';
};

var createPrice = function () {
  var price = 500 * createArray()[i];
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
  return 'Описание ' + createArray()[i];
};

var createXY = function () {
  return 100 * createArray()[i];
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
      rooms: createArray()[i],
      guests: createArray()[i],
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

var mapPinListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style = 'left: ' + object.location.x + 35 + 'px; top: ' + object.location.y + 70 + 'px;';
  pinElement.querySelector('img').picture.src = object.author.avatar;
  pinElement.querySelector('img').picture.alt = object.offer.title;

  return pinElement;
};

var addObjects = function (list) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(renderPin(objects[i]));
  }
  list.appendChild(fragment);
};

for (var i = 0; i < 8; i++) {
  objects.push(createObject());
}
addObjects(mapPinListElement);
