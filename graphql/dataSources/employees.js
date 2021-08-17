const _toInteger = require("lodash/toInteger")
const _split = require("lodash/split")
const _map = require("lodash/map")
const _trim = require("lodash/trim")

const Employee = require("../../models/Employee")

module.exports.getEmployeeList = async (
    keys = '{"_id": 1}',
    search = "",
    skip = 0,
    limit = 10,
) => {
    try {

        const split = _split(_trim(search), / +/)
        const filter = search ? {
            $or: [
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$personal_details.first_name",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                ),
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$personal_details.last_name",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                ),
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$current_work.designation",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                ),
                ..._map(
                    split,
                    splitWord => (
                        {
                            $expr: {
                                $regexMatch: {
                                    input: "$current_work.department",
                                    regex: splitWord,
                                    options: "i"
                                }
                            }

                        }
                    )
                )
            ]
        } : {}

        console.log("\nlist filter", filter)

        const [ { data, meta: [ meta ] } ] = await Employee.aggregate([
            {
                $match: filter   // manual filters from frontend
            },
            {
                $sort: {
                    "createdAt": -1
                }
            },
            {
                $project: JSON.parse(keys)   // fetching db docs with required keys
            },
            {
                $facet: {
                    data: [
                        {
                            $skip: _toInteger(skip)
                        },
                        {
                            $limit: _toInteger(limit)
                        },
                    ],
                    meta: [{
                        $count: "count"
                    }]
                }
            }
        ])

       return {
            data,
            meta: meta || {count: 0},
        }
    } catch(err) {
        console.log(err)
        throw new Error("getting list failed")
    }

}


module.exports.getEmployee = async (_id) => {
    try {
        return await Employee.findById(_id)
        
    } catch(err) {
        console.log(err)
        throw new Error(err.message || "getting doc failed")
    }

}


module.exports.postEmployee = async (data) => {
    try {
        const newEmployee = new Employee(data)

        const savedEmployee = await newEmployee.save()  

        return savedEmployee      
    } catch(err) {
        console.log(err)
        throw new Error(err.message || "Posting doc failed")
    }

}


module.exports.putEmployee = async (_id, data) => {
    try {
        console.log("dataSource putEmployee", _id, data)
        const updatedEmployee = await Employee.findOneAndReplace(
            {_id},
            data,
            {
                new: true,
                upsert: false,
            }
        )

        if(!updatedEmployee) throw new Error("No document found")

        return updatedEmployee

    } catch(err) {
        console.log(err)
        throw new Error(err.message || "Puting doc failed")
    }

}


module.exports.deleteEmployee = async(_id) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(_id)
        
        if(!deletedEmployee) throw new Error("No document found")

        return deletedEmployee
    } catch(err) {
        console.log(err)
        throw new Error(err.message || "Deleting doc failed")
    }
}