const root = document.querySelector('.root');
const header = root.querySelector('.header');
const search = root.querySelector('.search');
const preloader = root.querySelector('.preloader');
const description = root.querySelector('.description');
const info = root.querySelector('.info');
const errorMessages = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  tooLong: 'Должно быть от 2 до 30 символов',
  typeMismatch: 'Неправильный формат email',
  patternMismatch: 'от 8 символов и без пробелов',
};

export {
  root,
  header,
  search,
  preloader,
  description,
  info,
  errorMessages,
};
