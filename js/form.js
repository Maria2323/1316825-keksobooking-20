'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var inputPrice = adForm.querySelector('#price');
  var selectType = adForm.querySelector('#type');
  var selectRoomNumber = adForm.querySelector('#room_number');
  var selectGuestsNumber = adForm.querySelector('#capacity');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

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
})();
