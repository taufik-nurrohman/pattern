const test = require('ava');
const {
    token,
    tokenGroup
} = require('./index.js');

test('token', t => {
    t.is(token('"'), '"(?:\\\\.|[^"])*"');
});

test('tokenGroup', t => {
    t.is(tokenGroup('"'), '(")((?:\\\\.|[^"])*)(")');
});

test('token#1', t => {
    t.is(token('<', ['<\\?[\\s\\S]*?\\?>'], '>'), '<(?:<\\?[\\s\\S]*?\\?>|\\\\.|[^<>])*>');
    t.is(tokenGroup('<', ['<\\?[\\s\\S]*?\\?>'], '>'), '(<)((?:<\\?[\\s\\S]*?\\?>|\\\\.|[^<>])*)(>)');
});
