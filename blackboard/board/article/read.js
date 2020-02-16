const express = require("express")
const router = express.Router()
const db = require("../database")
const server_config = require("../config")

router.get("/read/:id", (req, res) => {
    let id = req.params.id

    db.post_model.findPost(id, (err, results) => {
        if(err || results == undefined) {
            res.render("read.ejs", {
                title: server_config.TITLE,
                logo_name: server_config.LOGO,
                is_login: req.isAuthenticated(),
                is_valid: false
            })
        } else {
            let date = new Date(results[0]._doc.created_at)

            res.render("read.ejs", {
                title: server_config.TITLE,
                logo_name: server_config.LOGO,
                is_login: req.isAuthenticated(),

                article_title: results[0]._doc.title,
                article_content: results[0]._doc.contents,
                article_writer: results[0]._doc.writer,
                article_tags: results[0]._doc.tags,
                article_date: date,
                is_valid: true
            })
        }
    })
})

module.exports = router