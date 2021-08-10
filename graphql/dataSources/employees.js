const _toInteger = require("lodash/toInteger")

const Employee = require("../../models/Employee")

module.exports.getEmployeeList = async (
    keys = '{"_id": 1}',
    filter = '{}', 
    skip = 0,
    limit = 10,
) => {
    try {
        const [ { data, meta: [ meta ] } ] = await Employee.aggregate([
            {
                $match: JSON.parse(filter)   // manual filters from frontend
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
            meta,
        }
    } catch(err) {
        console.log(err)
    }

}


module.exports.getEmployee = async (_id) => {
    try {
        return await Employee.findById(_id)
        
    } catch(err) {
        console.log(err)
    }

}