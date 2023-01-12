const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");
const todoList = document.getElementById("todo-list");

let todoData = [];

const addTodo = (e) => {
    e.preventDefault();
    let todoText = todoInput.value;
    if(!todoText) return;
    let newTodo = {
        text: todoText,
        id: Date.now(),
        completed: false
    };
    todoData.push(newTodo);
    todoInput.value = "";
    renderTodoList();
}

const toggleTodo = (id) => {
    todoData = todoData.map(todo => {
        if(todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    renderTodoList();
}

const removeTodo = (id) => {
    todoData = todoData.filter(todo => {
        return todo.id !== id;
    });
    renderTodoList();
}

//AQUI EMBAIXO VER COMO POR RECURSO DE EDITAR NOTA
const renderTodoList = () => {
    todoList.innerHTML = "";
    todoData.forEach(todo => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<input type="checkbox" onclick="toggleTodo(${todo.id})" ${todo.completed ? "checked" : ""}>
        <span class="${todo.completed ? "done" : ""}">${todo.text}</span>
        <button onclick="removeTodo(${todo.id})">Remove</button>`;
        todoList.appendChild(listItem);
    });
    }
    
    addButton.addEventListener("click", addTodo);

    // sorting function
    const sortByDate = () => {
        todoData.sort((a, b) => b.id - a.id);
        renderTodoList();
    }
    
    const sortByCompletion = () => {
        todoData.sort((a, b) => {
            if(a.completed === b.completed) return 0;
            if(a.completed) return 1;
            if(b.completed) return -1;
        });
        renderTodoList();
    }
    
/* 
This code sets up a simple to-do list app that allows the user to add new items, toggle their completion status, and remove them. The todoData array stores the data for each to-do item, and the renderTodoList function updates the view to match the current state of the data. The addTodo, toggleTodo and removeTodo functions handle the user interactions and update the data.
Additionally, you have sorting functions that enable the user to sort the items by their creation date, completion status.
Please be aware that this is a very basic example and it would require more advanced and complex logic to create a production-ready app.
*/