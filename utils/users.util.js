const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

function genToken(email) {
    return jwt.sign(email, process.env.TOKEN, {expiresIn: '2000s'})
}

module.exports = {genToken}