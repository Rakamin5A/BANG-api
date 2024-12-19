const e = require("express")
const router = e.Router()

const cont = require("../controllers/users.controller")
const token = require("../middlewares/users.middleware")

router.post("/auth/users", cont.createUser)
router.post("/auth/login", cont.loginUser)
router.param("/auth/users/:id", token.authToken, cont.getUser)
router.get("/auth/profile", token.authToken, cont.getUser)

module.exports = router