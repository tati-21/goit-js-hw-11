import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();

  if (query === '') {
    showError('Please enter a search query!');
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(query)
    .then(data => {
      hideLoader();

      if (data.hits.length === 0) {
        showError(
          'Sorry, there are no images matching your search query. Please try again!'
        );
        return;
      }

      createGallery(data.hits);
    })
    .catch(() => {
      hideLoader();
      showError('Something went wrong. Please try again later!');
    });

  form.reset();
}

function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    maxWidth: 432,
    theme: 'dark',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
  });
}
