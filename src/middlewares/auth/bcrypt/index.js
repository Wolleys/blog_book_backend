const bcrypt = require("bcryptjs");

// Encrypt the supplied user password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
};

// Validate the supplied user password
const validatePassword = async (password, dbPassword) => {
    try {
        const validate = await bcrypt.compare(password, dbPassword);
        return validate;
    } catch (error) {
        throw error;
    }
};

module.exports = { hashPassword, validatePassword };
