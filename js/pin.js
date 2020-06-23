'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
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
      window.renderAdCard(object);
    };
    pinElement.addEventListener('click', openPopup);
    return pinElement;
  };
  window.renderPin = renderPin;
})();
