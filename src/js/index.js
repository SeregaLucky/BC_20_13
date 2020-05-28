import { fetchGetInfo, fetchPostInfo, fetchPatchInfo } from './api.js';
import { templateItemUser } from './templateItemUser.js';

const form = document.querySelector('.js_form');
const list = document.querySelector('.js_list');

// Первая отрисовка всех юзеров
const getInfoUsers = async () => {
  try {
    const { data } = await fetchGetInfo();

    const allLi = data
      .map(item => templateItemUser(item.id, item.name, item.selery))
      .join('');
    list.insertAdjacentHTML('beforeend', allLi);
  } catch (err) {
    console.log('Ошибка --- ', err);
  }
};
getInfoUsers();

form.addEventListener('submit', postData);
list.addEventListener('dblclick', inputChange);

// Создаем и отправзяем нового юзера при сабмите
function postData(e) {
  e.preventDefault();

  const name = e.currentTarget.elements.name.value;
  const selery = e.currentTarget.elements.selery.value;

  if (!(name.length > 0 && selery.length > 0)) return;

  const obj = { name, selery };
  // console.log(obj);

  fetchPostInfo(obj)
    .then(res => {
      console.log('res', res);
      const li = templateItemUser(res.data.id, res.data.name, res.data.selery);

      list.insertAdjacentHTML('beforeend', li);
    })
    .catch(() => {});
}

function inputChange({ target }) {
  const { nodeName } = target;

  if (nodeName === 'H3') {
    findElement(target);
    return;
  }

  if (nodeName === 'P') {
    findElement(target);
    return;
  }
}

function findElement(target) {
  target.classList.add('li--disable');
  const liParent = target.closest('li');

  // Находим инпут и кнопку
  const inputChange = liParent.querySelector('.js_li_input');
  const buttonChange = liParent.querySelector('.js_li_button');

  // Записываем в инпут то что в параграфе
  inputChange.value = target.textContent;

  // Вешаем на кнопку слушателя который будет отрабатывать при клике
  buttonChange.addEventListener('click', changeUser);

  const { info } = target.dataset;

  // Делаем инпут и кнопку видимыми
  inputChange.classList.add('li--active');
  buttonChange.classList.add('li--active');

  inputChange.name = info;
}

function changeUser(e) {
  const liParent = e.target.closest('li');

  // Поиск инпута и кнопки
  const inputChange = liParent.querySelector('.js_li_input');
  const buttonChange = liParent.querySelector('.js_li_button');

  // Достаем с инпута необходимые данные
  const inputChangeValue = inputChange.value;
  const name = inputChange.name;

  // Находим заголовок имени и параграф с зп
  const h3 = liParent.querySelector('h3');
  const parag = liParent.querySelector('p');

  // Удаляем css класс который прячит елемент
  h3.classList.remove('li--disable');
  parag.classList.remove('li--disable');

  // находим и снимаем слушателя с кнопки
  buttonChange.removeEventListener('click', changeUser);

  // Скрываем кнопку и инпут
  inputChange.classList.remove('li--active');
  buttonChange.classList.remove('li--active');

  const { userid } = e.currentTarget.dataset;

  const newInfoObj = { [name]: inputChangeValue };

  fetchPatchInfo(newInfoObj, userid)
    .then(({ data }) => {
      console.log(data);

      h3.textContent = data.name;
      parag.textContent = data.selery;
    })
    .catch(() => null);
}
