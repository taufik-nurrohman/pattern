// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isInstance,
        isSet
    } = require('@taufik-nurrohman/is');
    let x = '!$^*()-=+[]{}\\|:<>,./?';
    const esc = (str, extra) => str.replace(toPattern('[' + x + extra + ']'), '\\$&');
    const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
    const isPattern = pattern => pattern && isInstance(pattern, RegExp);
    const toPattern = (pattern, opt) => {
        if (isPattern(pattern)) {
            return pattern;
        }
        // No need to escape `/` in the pattern string
        pattern = pattern.replace(/\//g, '\\/');
        return new RegExp(pattern, isSet(opt) ? opt : 'g');
    };
    $$.esc = esc;
    $$.fromPattern = fromPattern;
    $$.isPattern = isPattern;
    $$.toPattern = toPattern;
    $$.x = x;
})(exports || window || {});
