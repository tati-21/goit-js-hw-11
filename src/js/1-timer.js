// todo
// todo Завдання 1 - Таймер зворотного відліку

// todo Виконуй це завдання у файлах 1-timer.html і 1-timer.js. Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.

// todo Бібліотека flatpickr. Для того щоб підключити CSS код бібліотеки в проєкт, необхідно додати ще один імпорт, крім того, що описаний в документації.

// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// todo Бібліотека повідомлень. Для відображення повідомлень користувачеві, замість window.alert(), використовуй бібліотеку iziToast.

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

// todo Вибір дати. Обрана дата буде потрібна в коді і поза межами методу onClose(). Тому оголоси поза межами методу let змінну, наприклад, userSelectedDate, і після валідації її в методі onClose() на минуле/майбутнє запиши обрану дату в цю let змінну.
// todo - Якщо користувач вибрав дату в минулому, покажи повідомлення з текстом "Please choose a date in the future" і зроби кнопку «Start» не активною.
// todo - Якщо користувач вибрав валідну дату (в майбутньому), кнопка «Start» стає активною.
// todo - Кнопка «Start» повинна бути неактивною доти, доки користувач не вибрав дату в майбутньому. Зверни увагу, що при обранні валідної дати, не запуску таймера і обранні потім невалідної дати, кнопка після розблокування має знову стати неактивною.

let userSelectedDate = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  locale: {
    firstDayOfWeek: 1,
  },
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (!selectedDate) {
      return;
    }

    if (selectedDate.getTime() <= Date.now()) {
      startBtn.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#ef4040',
      });
      return;
    }

    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(input, options);

// todo Відлік часу. Натисканням на кнопку «Start» скрипт повинен обчислювати раз на секунду, скільки часу залишилось до вказаної дати, і оновлювати інтерфейс таймера, показуючи чотири цифри: дні, години, хвилини і секунди у форматі xx:xx:xx:xx.
// todo - Кількість днів може складатися з більше, ніж двох цифр.
// todo - Таймер повинен зупинитися, коли дійшов до кінцевої дати, тобто залишок часу дорівнює нулю 00:00:00:00.
// todo Після запуску таймера натисканням кнопки Старт кнопка Старт і інпут стають неактивним, щоб користувач не міг обрати нову дату, поки йде відлік часу. Після зупинки таймера інпут стає активним, щоб користувач міг обрати наступну дату. Кнопка залишається не активною.

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;

  const intervalId = setInterval(tick, 1000);
  tick();

  function tick() {
    const ms = userSelectedDate.getTime() - Date.now();

    if (ms <= 0) {
      clearInterval(intervalId);
      updateTimer(convertMs(0));
      input.disabled = false;
      return;
    }

    updateTimer(convertMs(ms));
  }
});

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// todo Для підрахунку значень використовуй готову функцію convertMs, де ms - різниця між кінцевою і поточною датою в мілісекундах.

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

// todo Форматування часу. Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати. Зверни увагу, що вона не форматує результат. Тобто якщо залишилося 4 хвилини або будь-якої іншої складової часу, то функція поверне 4, а не 04. В інтерфейсі таймера необхідно додавати 0, якщо в числі менше двох символів. Напиши функцію, наприклад addLeadingZero(value), яка використовує метод рядка padStart() і перед відмальовуванням інтерфейсу форматує значення.

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// * Перевірка
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6, minutes: 42, seconds: 20}
// console.log(addLeadingZero(4)); // '04'
// console.log(addLeadingZero(123)); // '123'

// На що буде звертати увагу ментор при перевірці:

// Підключені бібліотеки flatpickr та iziToast.
// При першому завантаженні сторінки кнопка Start не активна.
// При кліку на інпут відкривається календар, де можна вибрати дату.
// При обранні дати з минулого, кнопка Start стає неактивною і з'являється повідомлення з текстом "Please choose a date in the future".
// При обранні дати з майбутнього кнопка Start стає активною.
// При натисканні на кнопку Start вона стає неактивною, на сторінку виводиться час, що лишився до обраної дати у форматі xx:xx:xx:xx, і запускається зворотний відлік часу до обраної дати.
// Кожну секунду оновлюється інтерфейс і показує оновлені дані часу, який залишився.
// Таймер зупиняється, коли доходить до кінцевої дати, тобто залишок часу дорівнює нулю і інтерфейс виглядає так 00:00:00:00.
// Час в інтерфейсі відформатований і, якщо воно містить менше двох символів, на початку числа доданий 0.
