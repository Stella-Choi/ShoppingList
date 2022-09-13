const items = document.querySelector('.items');
const form = document.querySelector('.new-form');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');

form.addEventListener('submit', (event) => {
  //자동 로딩 방지
  event.preventDefault();
  onAdd();
});
function onAdd() {
  //1.사용자가 입력한 text를 받아온다.
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }

  //2. 새로운 아이템을 만든다.텍스트+삭제버튼)
  const item = creatItem(text);

  //3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);

  //4. 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: 'center' });

  //5. 인풋을 초기화 한다.
  input.value = '';
  input.focus();
}

function creatItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item__row');

  const item = document.createElement('div');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.setAttribute('class', 'item__name');
  name.innerText = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'item__delete');
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteBtn.addEventListener('click', () => {
    items.removeChild(itemRow);
  });

  const itemDivider = document.createElement('div');
  itemDivider.setAttribute('class', 'item__divider');

  item.appendChild(name);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);
  return itemRow;
}

addBtn.addEventListener('click', () => {
  onAdd();
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    onAdd();
  }
});

items.addEventListener('click', (event) => {
  const id = event.target.dataset.id;
  if (id) {
    const toBeDeleted = document.querySelector(`.item__row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
