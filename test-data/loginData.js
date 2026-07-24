export default {

    validUser: {
        username: process.env.APP_USERNAME,
        password: process.env.APP_PASSWORD
    },

    invalidUser: {
        username: "invalidUser",
        password: "invalidPassword"
    },

    blankUser: {
        username: "",
        password: process.env.APP_PASSWORD
    },

    blankPassword: {
        username: process.env.APP_USERNAME,
        password: ""
    }

};