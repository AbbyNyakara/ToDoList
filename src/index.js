/* eslint-disable no-plusplus */

import './index.css';

const list = document.querySelector('.list');

const listArray = [
  {
    description: 'Wash the dishes',
    completed: false,
    index: 0,
  },
  {
    description: 'Finish coding assignment',
    completed: false,
    index: 1,
  },
  {
    description: 'Grocery shopping',
    completed: false,
    index: 2,
  },
];

list.innerHTML = '';

const displayToDo = ()=> {
for (let i = 0; i < listArray.length; i++) {
  list.innerHTML += `
  <div class="list-content">
    <div class="left">
      <input type="checkbox" name="" id="">
      <p>${listArray[i].description}</p>
    </div>
    <div class="right">
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </div>
  </div>
  `;
}
}

displayToDo();
