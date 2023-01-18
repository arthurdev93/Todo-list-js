//SALVAR FUNCIONA
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

//abaixo, load, esse não funcionou
const loadTodoData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            todoData = JSON.parse(reader.result);
            renderTodoList();
        }
    });
    input.click();
}
loadButton.addEventListener("click", loadTodoData);

//LOAD tentativa 2, também não
const loadTodoData = async () => {
    const response = await fetch('todo-data.json');
    const data = await response.json();
    todoData = data;
    renderTodoList();
}
loadButton.addEventListener("click", loadTodoData);

//LOAD tent 3
const loadTodoData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            todoData = JSON.parse(reader.result);
            renderTodoList();
        }
    });
    input.click();
}
loadButton.addEventListener("click", loadTodoData);
/* 
3:
A função cria um elemento de input do tipo file e adiciona um evento de mudança nele, quando o usuário seleciona um arquivo, ele é lido usando o FileReader, e então usa JSON.parse para analisar o conteúdo do arquivo e atribuí-lo à variável todoData.
Dessa forma o usuário pode carregar um arquivo JSON de qualquer pasta do computador dele.

4:
Adicionei a verificação de erro de parse de JSON, para que seja informado ao usuário se o arquivo selecionado não for um arquivo JSON válido.
Adicionei uma mensagem de alerta para confirmar que o arquivo foi carregado com sucesso.
*/

//LOAD 4
const loadTodoData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";

    input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            try {
                todoData = JSON.parse(reader.result);
                renderTodoList();
                alert('Arquivo carregado com sucesso!')
            } catch (e) {
                alert('Arquivo inválido, por favor selecione um arquivo JSON válido.')
            }
        }
    });
    input.click();
}
loadButton.addEventListener("click", loadTodoData);

//LOAD 5
const loadTodoData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.click();
    input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            try {
                todoData = JSON.parse(reader.result);
                renderTodoList();
                alert('Arquivo carregado com sucesso!')
            } catch (e) {
                alert('Arquivo inválido, por favor selecione um arquivo JSON válido.')
            }
        }
    });
}
loadButton.addEventListener("click", loadTodoData);

//LOAD 6
const loadTodoData = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.click();
    input.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            try {
                todoData = JSON.parse(reader.result);
                renderTodoList();
                alert('Arquivo carregado com sucesso!')
            } catch (e) {
                alert('Arquivo inválido, por favor selecione um arquivo JSON válido.')
            }
        }
        reader.readAsText(file);
    });
}
loadButton.addEventListener("click", loadTodoData);

//dica vinicius
fetch('./Data.json')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));