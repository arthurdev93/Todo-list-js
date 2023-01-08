const assert = require('assert');

// Cria os elementos de forma simulada
const newText = { value: '' };
const newBtn = {
  addEventListener(event, callback) {
    this.callback = callback;
  },
  click() {
    this.callback;
  }
};
const limparBtn = {
  addEventListener(event, callback) {
    this.callback = callback;
  },
  click() {
    this.callback();
  }
};
const listPend = {
  children: [],
  appendChild(element) {
    this.children.push(element);
  }
};
const listConc = {
  children: [],
  appendChild(element) {
    this.children.push(element);
  }
};

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
