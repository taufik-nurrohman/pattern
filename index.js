// This file is in sync with `index.mjs` file to enable CommonJS module loader feature.
// If you want to add/remove something here, make sure to do it in `index.mjs` file first.
($$ => {
    const {
        isArray,
        isInstance,
        isPattern,
        isSet
    } = require('@taufik-nurrohman/is');
    let x = `.\\/+*?[^]$(){}=!<>|:-`;
    const esc = (pattern, extra) => pattern.replace(toPattern('[' + extra + x + ']'), '\\$&');
    const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
    const isPattern = isPattern;
    const token = (start, content, end, skip = "", isGroup = false) => {
        skip += start;
        if (end) {
            skip += end;
        } else {
            end = start;
        }
        let $ = "";
        if (skip) {
            skip = skip.replace(/][-/g, '\\$&');
            $ = '|[^' + skip + ']';
            skip = '\\[' + skip + ']|';
        }
        content = (isArray(content) ? content.join('|') : content) || '[\\s\\S]';
        if (isGroup) {
            return '(' + esc(start) + ')((?:' + skip + content + $ + ')*?)(' + esc(end) + ')';
        }
        return esc(start) + '(?:' + skip + content + $ + ')' + esc(end);
    };
    const tokenGroup = (start, content, end, skip) => token(start, content, end, skip, true);
    const toPattern = (pattern, opt) => {
        if (isPattern(pattern)) {
            return pattern;
        }
        pattern = pattern.replace(/\//g, '\\/');
        return new RegExp(pattern, isSet(opt) ? opt : 'g');
    };
    $$.esc = esc;
    $$.fromPattern = fromPattern;
    $$.isPattern = isPattern;
    $$.token = token;
    $$.tokenGroup = tokenGroup;
    $$.toPattern = toPattern;
    $$.x = x;
})(exports || window || {});
