const {isArray, isInstance, isSet} = require('@taufik-nurrohman/is');
const {toArray, toCount} = require('@taufik-nurrohman/to');

const esc = (pattern, extra = "") => pattern.replace(toPattern('[' + extra + x.replace(/./g, '\\$&') + ']'), '\\$&');

const escChar = (pattern, extra = "") => pattern.replace(toPattern('[' + extra + '\\^\\[\\]\\-]'), '\\$&');

const extractInner = (content, start, end, opt = "") => {
    if (!content) {
        return [];
    }
    let patternStart = toPattern(start, opt),
        patternExec = toPattern(start + '|' + end, 'g' + opt),
        out = [],
        i, j, k, m, v;
    do {
        i = 0;
        while (m = patternExec.exec(content)) {
            if (patternStart.test(m[0])) {
                if (!i++) {
                    j = patternExec.lastIndex;
                }
            } else if (i) {
                if (!--i) {
                    out.push([
                        v = content.slice(j, k = m.index),
                        extractInner(v, start, end, opt),
                        j,
                        k
                    ]);
                }
            }
        }
    } while (i && (patternExec.lastIndex = j));
    return out;
};

const extractTokens = (content, tokens, defaultTokenName = 0) => {
    let index,
        j = toCount(tokens),
        out = [], r, token, v;
    while (content) {
        token = 0;
        index = toCount(content);
        for (let i = 0; i < j; ++i) {
            r = toPattern(tokens[i][0]);
            v = r.exec(content);
            if (v && (v.index < index)) {
                index = v.index;
                token = [Array.from(v), toArray(tokens[i][1])];
            }
        }
        index && out.push([[content.slice(0, index)], [defaultTokenName]]);
        if (token) {
            token[1] = token[1].map((v, k) => {
                if (isArray(v)) {
                    v = extractTokens(token[0][k], v);
                    return toCount(v) ? v : defaultTokenName;
                }
                return v;
            });
            out.push(token);
        }
        content = content.slice(index + (token ? toCount(token[0][0]) : 0));
    }
    return out;
};

const fromPattern = pattern => {
    if (isPattern(pattern)) {
        return pattern.source.replace(/\\\//g, '/');
    }
    return null;
};

const isPattern = pattern => isInstance(pattern, RegExp);

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
    pattern = pattern.replace(/\//g, '\\/');
    return new RegExp(pattern, isSet(opt) ? opt : 'g');
};

let x = `!$^*()+=[]{}|:<>,.?/-`;

Object.assign(exports, {
    esc,
    escChar,
    extractInner,
    extractTokens,
    fromPattern,
    isPattern,
    token,
    tokenGroup,
    toPattern,
    x
});
