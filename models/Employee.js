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
        bank_name: "String",
        account_number: {
            type: String,
            required: true,
        },
        ifsc: {
            type: String,
            required: true,
        },
        adhaar_card_number: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: value => _get(value, "length") === 12 && /^[0-9]*$/.test(value),
                message: "Invalid Adhaar number."
            },
        },
        pan_card_number: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: value => _get(value, "length") === 10 && /^([A-Z]){5}([0-9]){4}([A-Z]){1}?$/.test(value),
                message: "Invalid PAN number."
            }
        },
    },
    professional_details: {
        experience: {
            years: Number,
            months: Number,
        },
        skills: [{
            type: String,
        }],
        resume: {
            type: String,
            required: true,
        },
    },
    educational_details: [{
        course: {
            type: String,
            required: true,
        },
        university: {
            type: String,
            required: true,
        },
        passed_on: Date,
        grade: String,
    }],
    past_works: [{
        company: {
            type: String,
            required: true,
        },
        designation: String,
        department: String,
        ctc: Number,
        from: {
            type: Date,
            required: true,
        },
        to: {
            type: Date,
            required: true,
        },
    }],
    current_work: {
        company: {
            type: String,
            required: true,
        },
        designation: String,
        department: String,
        ctc: Number,
        from: {
            type: Date,
            required: true,
        },
    },
}, {
    timestamps: true,
})

schema.index({
    "createdAt": -1
})

const Employee = mongoose.model("employees", schema)

Employee.on("index", err => {
    if(err) console.log(err)
    else console.log("On Employee model, index {createdAt: -1} has been created successfully")
})

module.exports = Employee