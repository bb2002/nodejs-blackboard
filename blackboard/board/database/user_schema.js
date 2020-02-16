let user_schema = {
    uuid: {type: String, unique: true, required: true},
    provider: {type: String, required: true, default: "kakao"},
    nickname: {type: String, required: true},
    profile_img: {type: String, default: ""},
    email: {type: String, unique: true, default: ""},
    created_at: {type: Date, default: Date.now}
}

module.exports = user_schema