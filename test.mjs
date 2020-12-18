import ava from 'ava';
import {token, tokenGroup} from './index.mjs';

ava('token', t => {
    t.is(token('"'), '"(?:\\\\.|[^"])*"');
});

ava('tokenGroup', t => {
    t.is(tokenGroup('"'), '(")((?:\\\\.|[^"])*)(")');
});

ava('token#1', t => {
    t.is(token('<', ['<\\?[\\s\\S]*?\\?>'], '>'), '<(?:<\\?[\\s\\S]*?\\?>|\\\\.|[^<>])*>');
    t.is(tokenGroup('<', ['<\\?[\\s\\S]*?\\?>'], '>'), '(<)((?:<\\?[\\s\\S]*?\\?>|\\\\.|[^<>])*)(>)');
});
