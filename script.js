'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent, coord;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude, longitude } = position.coords;
      console.log(latitude, longitude);
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
      coord = [latitude, longitude];

      map = L.map('map').setView(coord, 13);

      L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.marker(coord)
      //   .addTo(map)
      //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      //   .openPopup();

      map.on('click', function (mapE) {
        mapEvent = mapE
        form.classList.remove('hidden');
        inputDistance.focus();

      })
    },
    function () {
      alert('Geolocation is not available');
    }
  );

}
form.addEventListener('submit', function (e) {
  inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
  e.preventDefault()
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  coord = [lat, lng]
  console.log(lat, lng)
  L.marker(coord)
    .addTo(map)
    .bindPopup(L.popup({
      maxWidth: 250,
      minWidth: 100,
      autoClose: false,
      closeOnClick: false,
      className: 'cycling-popup',
      // closePopupOnClick: false,

    }))
    .setPopupContent('Workout')
    .openPopup();
  form.classList.add('hidden')
})
inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})