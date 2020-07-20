'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapPinListElement = document.querySelector('.map__pins');
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
      console.log(1);
    };
    pinElement.addEventListener('click', openPopup);
    return pinElement;
  };

  var addRentalAds = function (data) {
    var fragment = document.createDocumentFragment();
    var takeNumber = data.length > window.data.CONST_PINS ? window.data.CONST_PINS : data.length;
    for (var j = 0; j < takeNumber; j++) {
      fragment.appendChild(renderPin(data[j]));
    }
    mapPinListElement.appendChild(fragment);
  };

  window.addRentalAds = addRentalAds;
})();
