import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topCenter',
});

const input = document.querySelector('#datetime-picker');
const startButton = document.querySelector('#start-button');
startButton.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  userSelectedDate: null,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      iziToast.error({
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

      //console.log(time);

      if (deltaTime <= 0) {
        this.stop();
      } else {
        this.elements.days.textContent =
          time.days < 10 ? String(time.days).padStart(2, '0') : time.days;
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
