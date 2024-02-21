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


class Workout {
  date = new Date();
  id = ((Date.now()) + ''.slice(-10));
  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }


}
class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration)
    this.cadence = cadence
    this._getpace();
  }
  _getpace() {
    this.cadence = this.duration / this.distance
    return this.cadence;
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration)
    this.elevationGain = elevationGain
    this._getspeed();
  }
  _getspeed() {
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// Application
class App {
  #map;
  #mapEvent;
  constructor() {
    this._getposition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField)
  }

  _getposition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),
        function () {
          alert('Geolocation is not available');
        }
      );

    }
  }
  _loadMap(position) {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    let coord = [latitude, longitude];

    this.#map = L.map.bind(this)('map').setView(coord, 13);

    L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // L.marker(coord)
    //   .addTo(map)
    //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    //   .openPopup();

    this.#map.on('click', this._showForm.bind(this))
  }

  _showForm(mapE) {
    this.#mapEvent = mapE
    form.classList.remove('hidden');
    inputDistance.focus();

  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e) {
    inputDistance.value = inputDuration.value = inputElevation.value = inputCadence.value = '';
    e.preventDefault()
    const { lat, lng } = this.#mapEvent.latlng;
    console.log(lat, lng)
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'cycling-popup',
      }))
      .setPopupContent('Workout')
      .openPopup();
    form.classList.add('hidden')
  }

}
const app = new App();

const run1 = new Running([39, -19], 5.2, 24, 178);
const cycling1 = new Cycling([39, -19], 27, 97, 523);
console.log(run1, cycling1);
