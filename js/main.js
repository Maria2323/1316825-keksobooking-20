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
var timeInSelect = adForm.querySelector('#timein');
var timeOutSelect = adForm.querySelector('#timeout');

var activatePage = function () {
  map.classList.remove('map--faded');
  mapFilters.classList.remove('ad-form--disabled');
  adForm.classList.remove('ad-form--disabled');
  inputAddress.disabled = true;
  inputAddress.value = (570 + MAIN_PIN_WIDTH * 0.5) + ', ' + (375 + MAIN_PIN_HEIGHT + 5);
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = false;
  }
  addObjects(mapPinListElement);
};

var deactivatePage = function () {
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapPinListElement.disabled = true;
  mapFilters.classList.add('ad-form--disabled');
  for (var i = 0; i < formFieldsets.length; i++) {
    formFieldsets[i].disabled = true;
  }
  inputAddress.disabled = true;
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

timeOutSelect[1].disabled = true;
timeOutSelect[2].disabled = true;

timeInSelect.addEventListener('change', function () {
  if (timeInSelect[0].selected === true) {
    timeOutSelect[0].selected = true;
    timeOutSelect[1].disabled = true;
    timeOutSelect[2].disabled = true;
    timeOutSelect[0].disabled = false;
  }
  if (timeInSelect[1].selected === true) {
    timeOutSelect[1].selected = true;
    timeOutSelect[1].disabled = false;
    timeOutSelect[0].disabled = true;
  }
  if (timeInSelect[2].selected === true) {
    timeOutSelect[2].selected = true;
    timeOutSelect[2].disabled = false;
    timeOutSelect[1].disabled = true;
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
  var openPopup = function () {
    var popup = map.querySelector('.popup');
    if (popup) {
      popup.remove();
    }
    renderAdCard(object);
  };
  pinElement.addEventListener('click', openPopup);
  return pinElement;
};

var addObjects = function (list) {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < objects.length; j++) {
    fragment.appendChild(renderPin(objects[j]));
  }
  list.appendChild(fragment);
};

var adTemplate = document.querySelector('#card').content;

var type = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var features = function (object, feature, element) {
  if (!object.offer.features.includes(feature)) {
    element.querySelector('.popup__feature--' + feature).classList.add('hidden');
  } else {
    element.querySelector('.popup__feature--' + feature).classList.remove('hidden');
  }
};

var renderAdCard = function (obj) {
  var adCard = adTemplate.cloneNode(true);
  adCard.querySelector('.popup__title').textContent = obj.offer.title;
  adCard.querySelector('.popup__text--address').textContent = obj.offer.address;
  adCard.querySelector('.popup__text--price').textContent = obj.offer.price;
  adCard.querySelector('.popup__type').textContent = type[obj.offer.type];
  adCard.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  adCard.querySelector('.popup__feature--wifi').textContent = 'wifi';
  adCard.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
  adCard.querySelector('.popup__feature--parking').textContent = 'parking';
  adCard.querySelector('.popup__feature--washer').textContent = 'washer';
  adCard.querySelector('.popup__feature--elevator').textContent = 'elevator';
  adCard.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
  for (var feat = 0; feat < FEATURES.length; feat++) {
    features(obj, FEATURES[feat], adCard);
  }
  adCard.querySelector('.popup__description').textContent = obj.offer.description;
  var images = adCard.querySelector('.popup__photos');
  adCard.querySelector('.popup__photo').classList.add('hidden');
  for (var j = 0; j < obj.offer.photos.length; j++) {
    var image = adCard.querySelector('.popup__photo').cloneNode(true);
    images.appendChild(image);
    image.src = obj.offer.photos[j];
  }
  adCard.querySelector('.popup__avatar').src = obj.author.avatar;
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var closeCardBtn = adCard.querySelector('.popup__close');
  var closeCard = function () {
    var popup = map.querySelector('.popup');
    popup.remove();
    closeCardBtn.removeEventListener('click', CloseCardBtnClick);
    closeCardBtn.removeEventListener('keydown', closeCardEsc);
  };
  var CloseCardBtnClick = function () {
    closeCard();
  };
  var closeCardEsc = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };
  closeCardBtn.addEventListener('click', CloseCardBtnClick);
  document.addEventListener('keydown', closeCardEsc);
  map.insertBefore(adCard, mapFiltersContainer);
  return adCard;
};
