const jwt = require("jsonwebtoken");

const verifyRole = (token, role) => {
    try {
        const decoded = jwt.decode(token, process.env.TOKEN_SECRET);
        return {
            error: false,
            data: decoded
        }
    }
    catch (err) {
        return {
            error: true,
            message: JSON.stringify(err.message)
        }
    }
}

module.exports = verifyRole;