'use strict';

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var objects = [];
var mapPinListElement = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var formFieldsets = adForm.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var mapPinMain = document.querySelector('.map__pin--main');
var inputAddress = adForm.querySelector('input[name = "address"]');
var inputPrice = adForm.querySelector('#price');
var selectType = adForm.querySelector('#type');
var selectRoomNumber = adForm.querySelector('#room_number');
var selectGuestsNumber = adForm.querySelector('#capacity');
var buttonSubmit = adForm.querySelector('.ad-form__submit');

var activatePage = function () {
  map.classList.remove('map--faded');
  mapFilters.classList.remove('ad-form--disabled');
  formFieldsets.disabled = false;
  adForm.classList.remove('ad-form--disabled');
  inputAddress.value = (570 + MAIN_PIN_WIDTH * 0.5) + ', ' + (375 + MAIN_PIN_HEIGHT + 5);

  addObjects(mapPinListElement);
};

var deactivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapPinListElement.disabled = true;
  mapFilters.classList.add('ad-form--disabled');
  formFieldsets.disabled = true;
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

selectType.addEventListener('change', function () {
  if (selectType.value === 'bungalo') {
    inputPrice.min = 0;
    inputPrice.placeholder = 0;
  }
  if (selectType.value === 'flat') {
    inputPrice.min = 1000;
    inputPrice.placeholder = 1000;
  }
  if (selectType.value === 'house') {
    inputPrice.min = 5000;
    inputPrice.placeholder = 5000;
  }
  if (selectType.value === 'palace') {
    inputPrice.min = 10000;
    inputPrice.placeholder = 10000;
  }
});

selectGuestsNumber[0].disabled = true;
selectGuestsNumber[1].disabled = true;
selectGuestsNumber[3].disabled = true;

selectRoomNumber.addEventListener('change', function () {
  if (selectRoomNumber[0].selected === true) {
    selectGuestsNumber[2].selected = true;
    selectGuestsNumber[0].disabled = true;
    selectGuestsNumber[1].disabled = true;
    selectGuestsNumber[3].disabled = true;
  }
  if (selectRoomNumber[1].selected === true) {
    selectGuestsNumber[1].selected = true;
    selectGuestsNumber[0].disabled = true;
    selectGuestsNumber[2].disabled = false;
    selectGuestsNumber[3].disabled = true;
  }
  if (selectRoomNumber[2].selected === true) {
    selectGuestsNumber[0].selected = true;
    selectGuestsNumber[0].disabled = false;
    selectGuestsNumber[2].disabled = false;
    selectGuestsNumber[1].disabled = false;
    selectGuestsNumber[3].disabled = true;
  }
  if (selectRoomNumber[3].selected === true) {
    selectGuestsNumber[3].selected = true;
    selectGuestsNumber[0].disabled = true;
    selectGuestsNumber[1].disabled = true;
    selectGuestsNumber[2].disabled = true;
    selectGuestsNumber[3].disabled = false;
  }
});

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

/*var adTemplate = document.querySelector('#card').content;

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
map.insertBefore(renderAdCard(objects), mapFiltersContainer);*/
