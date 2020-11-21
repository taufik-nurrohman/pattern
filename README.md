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

### Browser Module

~~~ html
<script type="module">
import {toPattern} from './@taufik-nurrohman/pattern/index.mjs';

console.log(toPattern('[a-z]+'));
</script>
~~~

### CommonJS Module

~~~ js
const {toPattern} = require('@taufik-nurrohman/pattern');

console.log(toPattern('[a-z]+'));
~~~

### ECMAScript Module

~~~ js
import {toPattern} from '@taufik-nurrohman/pattern';

console.log(toPattern('[a-z]+'));
~~~

Methods
-------

### esc(string, extra)

Escape regular expression character(s) in string.

### fromPattern(pattern)

Get pattern from `RegExp` as string.

### isPattern(x)

Detect if `x` is an instance of `RegExp`.

### toPattern(string, opt = 'g')

Convert pattern string to `RegExp` instance.

### x

List of regular expression character(s) to escape.
