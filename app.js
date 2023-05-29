require("dotenv").config()
const express = require("express")

const mongoose = require('mongoose')

const path = require("path")
const fs = require("fs")

const bodyParser = require("body-parser")

const mainRoutes = require("./routers/main")
const buyRoutes = require("./routers/buy")
const premiumRoutes = require("./routers/premium")
const fogotpassRoutes = require("./routers/forgotpass")



//const helmet = require("helmet")
const compression = require("compression")
const morgan = require("morgan")

const cors = require("cors")

const app = express()

app.use(express.static(path.join(__dirname, "public")))

const accessLogStream = fs.createWriteStream(
	path.join(__dirname, "access.log"),
	{ flags: "a" }
)

//app.use(helmet())
app.use(compression())
app.use(morgan("combined", { stream: accessLogStream }))

app.use(cors({
	"origin": "*",
  "methods": "GET,POST,DELETE",
}))
app.use(bodyParser.json({ extended: false }))

app.use(mainRoutes)
app.use('/buy', buyRoutes)
app.use(premiumRoutes)
app.use(fogotpassRoutes)

app.use((req, res, next) => {
	res.redirect("/login.html")
})



mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster1.bcjhxwl.mongodb.net/expensedb?retryWrites=true&w=majority`
	)
	.then((result) => {
		app.listen(3006)
	})
	.catch((err) => {
		console.log(err)
	})
