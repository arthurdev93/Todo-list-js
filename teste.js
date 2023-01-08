const assert = require('assert');

//definição das variáveis newBtn, newText, listPend, listConc e limparBtn 
const newText = get("newText");
const newBtn = get("newBtn");
const limparBtn = get("limparBtn");
const listPend = get("listPend");
const listConc = get("listConc");

// Aqui testo se as tarefas são adicionadas corretamente à lista pendente
newText.value = 'Comprar pão';
newBtn.click();
assert.equal(listPend.children.length, 1);
assert.equal(listPend.children[0].innerHTML, 'comprar pão');

// Teste para verificar se as tarefas são transferidas para 'concluídas'
listPend.children[0].click();
assert.equal(listPend.children.length, 0);
assert.equal(listConc.children.length, 1);
assert.equal(listConc.children[0].innerHTML, 'comprar pão');

// Aqui verificar se as tarefas são transferidas de concluidas para pendentes  
listConc.children[0].click();
assert.equal(listPend.children.length, 1);
assert.equal(listConc.children.length, 0);
assert.equal(listPend.children[0].innerHTML, 'comprar pão');

// Teste para verificar se as tarefas são deletadas com botão limpar 
limparBtn.click();
assert.equal(listConc.children.length, 0);
