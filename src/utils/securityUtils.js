const crypto = require('crypto');

const createSHA256Hash = (data) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
}

const escapeRegexCharacters = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

module.exports = {
    createSHA256Hash,
    escapeRegexCharacters
};