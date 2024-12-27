const pool = require("../db/db");

const createGame = async (game) => {
    const {created_at, player_1, player_2, id_winner, type, score, game_code} = game;
    try {
        const res = await pool.query('INSERT INTO games (created_at, player_1, player_2, id_winner, type, score, game_code) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', [
            created_at, player_1, player_2, id_winner, type, score, game_code
        ]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: createGame " + error.message);
    }
}

const updateGame = async (game, id) => {
    const {id_winner, score} = game;
    try {
        if (!id_winner) {
            const res = await pool.query('UPDATE games SET score = $1 WHERE id_game = $2', [score, id]);
            await pool.query('UPDATE users_stats SET loses = loses + 1 WHERE id_user = $1', [game.player_1]) 
            // const is_lose_streak = await pool.query('SELECT is_lose_streak FROM users_stats WHERE id_user = $1')
            // if (is_lose_streak.rows[0].is_lose_streak === 1) {
            //     await pool.query('UPDATE users_stats SET longest_lose_streak = longest_lose_streak + 1 WHERE id_user = $1')
            // }
            // await pool.query('UPDATE users_stats SET is_lose_streak = 1 WHERE id_user = $1')
            // await pool.query('UPDATE users_stats SET is_win_streak = 0 WHERE id_user = $1')
            return res.rows;
        }
        const res = await pool.query('UPDATE games SET id_winner = $1, score = $2 WHERE id_game = $3', [id_winner, score, id]);
        await pool.query('UPDATE users_stats SET winnings = winnings + 1 WHERE id_user = $1', [id_winner]) 
        // const is_win_streak = await pool.query('SELECT is_win_streak FROM users_stats WHERE id_user = $1', [id_winner])
        // if (is_win_streak.rows[0].is_win_streak === 1) {
        //     await pool.query('UPDATE users_stats SET longest_win_streak = longest_win_streak + 1 WHERE id_user = $1', [id_winner])
        // }
        // await pool.query('UPDATE users_stats SET is_win_streak = 1 WHERE id_user = $1', [id_winner])
        // await pool.query('UPDATE users_stats SET is_lose_streak = 0 WHERE id_user = $1', [id_winner])
        return res.rows;
    } catch(error) {
        throw new Error("DB Error Occurred: updateGame " + error.message);
    }
}

const connectUser = async (user_id, id) => {
    try {
        const res = await pool.query('UPDATE games SET player_2= $1 WHERE id_game = $2', [user_id, id]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: connectUser " + error.message);
    }
}

const getGameByUserID = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM games WHERE player_1 = $1 OR player_2 = $2', [id, id]);
        return res.rows;
    } catch(error) {
        throw new Error("DB Error Occurred: getGameByUserID " + error.message)
    }
}

const getGameByGameCode = async (code) => {
    try {
        const res = await pool.query('SELECT * FROM games WHERE game_code = $1', [code]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: getGameByGameCode " + error.message)
    }
}

const getGameByID = async (id) => {
    try {
        const res = await pool.query('SELECT * FROM games WHERE id_game = $1', [id]);
        return res.rows[0];
    } catch(error) {
        throw new Error("DB Error Occurred: getGameByID " + error.message)
    }
}

module.exports = {createGame, getGameByUserID, getGameByID, updateGame, getGameByGameCode, connectUser}