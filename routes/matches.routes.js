const e = require("express")
const router = e.Router()

const cont = require("../controllers/matches.controller")
const token = require("../middlewares/users.middleware")

router.post("/matches", token.authToken, cont.createMatch)
router.patch("/matches/:id", token.authToken, cont.updateMatch)
router.get("/matches/:id", token.authToken, cont.getMatchByID)
router.get("/matches/game/:id", token.authToken, cont.getMatchByGameID)

module.exports = router