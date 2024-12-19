const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()

function genToken(username) {
    return jwt.sign(username, process.env.TOKEN, {expiresIn: '2000s'})
}

module.exports = {genToken}