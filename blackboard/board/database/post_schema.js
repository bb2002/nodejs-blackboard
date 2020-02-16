let post_schema = {
    title: {type: String, default: ""},
    contents: {type: String, default: ""},
    writer: {type: String, required: true, default: "undefined"},
    tags: {type: [], default: ""},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    comments: [{
        writer: {type: String, required: true},
        contents: {type: String, default: ""},
        created_at: {type: Date, default: Date.now}
    }]
}

module.exports = post_schema
