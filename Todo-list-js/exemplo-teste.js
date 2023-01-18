const assert = require("assert");

const valor1 = 'Maria';
const valor2 = 'Maria';

assert.equal(valor1, valor2);
// Nenhuma msg de erro é esperada, ja q valor1 e valor2 são iguais

const valor3 = 'Jose';

assert.equal(valor1, valor3);
// aqui forço uma msg de erro "AssertionError" pq valor1 e valor3 não são iguais
