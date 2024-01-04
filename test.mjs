import ava from 'ava';
import {fromPattern, toPattern, token, tokenGroup} from './index.mjs';

ava('fromPattern', t => {
    t.is(fromPattern(/asdf\/asdf/), 'asdf\\/asdf');
});

ava('toPattern', t => {
    t.is(toPattern('asdf/asdf').source, 'asdf\\/asdf');
});

ava('token', t => {
    t.is(token('"'), '"(?:\\\\.|[^"])*"');
});

ava('tokenGroup', t => {
    t.is(tokenGroup('"'), '(")((?:\\\\.|[^"])*)(")');
});

ava('token#1', t => {
    t.is(token('<', ['<\\?[\\s\\S]*?\\?>'], '>'), '\\<(?:<\\?[\\s\\S]*?\\?>|\\\\.|[^<>])*\\>');
    t.is(tokenGroup('<', ['<\\?[\\s\\S]*?\\?>'], '>'), '(\\<)((?:<\\?[\\s\\S]*?\\?>|\\\\.|[^<>])*)(\\>)');
});