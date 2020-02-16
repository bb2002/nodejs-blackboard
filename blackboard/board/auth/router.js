const express = require("express")
const passport = require("passport")
const moment = require("moment")
const database = require("../database")
const server_config = require("../config")
const router = express.Router()

const kakao_login = require("./kakao/kakao")

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

router.use("/kakao", kakao_login)

router.get("/", (req, res) => {
    if(req.isAuthenticated()) {
        res.redirect("/")
    } else {
        res.render("auth/login.ejs", {
            title: server_config.TITLE,
            logo_name: server_config.LOGO,
            is_login: false
        })
    }
})

router.get("/my", (req, res) => {
    if(req.isAuthenticated()) {
        database.post_model.find({writer: req.user.name}, (err, results) => {
            if(err) {
                res.render("my.ejs", {
                    title: server_config.TITLE,
                    logo_name: server_config.LOGO,
                    is_login: req.isAuthenticated(),
                    err: err
                })
            } else {
                res.render("my.ejs", {
                    title: server_config.TITLE,
                    logo_name: server_config.LOGO,
                    is_login: req.isAuthenticated(),
                    err: null,
                    articles: results,
                    moment: moment
                })
            }
        }).sort("created_at")  
    } else {
        res.redirect("/auth")
    }
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})

module.exports = router