function bitwise(str:string) {
    var hash = 0;
    if (str.length == 0)
        return hash;
    for (var i = 0; i < str.length; i++) {
        var ch = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + ch;
        hash = hash & hash;
    }
    return hash;
};
function binaryTransfer(integer:number, binary:any) {
    var dictionary = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    binary = binary || 62;
    var stack = [];
    var num;
    var result = '';
    var sign = integer < 0 ? '-' : '';
    integer = Math.abs(integer);
    while (integer >= binary) {
        num = integer % binary;
        integer = Math.floor(integer / binary);
        stack.push(dictionary[num]);
    }
    if (integer > 0) {
        stack.push(dictionary[integer]);
    }
    for (var i = stack.length - 1; i >= 0; i--) {
        result += stack[i];
    }
    return sign + result;
};
export function shortHash(text:string) {
    var type = typeof text;
    if (type === "string" || type === "number") {
        var id = binaryTransfer(bitwise(String(text)), 61);
        return id.replace('-', 'z').toLowerCase();
    }
    else {
        throw new Error("Unexpected input type");
    }
};
