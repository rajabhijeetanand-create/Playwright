export default {

    validUser: {
        username: process.env.APP_USERNAME || "tomsmith",
        password: process.env.APP_PASSWORD || "SuperSecretPassword!"
    },

    invalidUser: {
        username: "invalidUser",
        password: "invalidPassword"
    },

    blankUser: {
        username: "",
        password: process.env.APP_PASSWORD || "SuperSecretPassword!"
    },

    blankPassword: {
        username: process.env.APP_USERNAME || "tomsmith",
        password: ""
    }

};