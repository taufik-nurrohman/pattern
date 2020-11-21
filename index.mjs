import {
    isInstance,
    isPattern,
    isSet
} from '@taufik-nurrohman/is';

export let EXP = '!$^*()-=+[]{}\\|:<>,./?';
export let PUN = '!"#$%&\'\\(\\)*+,\\-./:;<=>?@\\[\\]\\\\^_`{|}~';

export const create = (startChar, contains, endChar, asGroup) => {
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

export const createGroup = (startChar, contains, endChar) => create(startChar, contains, endChar, true);

export const esc = (str, extra) => str.replace(toPattern('[' + EXP + extra + ']'), '\\$&');
export const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
export const isPattern = isPattern;

export const toPattern = (pattern, opt) => {
    if (isPattern(pattern)) {
        return pattern;
    }
    // No need to escape `/` in the pattern string
    pattern = pattern.replace(/\//g, '\\/');
    return new RegExp(pattern, isSet(opt) ? opt : 'g');
};
