const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

renderTodoList();

// todoInput.addEventListener('keyup', function(event) {
//   if (event.keyCode === 13) { // 13 is the Enter key
//     addTodoItem();
//   }
// });

addBtn.addEventListener('click', addTodoItem);

function addTodoItem() {
  const todoText = todoInput.value.trim();

  if (todoText !== '') {
    const todoItem = {
      text: todoText,
      timestamp: Date.now()
    };
    todoItems.unshift(todoItem);

    
    localStorage.setItem('todoItems', JSON.stringify(todoItems));

    
    todoInput.value = '';
    renderTodoList();
  }
}


function removeTodoItem(index) {
  
  todoItems.splice(index, 1);

  
  localStorage.setItem('todoItems', JSON.stringify(todoItems));

  
  renderTodoList();
}


function renderTodoList() {
  
  todoList.innerHTML = '';

  for (let i = 0; i < todoItems.length; i++) {
    const todoItem = todoItems[i];

    const li = document.createElement('li');
    li.textContent = todoItem.text;
    li.title = 'Created on: ' + new Date(todoItem.timestamp).toLocaleString();

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.title = 'Remove task';
    removeBtn.addEventListener('click', function() {
      removeTodoItem(i);
    });

    li.appendChild(removeBtn);
    todoList.appendChild(li);
  }
}

