'use strict';

(function () {
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
  var changeMinPriceValue = function () {
    inputPrice.min = getMinPrice(selectType.value);
    inputPrice.placeholder = getMinPrice(selectType.value);
  };

  selectType.addEventListener('change', changeMinPriceValue);

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
    window.deactivatePage();
    window.removePins();
    window.removeCard();
    window.preview.src = ('img/muffin-grey.svg');
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
