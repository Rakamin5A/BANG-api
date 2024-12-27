const pool = require("../db/db");

const createUser = async (user) => {
    const {nama, username, avatar, password, email} = user
    try {
        const res = await pool.query('INSERT INTO users (nama, username, avatar, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
            nama, username, avatar, password, email
        ]);
        await pool.query('INSERT INTO users_stats (id_user, longest_win_streak, winnings, loses, longest_lose_streak, is_win_streak, is_lose_streak) VALUES ($1, 0, 0, 0, 0, 0, 0)', [
            res.rows[0].id_user
        ])
        return res.rows[0];
    } catch {
        throw new Error("DB Error Occurred")
    }
}

const getUserByUsername = async (username) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return res.rows;
    } catch(error) {
        throw new Error("DB Error Occurred: getUserByUsername " + error.message)
    }
}

const getUser = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM users WHERE id_user = $1', [id]);
        return res.rows[0];
    } catch {
        throw new Error("DB Error Occurred")
    }
}

module.exports = {createUser, getUser, getUserByUsername}