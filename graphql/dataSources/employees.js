const _toInteger = require("lodash/toInteger")

const Employee = require("../../models/Employee")

module.exports.getEmployeeList = async (
    // filter = {}, 
    // keys = '{"_id": 1}',
    skip = 0,
    limit = 10,
) => {
    try {
     
        const [ { data, meta: [ meta ] } ] = await Employee.aggregate([
            // {
            //     $match: JSON.parse(filter)   // manual filters from frontend
            // },
            {
                $sort: {
                    "createdAt": -1
                }
            },
            // {
            //     $project: JSON.parse(keys)   // required keys only
            // },
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
