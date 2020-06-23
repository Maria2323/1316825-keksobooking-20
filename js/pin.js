'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var objects = [];
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
  for (var i = 0; i < 8; i++) {
    objects.push(window.createBookingData());
  }
  var addObjects = function (list) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < objects.length; j++) {
      fragment.appendChild(renderPin(objects[j]));
    }
    list.appendChild(fragment);
  };
  window.renderPin = renderPin;
  window.addObjects = addObjects;
})();
