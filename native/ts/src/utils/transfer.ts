let encode =
    "YSk37fRAR98QHGX1e25sRX53NmAqg6SMgSCrFXyJAJ6v3TkSjGDkVUSKbsnod5bTuEYf";
let hex =
    "2c000000365658377a6e43597574704e347a346b7952413642387558694b3669504e37393965666a4772386d337246580000";

/**
 * hex to dec bytes
 * @param hex
 * @returns
 */
export const hexToBytes = function (hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
};

/**
 * dec bytes to hex
 * @param bytes
 * @returns
 */
export const bytesToHex = function (bytes) {
    for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xf).toString(16));
    }
    return hex.join("");
};

/**
 * dec bytes to String
 * @param arr
 * @returns
 */
export const bytesToString = function (arr) {
    var str = "";
    arr = new Uint8Array(arr);
    for (let i in arr) {
        str += String.fromCharCode(arr[i]);
    }
    return str;
};

/**
 * string to dec bytes
 * @param str
 * @returns
 */
export const stringToBytes = function (str) {
    var ch,
        st,
        re = [];
    for (var i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        st = [];
        do {
            st.push(ch & 0xff);
            ch = ch >> 8;
        } while (ch);
        re = re.concat(st.reverse());
    }
    return re;
};

/**
 * hex to string
 * @param hex
 * @returns
 */
export const hexToString = function (hex) {
    var arr = hex.split("");
    var out = "";
    for (var i = 0; i < arr.length / 2; i++) {
        var tmp: any = "0x" + arr[i * 2] + arr[i * 2 + 1];
        var charValue = String.fromCharCode(tmp);
        out += charValue;
    }
    return out;
};

/**
 * string to hex
 * @param str
 * @returns
 */
export const stringToHex = function (str) {
    var val = "";
    for (var i = 0; i < str.length; i++) {
        if (val == "") val = str.charCodeAt(i).toString(16);
        else val += str.charCodeAt(i).toString(16);
    }
    val += "0a";
    return val;
};
