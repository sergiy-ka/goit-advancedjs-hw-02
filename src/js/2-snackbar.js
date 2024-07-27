import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topCenter',
});

const form = document.querySelector('.form');
const delay = document.querySelector('input[name="delay"]');
const state = document.querySelector('input[name="state"]');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  iziToast.info({
    title: 'Hey',
    message: 'I am a toast message',
  });
}
