import './index.css';

// Select the todo-list to be updated
const list = document.querySelector('.list');

let id = 0;
let listArray = [] || JSON.parse(localStorage.getItem('list'));
const userInput = document.querySelector('.user-input');

// todo item
const addtodo = (todo, id, completed, trash) => {
  if (trash) { return; }

  const text = `
  <div class="list-content">
      <div class="left">
        <i class="fa-solid fa-square check" id="${id}"></i>
        <p class="text" contenteditable="true" >${todo}</p>
      </div>
      <div class="right">
        <i class="fa fa-ellipsis-v more" aria-hidden="true" id="${id}"></i>
      </div>
  </div>
  `;

  const position = 'beforeend';

  list.insertAdjacentHTML(position, text);
};

// ************** Add event listener to listen for the enter key and add a new todo item //
document.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const todo = userInput.value;
    if (todo) {
      addtodo(todo, id, false, false);
      listArray.push({
        description: todo,
        completed: false,
        id: id,
        trash: false,
      });

      id += 1;
      userInput.value = '';
      // Local storage
      localStorage.setItem('list', JSON.stringify(listArray));
    }
  }
});

// **************** Functionality to detect click and delete *************//

// Classes Names
// const checked = 'fa-square-checked';
// const bin = 'fa-trash-can';

let detectClick = () => {
  list.addEventListener('click', (e) => {
    // alert("clicked list");
    const element = e.target;
    const textInput = element.parentNode.lastElementChild;
    const elipsis = element.parentNode.parentNode.lastElementChild.firstElementChild;

    if (element.classList.contains('check') || element.classList.contains('text')) {
      elipsis.classList.toggle('fa-ellipsis-v');
      elipsis.classList.toggle('fa-trash-can');
    }

    if (element.classList.contains('check')){
      if (element.classList.contains('fa-square')) {
        element.classList.remove('fa-square');
        element.classList.add('fa-square-check');
      } else {
        element.classList.add('fa-square');
        element.classList.remove('fa-square-check');
      }
    }

    if (element.classList.contains('fa-square-check')) {
      textInput.classList.add('line-through');
    } else {
      textInput.classList.remove('line-through');
    }

    if (elipsis.classList.contains('fa-trash-can')) {
      const trashIcon = element.parentNode.parentNode.lastElementChild.firstElementChild;
      const deleteTask = element.parentNode.parentNode;
      trashIcon.onclick = () => {
        listArray[element.id].trash = true;
        listArray[element.id].completed = true;
        deleteTask.remove();
      };
      // Filter the array if the trash = true;
      // listArray.filter (function(obj) {
      //   return obj.completed !== true;
      // });

      // Update the indexes
      listArray = listArray.map((todo, index) => {
        todo.id = index;
        return todo;
      });

      localStorage.setItem('list', JSON.stringify(listArray));
    }
  });
};

detectClick();