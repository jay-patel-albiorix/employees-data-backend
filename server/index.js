// remove dotenv in deployed
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cors = require("cors")
const appRoutes = require("../routes/appRoutes")

require("../db/index.js")

const app = express()

app.use(cors())
app.use(express.json())

app.use(appRoutes)


const port = process.env.PORT || 8080

app.listen(port, () => console.log(`server is listening on ${port}`))