/**
 * 字符编码工具
 * Created by zp on 2015/8/18.
 */

var crypto = require('crypto');

function codec(encrypt,str) {
    return crypto.createHash(encrypt).update(str).digest('hex');
}

module.exports = codec;

