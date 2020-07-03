'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var objects = [];
  var renderPin = function (object) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style = 'left: ' + (object.location.x - window.data.PIN_WIDTH / 2) + 'px; top: ' + (object.location.y - window.data.PIN_HEIGHT) + 'px;';
    pinElement.querySelector('img').src = object.author.avatar;
    pinElement.querySelector('img').alt = object.offer.title;
    var openPopup = function () {
      var popup = map.querySelector('.popup');
      if (popup) {
        popup.remove();
      }
      window.renderAdCard(object);
    };
    pinElement.addEventListener('click', openPopup);
    return pinElement;
  };
  for (var i = 0; i < window.data.CONST; i++) {
    objects.push(window.data.createBookingData());
  }

  window.renderPin = renderPin;
  window.objects = objects;
})();
