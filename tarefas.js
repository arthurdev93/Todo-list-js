newBtn.addEventListener("click", () => {
    if (newText.value != ""){
        const newTodo = document.createElement("li");
        newTodo.classList.add("text-center", "p-3", "bg-white", "mt-4", "rounded", "shadow-lg", "cursor-pointer", "hover:bg-blue-200");
        newTodo.innerHTML = newText.value;
        newText.value = "";
        listPend.appendChild(newTodo);
    } else {
        alert("Insira uma nova tarefa");
    }
});

//abaixo mesmo evento de click, mas para a tecla "enter"
newText.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        event.preventDefault();
        newBtn.click();
    }
})

//abaixo, para mover a tarefa de lugar
const move = (element, destination, convertTo) => {
    if (element.localName == "li"){
        if (convertTo == "Concluído"){
            element.classList.add("text-red-500", "line-through", "hover:bg-blue-200", "hover:text-red-700");
        } else {
            element.classList.remove("text-red-500", "line-through", "hover:bg-blue-200", "hover:text-red-700");
        }
        destination.appendChild(element);
    }
};

//clique para marcar como concluido
listPend.addEventListener("click", event => {
    move(event.target, listConc, "Concluído");
})

//clique para marcar como pendente
listConc.addEventListener("click", event => {
    move(event.target, listPend, "Pendente");
})

//função para deletar tarefa
limparBtn.addEventListener("click", event => {
    while (listConc.firstChild) {
        listConc.removeChild(listConc.firstChild);
    }
});