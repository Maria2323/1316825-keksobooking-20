'use strict';

(function () {
  var type = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };
  var adTemplate = document.querySelector('#card').content;
  var map = document.querySelector('.map');

  var getFeatures = function (object, feature, element) {
    if (!object.offer.features.includes(feature)) {
      element.querySelector('.popup__feature--' + feature).classList.add('hidden');
    } else {
      element.querySelector('.popup__feature--' + feature).classList.remove('hidden');
    }
  };

  var closeCard = function () {
    var popup = map.querySelector('.popup');
    popup.remove();
  };
  var onEnterCloseCard = function () {
    closeCard();
  };
  var onEscCloseCard = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  var renderAdCard = function (obj) {
    var adCard = adTemplate.cloneNode(true);
    adCard.querySelector('.popup__title').textContent = obj.offer.title;
    adCard.querySelector('.popup__text--address').textContent = obj.offer.address;
    adCard.querySelector('.popup__text--price').textContent = obj.offer.price;
    adCard.querySelector('.popup__type').textContent = type[obj.offer.type];
    adCard.querySelector('.popup__text--capacity').textContent =
      obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    adCard.querySelector('.popup__text--time').textContent =
      'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    adCard.querySelector('.popup__feature--wifi').textContent = 'wifi';
    adCard.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
    adCard.querySelector('.popup__feature--parking').textContent = 'parking';
    adCard.querySelector('.popup__feature--washer').textContent = 'washer';
    adCard.querySelector('.popup__feature--elevator').textContent = 'elevator';
    adCard.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
    for (var feat = 0; feat < window.data.FEATURES.length; feat++) {
      getFeatures(obj, window.data.FEATURES[feat], adCard);
    }
    adCard.querySelector('.popup__description').textContent = obj.offer.description;
    var images = adCard.querySelector('.popup__photos');
    for (var j = 0; j < obj.offer.photos.length; j++) {
      var image = adCard.querySelector('.popup__photo').cloneNode(true);
      images.appendChild(image);
      image.src = obj.offer.photos[j];
    }
    images.children[0].classList.add('hidden');
    adCard.querySelector('.popup__avatar').src = obj.author.avatar;
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var closeCardBtn = adCard.querySelector('.popup__close');
    closeCardBtn.addEventListener('click', onEnterCloseCard);
    document.addEventListener('keydown', onEscCloseCard);
    map.insertBefore(adCard, mapFiltersContainer);
    return adCard;
  };
  window.renderAdCard = renderAdCard;
})();
