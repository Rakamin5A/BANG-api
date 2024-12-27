const pool = require("../db/db");

const createUser = async (user) => {
    const {nama, username, avatar, password, email} = user
    try {
        const res = await pool.query('INSERT INTO users (nama, username, avatar, password, email) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
            nama, username, avatar, password, email
        ]);
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