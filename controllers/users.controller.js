const joi = require("joi");
const service = require("../services/users.service");

const registerSchema = joi.object({
    username: joi.string().required(),
    nama: joi.string().required(),
    password: joi.string().required(),
    avatar: joi.string(),
    email: joi.string().email().required(),
})

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
})

const getUser = async (req, res) => {
    try {
        const user = await service.getUser(Number(req.user.id))
        return res.status(200).json({id: user.id_user, username: user.username, avatar: user.avatar, nama: user.nama})
    } catch(error) {
        return res.status(404).json({message: "Not found"})
    }
}

const loginUser = async (req, res) => {
    try {
        const {err, value} = loginSchema.validate(req.body)
        if (err) {
            return res.status(400).json({message: err.details[0].message})
        }
        const login = await service.login(value)
        return res.status(200).json(login)
    } catch {
        return res.status(400).json({message: "Wrong password or username"})
    }
}

const createUser = async (req, res) => {
    const { err, value } = registerSchema.validate(req.body)
    if (err) {
        return res.status(400).json({message: err.details[0].message})
    }
    try {
        const user = await service.createUser(value)
        return res.status(201).json({id: user.id_user})
    } catch (err) {
        return res.status(400).json({message: err.message})
    }
}

module.exports = {createUser, loginUser, getUser}