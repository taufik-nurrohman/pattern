// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isArray,
        isInstance,
        isPattern,
        isSet
    } = require('@taufik-nurrohman/is');
    let P = '!"#$%&\'\\(\\)*+,\\-./:;<=>?@\\[\\]\\\\^_`{|}~';
    let X = '!$^*()-=+[]{}\\|:<>,./?';
    const esc = (str, extra) => str.replace(toPattern('[' + X + extra + ']'), '\\$&');
    const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
    const isPattern = isPattern;
    const token = (start, content, end, skip = "", isGroup = false) => {
        skip += start;
        if (end) {
            skip += end;
        } else {
            end = start;
        }
        let x = "";
        if (skip) {
            skip = esc(skip);
            x = '|[^' + skip + ']';
            skip = '\\[' + skip + ']|';
        }
        content = (isArray(content) ? content.join('|') : content) || '[\\s\\S]';
        if (isGroup) {
            return '(' + esc(start) + ')((?:' + skip + content + x + ')*?)(' + esc(end) + ')';
        }
        return esc(start) + '(?:' + skip + content + x + ')' + esc(end);
    };
    const tokenGroup = (start, content, end, skip) => token(start, content, end, skip, true);
    const toPattern = (pattern, opt) => {
        if (isPattern(pattern)) {
            return pattern;
        }
        // No need to escape `/` in the pattern string
        pattern = pattern.replace(/\//g, '\\/');
        return new RegExp(pattern, isSet(opt) ? opt : 'g');
    };
    $$.P = P;
    $$.X = X;
    $$.esc = esc;
    $$.fromPattern = fromPattern;
    $$.token = token;
    $$.tokenGroup = tokenGroup;
    $$.toPattern = toPattern;
})(exports || window || {});
