const service = require("../services/matches.service");
const joi = require("joi");

const matchSchema = joi.object({
    id_game: joi.number().required(),
    player_1_selection: joi.string(),
    player_2_selection: joi.string()
})

const createMatch = async(req, res) => {
    try {
        const {err, value} = matchSchema.validate(req.body);
        if (err) {
            return res.status(400).json({message: err.message});
        }
        const match = await service.createMatch(value, req.user.id)
        return res.status(201).json({message: "Match created", id: match.id_match});
    } catch(error) {
        return res.status(400).json({message: error.message});
    }
}

const updateMatch = async(req, res) => {
    try {
        const {err, value} = matchSchema.validate(req.body)
        if (err) {
            return res.status(400).json({message: err.message})
        }
        const match = await service.updateMatch(req, req.user.id)
        return res.status(200).json({message: "Match updated"})
    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}

const getMatchByGameID = async (req, res) => {
    try {
        const result = await service.getMatchByGameID(req.params.id)
        return res.status(200).json(result)
    } catch(error) {
        return res.status(404).json({message: error.message})
    }
}

const getMatchByID = async (req, res) => {
    try {
        const result = await service.getMatchByID(req.params.id)
        return res.status(200).json(result)
    } catch(error) {
        return res.status(404).json({message: error.message})
    }
}

module.exports = {createMatch, updateMatch, getMatchByGameID, getMatchByID}