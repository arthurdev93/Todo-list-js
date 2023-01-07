const assert = require("assert");

const value1 = 'Hellou';
const value2 = 'Hello';

assert.equal(value1, value2);
// Nenhuma exceção é lançada, pois value1 e value2 são iguais

const value3 = 'world';

assert.equal(value1, value3);
// Uma exceção AssertionError é lançada, pois value1 e value3 não são iguais
