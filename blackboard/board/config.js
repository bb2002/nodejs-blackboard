let config = {
    // Server default setting
    SERVER_PORT: 3000,
    SEC_KEY: "20afc3da-056d-4cb1-95f7-0788a34b3bbf",

    // Database setting
    DB_URL: "mongodb://localhost:27017/blackboard",
    DB_SCHEMAS: {
        POST: "./post_schema",
        USER: "./user_schema"
    },

    // Webpage settings
    TITLE: "Blackboard project",
    LOGO: "Board",
    BOARD_NAME: "자유 게시판",

    // Kakao Login Settings
    KAKAO_LOGIN_RESTAPI_KEY: "WRITE_YOUR_KAKAO_API_KEY",
    KAKAO_LOGIN_CALLBACK: "WRITER_YOUR_CALLBACK_URL"
}

module.exports = config