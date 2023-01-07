const assert = require("assert");

const value1 = 'Hello';
const value2 = 'Hello';

assert.equal(value1, value2);
// Nenhuma msg de erro é esperada, pois value1 e value2 são iguais

const value3 = 'world';

assert.equal(value1, value3);
// aqui forço uma msg de erro "AssertionError" pois value1 e value3 não são iguais
