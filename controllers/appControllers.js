const _get = require("lodash/get")
const _toInteger = require("lodash/toInteger")

const Employee = require("../models/Employee")

const cloudinary = require("../utilities/cloudinary")
const bufferToString = require("../utilities/bufferToString")

module.exports.getEmployee = async (req, res) => {
    try {
        // console.log("params", _get(req, "params"))
        
        const employee = await Employee.findById(_get(req, "params.id"))
        res.status(200).json(employee)
    } catch(err) {
        console.log(err)
        res.status(400).json({
            name: err.name,
            message: err.message
        })
    }
}

module.exports.getEmployeeList = async (req, res) => {
    try {
        // console.log("params", _get(req, "params"))
        // console.log("query", _get(req, "query"))

        const [ { data, meta: [ meta ] } ] = await Employee.aggregate([
            {
                $match: JSON.parse(_get(req, "query.filter", "{}") ) // manual filters from frontend
            },
            {
                $sort: {
                    "createdAt": -1
                }
            },
            {
                $project: JSON.parse(_get(req, "query.keys", '{"_id": 1}'))
            },
            {
                $facet: {
                    data: [
                        {
                            $skip: _toInteger(_get(req, "query.skip", 0))
                        },
                        {
                            $limit: _toInteger(_get(req, "query.limit", 10))
                        },
                    ],
                    meta: [{
                        $count: "count"
                    }]
                }
            }
        ])

        res.json({
            data,
            meta,
        })
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
        // console.log("body", _get(req, "body"))

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


module.exports.putEmployee = async (req, res) => {
    try {
        // console.log("params", _get(req, "params"))
        // console.log("body", _get(req, "body"))
        // console.log("id", _get(req, "params.id"))

        const updatedEmployee = await Employee.findOneAndReplace(
            {_id: _get(req, "params.id")},
            _get(req, "body"),
            {
                new: true,
                upsert: false,
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
        // console.log("params", _get(req, "params"))
        // console.log("id", _get(req, "params.id"))
        
        const deletedEmployee = await Employee.findByIdAndDelete(
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

module.exports.upload = async (req, res) => {
    try {
        console.log("upload")
        // console.log("\nreq.body", req.body)
        console.log("\nreq.file", req.file)
        // console.log("\nreq.files", req.files)

        const stringed = bufferToString(_get(req, "file.originalname"), _get(req, "file.buffer"))
        // console.log("stringed", stringed)
        const { secure_url } = await cloudinary.uploader.upload(stringed)
        console.log("uploaded", secure_url)

        res.status(201).json({url: secure_url})
    } catch(err) {
        console.log(err)
        res.status(400).json({
            name: err.name,
            message: err.message
        })
    }
}