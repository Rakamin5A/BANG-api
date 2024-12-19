const express = require('express');
const app = express();
const port = 8080;
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const userRouter = require("./routes/users.router")
app.use(userRouter)
// const transactionRouter = require("./routes/transactions.router")
// app.use(transactionRouter)
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})