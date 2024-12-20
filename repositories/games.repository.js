const pool = require("../db/db");

const createGame = async (game) => {
    const {created_at, player_1, player_2, id_winner, type, score} = game;
    try {
        const res = await pool.query('INSERT INTO game (created_at, player_1, player_2, id_winner, type, score) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [
            created_at, player_1, player_2, id_winner, type, score
        ]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: createGame " + error.message);
    }
}

const getGameByUserID = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM game WHERE player_1 = $1 OR player_2 = $2', [id, id]);
        return res.rows;
    } catch(error) {
        throw new Error("DB Error Occurred: getGameByUserID " + error.message)
    }
}

const getGameByID = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM game WHERE id_game = $1', [id]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: getGameByID " + error.message)
    }
}

module.exports = {createGame, getGameByUserID, getGameByID}