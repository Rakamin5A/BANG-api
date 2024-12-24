const repo = require("../repositories/matches.repository")
const gameRepo = require("../repositories/games.repository")
const userRepo = require("../repositories/users.repository")

const createMatch = async (match, id) => {
    try {
        const user = await userRepo.getUser(id)
        if (!user) {
            throw new Error("User not found")
        }
        const game = await gameRepo.getGameByID(match.id_game)
        if (!game) {
            throw new Error("Game not found")
        }
        return await repo.createMatch(match)
    } catch(error) {
        throw new Error(error.message)
    }
}

const updateMatch = async (req, id) => {
    try {
        const user = await userRepo.getUser(id)
        if (!user) {
            throw new Error("User not found")
        }
        const game = await gameRepo.getGameByID(req.params.id)
        if (!game) {
            throw new Error("Game not found")
        }
        req.body.id_match = req.params.id
        return await repo.updateMatch(req.body)
    } catch(error) {
        throw new Error(error.message)
    }
}

const getMatchByGameID = async (id) => {
    try {
        const res = await repo.getMatchByGameID(id)
        if (!res) {
            throw new Error("Match not found")
        }
        return res
    } catch(error) {
        throw new Error(error.message)
    }
}

const getMatchByID = async (id) => {
    try {
        const res = await repo.getMatchByID(id)
        if (!res) {
            throw new Error("Match not found")
        }
        return res
    } catch(error) {
        throw new Error(error.message)
    }
}

module.exports = {createMatch, updateMatch, getMatchByGameID, getMatchByID}