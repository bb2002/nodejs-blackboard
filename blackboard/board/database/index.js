const mongoose = require("mongoose")
const server_config = require("../config")

let db = {}

function init() {
    mongoose.connect(server_config.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

    let connection = mongoose.connection
    connection.on("open", () => {
        console.log("[OK] Database connected.")

        // Init post_schema
        let post_schema = require(server_config.DB_SCHEMAS.POST)
        if(post_schema != undefined) {
            db.post_schema = mongoose.Schema(post_schema)
            db.post_schema.static("findPost", function(id, callback) {
                return this.find({_id: id}, callback)
            })
            
            db.post_model = mongoose.model("posts", db.post_schema)
            console.log("[OK] POST Schema.")
        } else {
            console.log("[ERR] POST Schema not initialized.")
        }

        // Init user_schema
        let user_schema = require(server_config.DB_SCHEMAS.USER)
        if(user_schema != undefined) {
            db.user_schema = mongoose.Schema(user_schema)
            db.user_schema.static("findId", function(id, callback) {
                return this.find({uuid: id}, callback)
            })

            db.user_model = mongoose.model("users", db.user_schema)

            console.log("[OK] USER Schema.")
        } else {
            console.log("[ERR] USER Schema not initialized.")
        }
    })

    connection.on("error", (err) => {
        console.log("[ERR] Database connection error.")
        console.dir(err)
    })
}

db.init = init
module.exports = db