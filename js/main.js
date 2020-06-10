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

var renderAdCard = function (obj) {
  adTemplate.querySelector('.popup__title').textContent = obj[0].offer.title;
  adTemplate.querySelector('.popup__text--address').textContent = obj[0].offer.address;
  adTemplate.querySelector('.popup__text--price').textContent = obj[0].offer.price;
  if (obj[0].offer.type === 'flat') {
    adTemplate.querySelector('.popup__type').textContent = 'Квартира';
  } else if (obj[0].offer.type === 'bungalo') {
    adTemplate.querySelector('.popup__type').textContent = 'Бунгало';
  } else if (obj[0].offer.type === 'house') {
    adTemplate.querySelector('.popup__type').textContent = 'Дом';
  } else if (obj[0].offer.type === 'palace') {
    adTemplate.querySelector('.popup__type').textContent = 'Дворец';
  }
  adTemplate.querySelector('.popup__text--capacity').textContent = obj[0].offer.rooms + ' комнаты для ' + obj[0].offer.guests + ' гостей';
  adTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj[0].offer.checkin + ', выезд до ' + obj[0].offer.checkout;
  adTemplate.querySelector('.popup__feature--wifi').textContent = 'wifi';
  adTemplate.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
  adTemplate.querySelector('.popup__feature--parking').textContent = 'parking';
  adTemplate.querySelector('.popup__feature--washer').textContent = 'washer';
  adTemplate.querySelector('.popup__feature--elevator').textContent = 'elevator';
  adTemplate.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
  if (!obj[0].offer.features.includes('wifi')) {
    adTemplate.querySelector('.popup__feature--wifi').classList.add('hidden');
  } else {
    adTemplate.querySelector('.popup__feature--wifi').classList.remove('hidden');
  }
  if (!obj[0].offer.features.includes('dishwasher')) {
    adTemplate.querySelector('.popup__feature--dishwasher').classList.add('hidden');
  } else {
    adTemplate.querySelector('.popup__feature--dishwasher').classList.remove('hidden');
  }
  if (!obj[0].offer.features.includes('parking')) {
    adTemplate.querySelector('.popup__feature--parking').classList.add('hidden');
  } else {
    adTemplate.querySelector('.popup__feature--parking').classList.remove('hidden');
  }
  if (!obj[0].offer.features.includes('washer')) {
    adTemplate.querySelector('.popup__feature--washer').classList.add('hidden');
  } else {
    adTemplate.querySelector('.popup__feature--washer').classList.remove('hidden');
  }
  if (!obj[0].offer.features.includes('elevator')) {
    adTemplate.querySelector('.popup__feature--elevator').classList.add('hidden');
  } else {
    adTemplate.querySelector('.popup__feature--elevator').classList.remove('hidden');
  }
  if (!obj[0].offer.features.includes('conditioner')) {
    adTemplate.querySelector('.popup__feature--conditioner').classList.add('hidden');
  } else {
    adTemplate.querySelector('.popup__feature--conditioner').classList.remove('hidden');
  }
  adTemplate.querySelector('.popup__description').textContent = obj[0].offer.description;
  var images = adTemplate.querySelector('.popup__photos');
  adTemplate.querySelector('.popup__photo').classList.add('hidden');
  for (var j = 0; j < obj[0].offer.photos.length; j++) {
    var image = adTemplate.querySelector('.popup__photo').cloneNode(true);
    images.appendChild(image);
    image.src = obj[0].offer.photos[j];
  }
  adTemplate.querySelector('.popup__avatar').src = obj[0].author.avatar;
  return adTemplate;
};

var mapFiltersContainer = document.querySelector('.map__filters-container');
map.insertBefore(renderAdCard(objects), mapFiltersContainer);
