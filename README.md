Regular Expression Utility
==========================

Usage
-----

### CommonJS

~~~ js
const {toPattern} = require('@taufik-nurrohman/pattern');

console.log(toPattern('[a-z]+'));
~~~

### ECMAScript

~~~ js
import {toPattern} from '@taufik-nurrohman/pattern';

console.log(toPattern('[a-z]+'));
~~~

Methods
-------

### esc(pattern, extra = "")

Escape regular expression characters in string except `\`.

### escChar(pattern, extra = "")

Escape regular expression characters for character class only. E.g. `^`, `[`, `]`, and `-`.

### extractInner(content, start, end, opt = "")

Extract nesting constructs in a string.

~~~ js
console.log(extractInner('a(b(c))d(e)f((g)h)', '\\(', '\\)'));
~~~

~~~ js
[
    ['b(c)', [
        ['c', [], 2, 3]
    ], 2, 6],
    ['e', [], 9, 10],
    ['(g)h', [
        ['g', [], 1, 2]
    ], 13, 17]
]
~~~

### extractTokens(content, tokens, defaultTokenName = 0)

~~~ js
console.log(extractTokens('This is an <a href="https://example.com">active link</a> and an <a>empty link</a>.', [
    ['(<)([\\w:-]+)(\\s[^>]*?)?(>)', ['tag', 'p', 'name', [
        ['"[^"]+"', 'value'],
        ['=', 'p'],
        ['[\\w:-]+', 'key']
    ], 'p']],
    ['(<)(/)([\\w:-]+)(>)', ['tag', 'p', 'p', 'name', 'p']]
]));
~~~

~~~ js
[
    [['This is an '], [0]],
    [['<a href="https://example.com">', '<', 'a', ' href="https://example.com"', '>'], ['tag', 'p', 'name', [
        [[' '], [0]],
        [['href'], ['key']],
        [['='], ["p"]],
        [['"https://example.com"'], ['value']]
    ], 'p']],
    [['active link'], [0]],
    [['</a>', '<', '/', 'a', '>'], ['tag', 'p', 'p', 'name', 'p']],
    [[' and an '], [0]],
    [['<a>', '<', 'a', undefined, '>'], ['tag', 'p', 'name', 0, 'p']],
    [['empty link'], [0]],
    [['</a>', '<', '/', 'a', '>'], ['tag', 'p', 'p', 'name', 'p']],
    [['.'], [0]]
]
~~~

### fromPattern(pattern)

Get pattern from `RegExp` as string.

### isPattern(x)

Detect if `x` is an instance of `RegExp`.

### token(start, content|contents, end = start, skip)

Build pattern string from parameters.

~~~ js
console.log(token('"'));
~~~

### tokenGroup(start, content|contents, end = start, skip)

Build pattern string from parameters as a group of `start`, `content` and `end`.

~~~ js
console.log(tokenGroup('"'));
~~~

### toPattern(string, opt = 'g')

Convert pattern string to `RegExp` instance.

### x

List of regular expression&rsquo;s special characters except `\`.