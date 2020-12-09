Regular Expression Utility
==========================

Usage
-----

### Browser

~~~ html
<script src="./@taufik-nurrohman/pattern/index.js"></script>
<script>
console.log(toPattern('[a-z]+'));
</script>
~~~

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

### esc(pattern, extra)

Escape regular expression characters in string except `\`.

### escChar(pattern, extra)

Escape regular expression characters for character class only. E.g. `^`, `[`, `]`, and `-`.

### fromPattern(pattern)

Get pattern from `RegExp` as string.

### isPattern(x)

Detect if `x` is an instance of `RegExp`.

### token(start, content | contents, end = start, skip)

Build pattern string from parameters.

~~~ js
import {token} from '@taufik-nurrohman/pattern';

console.log(token('"'));
~~~

### tokenGroup(start, content | contents, end = start, skip)

Build pattern string from parameters as a group of `start`, `content` and `end`.

~~~ js
import {tokenGroup} from '@taufik-nurrohman/pattern';

console.log(tokenGroup('"'));
~~~

### toPattern(string, opt = 'g')

Convert pattern string to `RegExp` instance.

### x

List of regular expression&rsquo;s special characters except `\`.
