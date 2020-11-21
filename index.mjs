import {
    isArray,
    isInstance,
    isPattern,
    isSet
} from '@taufik-nurrohman/is';

export let x = `.\\/+*?[^]$(){}=!<>|:-`;

export const esc = (pattern, extra) => pattern.replace(toPattern('[' + extra + x + ']'), '\\$&');
export const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
export const isPattern = isPattern;
export const token = (start, content, end, skip = "", isGroup = false) => {
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

export const tokenGroup = (start, content, end, skip) => token(start, content, end, skip, true);
export const toPattern = (pattern, opt) => {
    if (isPattern(pattern)) {
        return pattern;
    }
    // No need to escape `/` in the pattern string
    pattern = pattern.replace(/\//g, '\\/');
    return new RegExp(pattern, isSet(opt) ? opt : 'g');
};
