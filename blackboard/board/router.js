const express = require("express")
const moment = require("moment")
const router = express.Router()
const server_config = require("./config")
const database = require("./database")
const write_router = require("./article/write")
const read_router = require("./article/read")

router.use("/", write_router)
router.use("/", read_router)

router.get("/", (req, res) => {
    database.post_model.find((err, results) => {
        if(err) {
            res.render("index.ejs", {
                title: server_config.TITLE,
                logo_name: server_config.LOGO,
                is_login: req.isAuthenticated(),
                board_name: server_config.BOARD_NAME,
                err: err
            })
        } else {
            res.render("index.ejs", {
                title: server_config.TITLE,
                logo_name: server_config.LOGO,
                is_login: req.isAuthenticated(),
                board_name: server_config.BOARD_NAME,
                err: null,
                articles: results,
                moment: moment
            })
        }
    }).sort("created_at")    
})

module.exports = router