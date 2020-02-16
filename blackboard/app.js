const express = require("express")
const passport = require("passport")
const exp_session = require("express-session")
const server_config = require("./board/config")
const board_router = require("./board/router")
const auth_router = require("./board/auth/router")
const database = require("./board/database")

const app = express()

app.use("/static", express.static(__dirname + "/static"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(exp_session({
    cookie: {secure: false},
    secret: server_config.SEC_KEY,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.set("views", __dirname + "/views")
app.set("view engine", "ejs")

// Database init.
database.init()

// Setup routers
app.use("/", board_router)
app.use("/auth", auth_router)

app.listen(3000, server_config.SERVER_PORT, () => {
    console.log("[OK] Server is running on %d port.", server_config.SERVER_PORT)
})