const express = require('express');
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const userRouter = require("./routes/users.routes")
app.use(userRouter)
const matchesRouter = require("./routes/matches.routes")
app.use(matchesRouter)
const gamesRouter = require("./routes/games.routes")
app.use(gamesRouter)
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})