import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topCenter',
  icon: '',
});

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const delay = document.querySelector('input[name="delay"]');
  const state = document.querySelector('input[name="state"]:checked');
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(delay.value);
      } else {
        reject(delay.value);
      }
    }, delay.value);
  });
  promise
    .then(delay => {
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
      });
    });
}
