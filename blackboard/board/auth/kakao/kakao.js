const express = require("express")
const passport = require("passport")
const server_config = require("../../config")
const database = require("../../database")
const router = express.Router()

let KakaoStrategy = require("passport-kakao").Strategy
let kakao_key = {
    clientID: server_config.KAKAO_LOGIN_RESTAPI_KEY,
    callbackURL: server_config.KAKAO_LOGIN_CALLBACK
}

passport.use("kakao_login", new KakaoStrategy(
    kakao_key, (accessToken, refreshToken, profile, done) => {
        let user = {
            id: profile.id,
            name: profile.username,
            email: profile._json.kakao_account.email,
            profile_img: profile._json.properties.profile_image
        }

        database.user_model.findId(user.id, (err, results) => {
            if(err) {
                return done(err, false)
            } else {
                if(results.length == 1) {
                    // add profile
                    let doc = results[0]
                    doc.updateOne({
                        nickname: user.name,
                        profile_img: user.profile_img,
                        email: user.email
                    }, () => {
                        return done(null, user)
                    })
                } else {
                    let user_model = new database.user_model({
                        uuid: user.id,
                        provider: "kakao",
                        nickname: user.name,
                        profile_img: user.profile_img,
                        email: user.email
                    })
                    user_model.save(() => {
                        return done(null, user)
                    })
                }                
            }
        })
    }
))

router.get("/", passport.authenticate("kakao_login"))
router.get("/callback", passport.authenticate("kakao_login", {
    successRedirect: "/",
    failureRedirect: "/auth"
}))

module.exports = router