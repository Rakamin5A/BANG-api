const repo = require("../repositories/users.repository")
const bcrypt = require("bcryptjs")
const { genToken } = require("../utils/users.util")

const createUser = async (user) => {
    let res = await repo.getUserByUsername(user.username)
    if (res.length > 0) {
        throw new Error("User already exists")
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword
    return await repo.createUser(user)
}

const login = async (user) => {
    let res = await repo.getUserByUsername(user.username)
    if (res.length === 0) {
        throw new Error('Username or password is incorrect')
    }

    const isValid = await bcrypt.compare(user.password, res[0].password)
    if (!isValid) {
        throw new Error('Username or password is incorrect')
    }

    token = genToken({username: res[0].username, id: res[0].id_user})
    return {token: token, id: res[0].id_user}
}

const getUser = async (id) => {
    const user = await repo.getUser(id)
    const stats = await repo.getStats(id)
    user.stats = stats
    if(!user) {
        throw new Error("User not found")
    } else {
        return user
    }
}

module.exports = {createUser, getUser, login}