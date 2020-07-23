'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');

  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  var fileChooserHouse = document.querySelector('.ad-form__upload input[type=file]');
  var previewHouse = document.createElement('img');
  previewHouse.style.width = '70px';
  previewHouse.style.height = '70px';
  previewHouse.src = 'img/muffin-grey.svg';
  previewHouse.alt = 'Фото жилья';
  var addPhotoHouse = document.querySelector('.ad-form__photo');
  addPhotoHouse.appendChild(previewHouse);

  fileChooserHouse.addEventListener('change', function () {
    var file = fileChooserHouse.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewHouse.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  window.avatar = {
    previewAvatar: previewAvatar,
    previewHouse: previewHouse
  };
})();
