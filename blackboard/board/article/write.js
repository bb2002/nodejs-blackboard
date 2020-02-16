const express = require("express")
const router = express.Router()
const db = require("../database")
const server_config = require("../config")

router.get("/write", (req, res) => {
    if(req.isAuthenticated()) {
        res.render("write.ejs", {
            title: server_config.TITLE,
            logo_name: server_config.LOGO,
            is_login: true
        })
    } else {
        res.redirect("/auth")
    }
})

router.post("/write", (req, res) => {
    let new_post = db.post_model({
        title: req.body.title,
        contents: req.body.content,
        writer: req.user.name,
        tags: req.body.tag.split(" ")
    })

    new_post.save(() => {
        res.redirect("/read/" + new_post._id)
    })
})

module.exports = router