const _get = require("lodash/get")

const Employee = require("../models/Employee")

module.exports.getEmployeeList = async (req, res) => {
    try {
        res.json("list")
    } catch(err) {
        console.log(err)
        res.status(500).json({
            name: err.name,
            message: err.message
        })
    }
}


module.exports.postEmployee = async (req, res) => {
    try {
        console.log("body", _get(req, "body"))

        const newEmployee = new Employee(_get(req, "body"))

        const savedEmployee = await newEmployee.save()

        res.status(201).json(savedEmployee)
    } catch(err) {
        console.log(err)
        res.status(500).json({
            name: err.name,
            message: err.message
        })
    }
}