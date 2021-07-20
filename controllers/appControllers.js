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
        res.status(400).json({
            name: err.name,
            message: err.message
        })
    }
}


module.exports.patchEmployee = async (req, res) => {
    try {
        console.log("params", _get(req, "params"))
        console.log("body", _get(req, "body"))

        console.log("id", _get(req, "params.id"))
        const updatedEmployee = await Employee.findByIdAndUpdate(
            _get(req, "params.id"),
            _get(req, "body"),
            {
                new: true,
                upsert: false,
                runValidators: true,
            }
        )

        if(!updatedEmployee) throw new Error("No document found")

        res.status(200).json(updatedEmployee)
    } catch(err) {
        console.log(err)
        res.status(400).json({
            name: err.name,
            message: err.message
        })
    }
}


module.exports.deleteEmployee = async (req, res) => {
    try {
        console.log("params", _get(req, "params"))

        console.log("id", _get(req, "params.id"))
        const deletedEmployee = await Employee.findOneAndDelete(
            _get(req, "params.id"),
        )
        
        if(!deletedEmployee) throw new Error("No document found")

        res.status(200).json(deletedEmployee)
    } catch(err) {
        console.log(err)
        res.status(400).json({
            name: err.name,
            message: err.message
        })
    }
}

