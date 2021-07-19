const mongoose = require("mongoose")
const _get = require("lodash/get")
const _toString = require("lodash/toString")
const _has = require("lodash/has")
const _toInteger = require("lodash/toInteger")

const schema = new mongoose.Schema({
    personal_details: {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: (() => !_has(this, "email")).bind(this),
        },
        email: {
            type: String,
            required: (() => !_has(this, "phone")).bind(this),
        },
        date_of_birth: {
            type: Date,
            required: true,
        },
        present_address: String,
        permenent_address: String,
        profile_pic: String,
    },
    bank_details: {
        // bank_name: "String",
        // account_number: {
        //     type: Number,
        //     required: true,
        // },
        // ifsc: {
        //     type: String,
        //     required: true,
        // },
        adhaar_card_number: {
            type: String,
            required: true,
            validate: {
                validator: value => _get(value, "length") === 12 && /^[0-9]*$/.test(value),
                message: "Invalid Adhaar number."
            },
        },
        pan_card_number: {
            type: String,
            required: true,
            validate: {
                validator: value => _get(value, "length") === 10 && /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/.test(value),
                message: "Invalid PAN number."
            }
        },
    },
}, {
    timestamps: true,
})

const Employee = mongoose.model("employees", schema)

module.exports = Employee