import {
    isArray,
    isInstance,
    isPattern,
    isSet
} from '@taufik-nurrohman/is';

export let P = '!"#$%&\'\\(\\)*+,\\-./:;<=>?@\\[\\]\\\\^_`{|}~';
export let X = '!$^*()-=+[]{}\\|:<>,./?';

export const esc = (str, extra) => str.replace(toPattern('[' + X + extra + ']'), '\\$&');
export const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
export const isPattern = isPattern;
export const token = (start, content, end, skip = "", isGroup = false) => {
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

export const tokenGroup = (start, content, end, skip) => token(start, content, end, skip, true);
export const toPattern = (pattern, opt) => {
    if (isPattern(pattern)) {
        return pattern;
    }
    // No need to escape `/` in the pattern string
    pattern = pattern.replace(/\//g, '\\/');
    return new RegExp(pattern, isSet(opt) ? opt : 'g');
};
