'use strict';

(function () {
  var roomNumbers = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var mapPinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var inputPrice = adForm.querySelector('#price');
  var selectType = adForm.querySelector('#type');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectGuestsNumber = adForm.querySelector('#capacity');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var resetFormButton = adForm.querySelector('.ad-form__reset');

  var getMinPrice = function (type) {
    var minPrice = 0;
    switch (type) {
      case 'bungalo':
        minPrice = 0;
        break;
      case 'flat':
        minPrice = 1000;
        break;
      case 'house':
        minPrice = 5000;
        break;
      case 'palace':
        minPrice = 10000;
        break;
    }
    return minPrice;
  };
  inputPrice.min = getMinPrice(selectType.value);
  var onChangeMinPriceValue = function () {
    inputPrice.min = getMinPrice(selectType.value);
    inputPrice.placeholder = getMinPrice(selectType.value);
  };

  selectType.addEventListener('change', onChangeMinPriceValue);

  var getMatchingCapacityNumbers = function (value) {
    var guestsNumbers = selectGuestsNumber.querySelectorAll('option');
    guestsNumbers.forEach(function (it) {
      it.disabled = true;
    });
    roomNumbers[value].forEach(function (it) {
      selectGuestsNumber.querySelector('option' + '[value="' + it + '"]').disabled = false;
      selectGuestsNumber.value = it;
    });
  };

  selectRoomNumber.addEventListener('change', function () {
    getMatchingCapacityNumbers(selectRoomNumber.value);
  });

  var getMatchingCheckoutTime = function () {
    var checkoutTimes = timeOutSelect.querySelectorAll('option');
    checkoutTimes.forEach(function (it) {
      it.disabled = true;
    });
    timeOutSelect.querySelector('option' + '[value="' + timeInSelect.value + '"]').disabled = false;
    timeOutSelect.value = timeInSelect.value;
  };

  timeInSelect.addEventListener('change', function () {
    getMatchingCheckoutTime();
  });

  var successMessage = {
    template: '#success',
    element: '.success'
  };
  var errorMessage = {
    template: '#error',
    element: '.error'
  };

  var createMessage = function (statusMessage) {
    var popup = document.querySelector(statusMessage.template).content.cloneNode(true);
    adForm.appendChild(popup);
    var onEscPress = function (evt) {
      if (evt.key === 'Escape') {
        document.querySelector(statusMessage.element).remove();
      }
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onClick);
    };
    var onClick = function () {
      document.querySelector(statusMessage.element).remove();
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onEscPress);
    };
    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onClick);
  };

  var clearPage = function () {
    adForm.reset();
    window.map.deactivatePage();
    window.map.removePins();
    window.map.removeCard();
    window.avatar.previewAvatar.src = 'img/muffin-grey.svg';
    window.avatar.previewHouse.src = 'img/muffin-grey.svg';
    mapPinMain.style.left = window.data.MAIN_PIN_X + 'px';
    mapPinMain.style.top = window.data.MAIN_PIN_Y + 'px';
  };

  var onSubmit = function (evt) {
    window.post(new FormData(adForm), function () {
      createMessage(successMessage);
      clearPage();
    }, function () {
      createMessage(errorMessage);
    });
    evt.preventDefault();
  };
  adForm.addEventListener('submit', onSubmit);
  resetFormButton.addEventListener('click', function () {
    clearPage();
  });
})();
