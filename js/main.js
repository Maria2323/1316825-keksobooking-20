'use strict';

var avatars = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var checkinCheckout = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var objects = [];

var randomValue = [Math.round(Math.random() * 10)];

var createTitle = function () {
  return 'Предложение ' + randomValue;
};

var createAddress = function () {
  var x = 100 * randomValue;
  var y = 50 * randomValue;
  return '{' + x + ', ' + y + '}';
};

var createPrice = function () {
  var price = 500 * randomValue;
  return price + 'руб./сутки';
};

var createRooms = function () {
  return 1 * randomValue;
};

var createGuests = function () {
  return 1 * randomValue;
};

var createDescription = function () {
  return 'Описание ' + randomValue;
};

var createX = function () {
  return 100 * randomValue;
};

var createY = function () {
  return 100 * randomValue;
};

var createObject = function () {
  return {
    author: {
      avatar: avatars[i]
    },
    offer: {
      title: createTitle(),
      address: createAddress(),
      price: createPrice(),
      type: types[i],
      rooms: createRooms(),
      guests: createGuests(),
      checkin: checkinCheckout[i],
      checkout: checkinCheckout[i],
      features: features[i],
      description: createDescription(),
      photos: photos[i]
    },
    location: {
      x: createX(),
      y: createY(),
    }
  };
};

for (var i = 0; i < 8; i++) {
  objects.push(createObject());
}
