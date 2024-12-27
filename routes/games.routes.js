const e = require("express")
const router = e.Router()

const cont = require("../controllers/games.controller")
const token = require("../middlewares/users.middleware")

router.post("/games", token.authToken, cont.createGame)
router.patch("/games/update/:id", token.authToken, cont.updateGame)
router.patch("/games/connect", token.authToken, cont.connectUser)
router.get("/games/:id", token.authToken, cont.getGameByID)
router.get("/games", token.authToken, cont.getGameByUserID)
router.get("/games/code/:code", token.authToken, cont.getGameByGameCode)

module.exports = router