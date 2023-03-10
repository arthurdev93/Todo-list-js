const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const saveButton = document.getElementById("save-button");
const loadButton = document.getElementById("load-button");
const todoList = document.getElementById("todo-list");

let todoData = [];      //cria array para lista

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
    //abaixo, sorteia ordem ao adicionar novas tarefas 
    todoData.sort((a, b) => {
    if (a.completed === b.completed) {
        return 0;
    }
    if (a.completed === false) {
        return -1;
    }
    return 1;
    });

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
    let newText = prompt("Enter new text: ");
    // verifica se campo prompt não está vazion
    let taskUpdated = false;
    if (!newText) {
        alert("You have not entered any text, the task will not be updated.");
    }
    else if(newText.trim() == ''){
        alert("You have not entered any text, the task will not be updated.");
    }
    else {
        taskUpdated = true;
        todoData.forEach(todo => {
            if (todo.id === id) {
                todo.text = newText;
            }
        });
    }
    renderTodoList();
} 

const removeTodo = (id) => {
    todoData = todoData.filter(todo => {
        return todo.id !== id;
    });
    renderTodoList();
}

const renderTodoList = () => {
    //atualiza a ordem das tarefas, sempre que essa função (renderTodoList) for chamada
    todoData.sort((a, b) => {
        if (a.completed === b.completed) {
          return 0;
        }
        if (a.completed === false) {
          return -1;
        }
        return 1;
      });      
    todoList.innerHTML = "";
    todoData.forEach(todo => {
        let listItem = document.createElement("li");
        listItem.classList.add("px-4", "py-3", "bg-white", "shadow-md", "rounded");
        
        let removeButton = document.createElement("button");
        removeButton.classList.add("trash");
        removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 30 30" fill="currentColor" class="w-5 h-5 mr-2 ml-2 hover:text-red-600">
        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
      </svg>`;
        removeButton.onclick = () => removeTodo(todo.id);

        let editButton = document.createElement("button");
        editButton.classList.add("pencil");
        editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -8 30 30" fill="currentColor" class="w-5 h-5 hover:text-blue-500">
            <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>`;
        editButton.onclick = () => editTodo(todo.id);
        listItem.innerHTML = `<input type="checkbox" onclick="toggleTodo(${todo.id})" ${todo.completed ? "checked" : ""}>
        <span class="${todo.completed ? "done" : ""} ${todo.completed ? "opacity-50" : ""}">${todo.text}</span>`;
        
        let checkbox = listItem.querySelector("input[type='checkbox']");
        checkbox.checked = todo.completed;
        checkbox.onchange = () => toggleTodoComplete(todo.id);

        if (todo.completed) {
            removeButton.classList.add("opacity-50");
            editButton.classList.add("opacity-50");
        }

        listItem.appendChild(removeButton);
        listItem.appendChild(editButton);
        todoList.appendChild(listItem);
    });
}
addButton.addEventListener("click", addTodo);
 
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

//Load from a JSON file ***não está funcionando
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

