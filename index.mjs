import {isArray, isInstance, isSet} from '@taufik-nurrohman/is';
import {toArray, toCount} from '@taufik-nurrohman/to';

export const esc = (pattern, extra = "") => pattern.replace(toPattern('[' + extra + x.replace(/./g, '\\$&') + ']'), '\\$&');

export const escChar = (pattern, extra = "") => pattern.replace(toPattern('[' + extra + '\\^\\[\\]\\-]'), '\\$&');

// Based on <https://blog.stevenlevithan.com/archives/javascript-match-recursive-regexp>
export const extractInner = (content, start, end, opt = "") => {
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
                        // Value between `start` and `end`
                        v = content.slice(j, k = m.index),
                        // Recurse!
                        extractInner(v, start, end, opt),
                        // Index after `start`
                        j,
                        // Index before `end`
                        k
                    ]);
                }
            }
        }
    } while (i && (patternExec.lastIndex = j));
    return out;
};

// Based on <https://gist.github.com/borgar/451393>
export const extractTokens = (content, tokens, defaultTokenName = 0) => {
    let index,
        j = toCount(tokens),
        out = [], r, token, v;
    while (content) {
        token = 0; // Reset
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
                    // Recurse!
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

export const fromPattern = pattern => {
    if (isPattern(pattern)) {
        return pattern.source;
    }
    return null;
};

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
    return new RegExp(pattern, isSet(opt) ? opt : 'g');
};

export let x = `!$^*()+=[]{}|:<>,.?/-`;