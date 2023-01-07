const assert = require('assert');

// Adicione o código que define as variáveis newBtn, newText, listPend, listConc e limparBtn aqui

// Teste para verificar se as tarefas são adicionadas corretamente à lista pendente
newText.value = 'Comprar pão';
newBtn.click();
assert.equal(listPend.children.length, 1);
assert.equal(listPend.children[0].innerHTML, 'Comprar pão');

// Teste para verificar se as tarefas são marcadas como concluídas corretamente
listPend.children[0].click();
assert.equal(listPend.children.length, 0);
assert.equal(listConc.children.length, 1);
assert.equal(listConc.children[0].innerHTML, 'Comprar pão');

// Teste para verificar se as tarefas são marcadas como pendentes novamente corretamente
listConc.children[0].click();
assert.equal(listPend.children.length, 1);
assert.equal(listConc.children.length, 0);
assert.equal(listPend.children[0].innerHTML, 'Comprar pão');

// Teste para verificar se as tarefas são removidas corretamente quando o botão de limpar é clicado
limparBtn.click();
assert.equal(listConc.children.length, 0);
