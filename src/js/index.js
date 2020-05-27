import { fetchPostInfo, fetchGetInfo } from './api.js';
import { template } from './template.js';

const form = document.querySelector('.js_form');
const list = document.querySelector('.js_list');

// Первая отрисовка всех юзеров
const getInfoUsers = async () => {
  try {
    const { data } = await fetchGetInfo();

    const allLi = data
      .map(item => template(item.id, item.name, item.selery))
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
      const li = template(res.data.id, res.data.name, res.data.selery);

      list.insertAdjacentHTML('beforeend', li);
    })
    .catch(() => {});
}

function inputChange({ target }) {
  const { nodeName } = target;

  if (nodeName === 'H3') {
    target.classList.add('li--disable');
    const liParent = target.closest('li');

    const { userid: userId } = liParent;
    const { info } = target.dataset;

    const input = liParent.querySelector('input');
    const button = liParent.querySelector('button');

    input.classList.add('li--active');
    button.classList.add('li--active');

    input.name = info;

    return;
  }

  if (nodeName === 'P') {
    // target.classList.add('li--disable');
    const liParent = target.closest('li');

    const { userid: userId } = liParent;
    const { info } = target.dataset;

    const input = liParent.querySelector('input');
    const button = liParent.querySelector('button');

    input.classList.add('li--active');
    button.classList.add('li--active');

    input.name = info;

    return;
  }
}
