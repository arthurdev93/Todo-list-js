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

const editTodo = (id) => {
    const todoToEdit = todoData.find(todo => todo.id === id);
    // abre um prompt para o usuário digitar o novo texto
    const newText = prompt("Enter new text: ", todoToEdit.text);
    todoToEdit.text = newText;
} 

const removeTodo = (id) => {
    todoData = todoData.filter(todo => {
        return todo.id !== id;
    });
    renderTodoList();
}

//por icones lixeira e lápis, hero-icon
const renderTodoList = () => {
    todoList.innerHTML = "";
    todoData.forEach(todo => {
        let listItem = document.createElement("li");
        listItem.innerHTML = `<input type="checkbox" onclick="toggleTodo(${todo.id})" ${todo.completed ? "checked" : ""}>
        <span class="${todo.completed ? "done" : ""}">${todo.text}</span>
        <button onclick="removeTodo(${todo.id})" class="hero-icon-trash"></button>
        <button onclick="edittodo(${todo.id})" data-id="${todo.id}" class="hero-icon-pencil"></button>`;
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

//save list to JSON file
const saveTodoData = () => {
    const jsonData = JSON.stringify(todoData);
    const blob = new Blob([jsonData], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "todo-data.json";
    link.click();
}
saveButton.addEventListener("click", saveTodoData);

//Load from a JSON file
const loadTodoData = () => {
    fetch('./todo-data.json')
        .then(response => response.json())
        .then(data => {
            todoList.innerHTML = " ";
            data.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = item;
                todoList.appendChild(li);
            });
        })
        .catch(error => console.log(error));
};
loadButton.addEventListener("click", loadTodoData);
//fim load
