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

var mapPinListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (object) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style = 'left: ' + (object.location.x - 25) + 'px; top: ' + (object.location.y - 70) + 'px;';
  pinElement.querySelector('img').src = object.author.avatar;
  pinElement.querySelector('img').alt = object.offer.title;

  return pinElement;
};

var addObjects = function (list) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < objects.length; j++) {
    fragment.appendChild(renderPin(objects[j]));
  }
  list.appendChild(fragment);
};

addObjects(mapPinListElement);


var adTemplate = document.querySelector('#card').content;

var renderAdCArd = function (obj) {
  for (var i = 0; i < obj.length; i++) {
    adTemplate.querySelector('.popup__title').textContent = obj[i].offer.title;
    adTemplate.querySelector('.popup__text--address').textContent = obj[i].offer.address;
    adTemplate.querySelector('.popup__text--price').textContent = obj[i].offer.price;
    if (obj[i].offer.type === 'flat') {
      adTemplate.querySelector('.popup__type').textContent = 'Квартира';
    } else if (obj[i].offer.type === 'bungalo') {
      adTemplate.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (obj[i].offer.type === 'house') {
      adTemplate.querySelector('.popup__type').textContent = 'Дом';
    } else if (obj[i].offer.type === 'palace') {
      adTemplate.querySelector('.popup__type').textContent = 'Дворец';
    }
    adTemplate.querySelector('.popup__text--capacity').textContent = obj[i].offer.rooms + ' комнаты для ' + obj[i].offer.guests + ' гостей';
    adTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj[i].offer.checkin + ', выезд до ' + obj[i].offer.checkout;

    adTemplate.querySelector('.popup__feature--wifi').textContent = 'wifi';
    adTemplate.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
    adTemplate.querySelector('.popup__feature--parking').textContent = 'parking';
    adTemplate.querySelector('.popup__feature--washer').textContent = 'washer';
    adTemplate.querySelector('.popup__feature--elevator').textContent = 'elevator';
    adTemplate.querySelector('.popup__feature--conditioner').textContent = 'conditioner';

    adTemplate.querySelector('.popup__description').textContent = obj[i].offer.description;

    adTemplate.querySelector('.popup__photos').src = obj[i].offer.photos;

    adTemplate.querySelector('.popup__avatar').src = obj[i].author.avatar;
  }
  return adTemplate;
};

console.log(renderAdCArd(objects));
