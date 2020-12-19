import {isArray, isInstance, isSet} from '@taufik-nurrohman/is';

export const esc = (pattern, extra) => pattern.replace(toPattern('[' + extra + x + ']'), '\\$&');
export const escChar = (pattern, extra) => pattern.replace(toPattern('[' + extra + '\\^\\[\\]\\-]'), '\\$&');
export const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
export const isPattern = pattern => isInstance(pattern, RegExp);
export const token = (start, content, end, skip = "", isGroup = false) => {
    skip += start;
    if (end) {
        if (end !== start) {
            skip += end;
        }
    } else {
        end = start;
    }
    content = isArray(content) ? content.join('|') : (content || "");
    if (skip) {
        content += (content ? '|' : "") + '\\\\.|[^' + escChar(skip) + ']';
    }
    if (isGroup) {
        return '(' + esc(start) + ')((?:' + content + ')*)(' + esc(end) + ')';
    }
    return esc(start) + '(?:' + content + ')*' + esc(end);
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

export let x = `!$^*()+=[]{}|:<>,.?/-`;
