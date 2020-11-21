// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isInstance,
        isPattern,
        isSet
    } = require('@taufik-nurrohman/is');
    let x = '!$^*()-=+[]{}\\|:<>,./?';
    const create = (startChar, contains, endChar, asGroup) => {
        let notContains = startChar;
        contains = contains ? '(?:' + contains + ')|' : "";
        if (endChar) {
            notContains += endChar;
        } else {
            endChar = startChar;
        }
        if (asGroup) {
            return '(' + esc(startChar) + ')((?:' + contains + '\\\\.|[^' + esc(notContains) + '])*)(' + esc(endChar) + ')';
        }
        return '(?:' + esc(startChar) + '(?:' + contains + '\\\\.|[^' + esc(notContains) + '])*' + esc(endChar) + ')';
    };
    const createGroup = (startChar, contains, endChar) => create(startChar, contains, endChar, true);
    const esc = (str, extra) => str.replace(toPattern('[' + x + extra + ']'), '\\$&');
    const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
    const toPattern = (pattern, opt) => {
        if (isPattern(pattern)) {
            return pattern;
        }
        // No need to escape `/` in the pattern string
        pattern = pattern.replace(/\//g, '\\/');
        return new RegExp(pattern, isSet(opt) ? opt : 'g');
    };
    $$.create = create;
    $$.createGroup = createGroup;
    $$.esc = esc;
    $$.fromPattern = fromPattern;
    $$.isPattern = isPattern;
    $$.toPattern = toPattern;
    $$.x = x;
})(exports || window || {});
