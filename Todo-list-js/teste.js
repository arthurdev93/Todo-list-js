const assert = require('assert');   //aqui importei o módulo

// Cria os eventos de forma simulada, e verifica se os comportamentos são implantados

//>>>PARTE 1: SIMULAÇÃO DE EVENTOS
//aqui simula inserção de nova tarefa pelo campo de texto
const newText = { value: '' };
const newBtn = {
  addEventListener(event, callback) {
    this.callback = callback;   //usei o "callback" como argumento para a função click 
  },
  click() {
    this.callback;  
  }
};  

//simula lista pendente
const listPend = {
  children: [],
  appendChild(element) {
    this.children.push(element);
  }
};

//simula comportamento da lista de concluídos
const listConc = {
  children: [],
  appendChild(element) {
    this.children.push(element);
  }
};

//simula o comportamento do botão "limpar" tarefa
const limparBtn = {
  addEventListener(event, callback) {
    this.callback = callback;
  },
  click() {
    this.callback();
  }
};

//>>>PARTE 2: TESTE DOS EVENTOS, PARA CADA TAREFA
// Aqui testo se as tarefas são adicionadas corretamente à lista pendente
newText.value = 'Comprar pão';
newBtn.click();
assert.equal(listPend.children.length, 1);
assert.equal(listPend.children[0].innerHTML, 'Comprar pão');

// Teste para verificar se as tarefas são transferidas para 'concluídas'
listPend.children[0].click();
assert.equal(listPend.children.length, 0);
assert.equal(listConc.children.length, 1);
assert.equal(listConc.children[0].innerHTML, 'Comprar pão');

// Aqui verificar se as tarefas são transferidas de concluidas para pendentes  
listConc.children[0].click();
assert.equal(listPend.children.length, 1);
assert.equal(listConc.children.length, 0);
assert.equal(listPend.children[0].innerHTML, 'Comprar pão');

// Teste para verificar se as tarefas são deletadas com botão limpar 
limparBtn.click();
assert.equal(listConc.children.length, 0);
