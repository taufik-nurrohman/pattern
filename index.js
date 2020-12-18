const {isArray, isInstance, isPattern, isSet} = require('@taufik-nurrohman/is');

const esc = (pattern, extra) => pattern.replace(toPattern('[' + extra + x + ']'), '\\$&');
const escChar = (pattern, extra) => pattern.replace(toPattern('[' + extra + '\\^\\[\\]\\-]'), '\\$&');
const fromPattern = pattern => isPattern(pattern) ? pattern.source : null;
const token = (start, content, end, skip = "", isGroup = false) => {
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

const tokenGroup = (start, content, end, skip) => token(start, content, end, skip, true);
const toPattern = (pattern, opt) => {
    if (isPattern(pattern)) {
        return pattern;
    }
    // No need to escape `/` in the pattern string
    pattern = pattern.replace(/\//g, '\\/');
    return new RegExp(pattern, isSet(opt) ? opt : 'g');
};

let x = `!$^*()+=[]{}|:<>,.?/-`;

Object.assign(exports || {}, {
    esc,
    escChar,
    fromPattern,
    isPattern,
    token,
    tokenGroup,
    toPattern,
    x
});
