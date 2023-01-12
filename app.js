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
    const input = document.createElement("input");
    input.type = "file";
    input.style.display = "none";
    document.body.appendChild(input);
    input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if(file){
            const formData = new FormData();
            formData.append("file", file);
            try {
                const response = await fetch('./todo-data.json', {
                    method: "POST",
                    body: formData
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    });
    input.click();
}
loadButton.addEventListener("click", loadTodoData);

//fim load