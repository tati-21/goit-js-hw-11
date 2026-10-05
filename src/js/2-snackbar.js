// todo
// todo Завдання 2 - Генератор промісів

// todo Виконуй це завдання у файлах 2-snackbar.html і 2-snackbar.js.

// todo Бібліотека повідомлень. Для відображення повідомлень, замість console.log(), використовуй бібліотеку iziToast.

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

// todo Напиши скрипт, який після сабміту форми створює проміс. В середині колбека цього промісу через вказану користувачем кількість мілісекунд проміс має виконуватися (при fulfilled) або відхилятися (при rejected), залежно від обраної опції в радіокнопках. Значенням промісу, яке передається як аргумент у методи resolve/reject, має бути значення затримки в мілісекундах.

// todo Створений проміс треба опрацювати у відповідних для вдалого/невдалого виконання методах.
// todo Якщо проміс виконується вдало, виводь рядок `✅ Fulfilled promise in ${delay}ms`, де delay - це значення затримки виклику промісу в мілісекундах.
// todo Якщо проміс буде відхилено, то виводь рядок `❌ Rejected promise in ${delay}ms`, де delay - це значення затримки промісу в мілісекундах.

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        title: 'OK',
        message: `Fulfilled promise in ${value}ms`,
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#59a10d',
      });
    })
    .catch(value => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${value}ms`,
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#ef4040',
      });
    });

  form.reset();
});

// * Перевірка
// Delay 1000, Fulfilled -> через 1 с зелене повідомлення "OK Fulfilled promise in 1000ms"
// Delay 2000, Rejected -> через 2 с червоне повідомлення "Error Rejected promise in 2000ms"

// На що буде звертати увагу ментор при перевірці:

// Підключена бібліотека iziToast.
// При обранні стану в радіокнопках і натисканні на кнопку Create notification з'являється повідомлення, відповідного до обраного стану стилю, із затримкою в кількість мілісекунд, переданих в інпут.
// Повідомлення, що виводиться, містить тип обраного стейту і кількість мілісекунд згідно з шаблоном в умові.
