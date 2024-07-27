import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topCenter',
});

const startButton = document.querySelector('#start-button');
startButton.disabled = true;
const input = document.querySelector('#datetime-picker');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  userSelectedDate: null,
  onClose(selectedDates) {
    //console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      //window.alert('Please choose a date in the future');
      iziToast.error({
        //title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
      console.log(userSelectedDate);
    }
  },
};

const fp = flatpickr('#datetime-picker', options); // flatpickr

const countdownTimer = {
  intervalId: null,
  isActive: false,
  elements: {
    days: document.querySelector('.js-timer__days'),
    hours: document.querySelector('.js-timer__hours'),
    minutes: document.querySelector('.js-timer__minutes'),
    seconds: document.querySelector('.js-timer__seconds'),
  },
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    startButton.disabled = true;
    input.disabled = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = userSelectedDate - currentTime;
      const time = convertMs(deltaTime);

      console.log(time);

      if (deltaTime <= 0) {
        this.stop();
        console.log('The end');
      } else {
        this.elements.days.textContent = time.days;
        this.elements.hours.textContent = String(time.hours).padStart(2, '0');
        this.elements.minutes.textContent = String(time.minutes).padStart(
          2,
          '0'
        );
        this.elements.seconds.textContent = String(time.seconds).padStart(
          2,
          '0'
        );
      }
    }, 1000);
  },
  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    startButton.disabled = false;
    input.disabled = false;
  },
};

startButton.addEventListener('click', () => {
  countdownTimer.start();
});

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
