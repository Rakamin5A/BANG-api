const pool = require("../db/db");

const createMatch = async (match) => {
    const {id_game, player_1_selection, player_2_selection} = match;
    try {
        const res = await pool.query('INSERT INTO matches (id_game, player_1_selection, player_2_selection) VALUES ($1, $2, $3) RETURNING *', [id_game, player_1_selection, player_2_selection]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: createMatch " + error.message);
    }
}

const updateMatch = async (match) => {
    const {id_match, player_1_selection, player_2_selection} = match;
    if (!player_1_selection) {
        try {
            const res = await pool.query('UPDATE matches SET player_2_selection = $1 WHERE id_match = $2', [player_2_selection, id_match]);
            return res.rows[0];
        } catch(error) {
            throw new Error("DB Error Occurred: updateMatch " + error.message);
        }
    } else if (!player_2_selection) {
        try {
            const res = await pool.query('UPDATE matches SET player_1_selection = $1 WHERE id_match = $2', [player_1_selection, id_match]);
            return res.rows[0];
        } catch(error) {
            throw new Error("DB Error Occurred: updateMatch " + error.message);
        }
    } else {
        try {
            const res = await pool.query('UPDATE matches SET player_1_selection = $1, player_2_selection = $2 WHERE id_match = $3', [player_1_selection, player_2_selection, id_match]);
            return res.rows[0];
        } catch(error) {
            throw new Error("DB Error Occurred: updateMatch " + error.message);
        }
    }
}

const getMatchByGameID = async (id_game) => {
    try {
        const res = await pool.query('SELECT * FROM matches WHERE id_game = $1', [id_game]);
        return res.rows;
    } catch(error) {
        throw new Error("DB Error Occurred: getMatchByGameID " + error.message);
    }
}

const getMatchByID = async (id_match) => {
    try {
        const res = await pool.query('SELECT * FROM matches WHERE id_match = $1', [id_match]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: getMatchByID " + error.message);
    }
}

module.exports = {createMatch, getMatchByGameID, getMatchByID, updateMatch}