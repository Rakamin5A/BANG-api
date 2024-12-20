const pool = require("../db/db");

const createMatch = async (match) => {
    const {score, type, id_winner, id_loser, created_at} = match;
    try {
        const res = await pool.query('INSERT INTO match_history (score, type, id_winner, id_loser, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
            score, type, id_winner, id_loser, created_at
        ]);
        return res.rows[0];
    } catch {
        throw new Error("DB Error Occurred")
    }
}

const getMatchByUserId = async (userId) => {
    try {
        const res = await pool.query('SELECT * FROM match_history WHERE id_winner = $1 OR id_loser = $1', [userId]);
        return res.rows;
    } catch(error) {
        throw new Error("DB Error Occurred")
    }
}

const getMatch = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM match_history WHERE id_match = $1', [id]);
        return res.rows[0];
    } catch {
        throw new Error("DB Error Occurred")
    }
}

module.exports = {createMatch, getMatchByUserId, getMatch}