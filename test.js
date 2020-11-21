const test = require('ava');
const {
    create,
    createGroup
} = require('./index.js');

test('create', t => {
    t.is(create('"'), '(?:"(?:\\\\.|[^"])*")');
});

test('createGroup', t => {
    t.is(createGroup('"'), '(")((?:\\\\.|[^"])*)(")');
});

test('create#1', t => {
    t.is(create('<', '<\\?[\\s\\S]*?\\?>', '>'), '(?:<(?:(?:<\\?[\\s\\S]*?\\?>)|\\\\.|[^<>])*>)');
    t.is(createGroup('<', '<\\?[\\s\\S]*?\\?>', '>'), '(<)((?:(?:<\\?[\\s\\S]*?\\?>)|\\\\.|[^<>])*)(>)');
});
