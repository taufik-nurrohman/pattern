import {
    isInstance,
    isSet
} from '@taufik-nurrohman/is';

export let x = '!$^*()-=+[]{}\\|:<>,./?';

export const esc = (str, extra) => str.replace(toPattern('[' + x + extra + ']'), '\\$&');
export const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
export const isPattern = pattern => pattern && isInstance(pattern, RegExp);
export const toPattern = (pattern, opt) => {
    if (isPattern(pattern)) {
        return pattern;
    }
    // No need to escape `/` in the pattern string
    pattern = pattern.replace(/\//g, '\\/');
    return new RegExp(pattern, isSet(opt) ? opt : 'g');
};
