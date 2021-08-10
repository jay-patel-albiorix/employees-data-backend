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
        throw new Error("getting list failed")
    }

}


module.exports.getEmployee = async (_id) => {
    try {
        return await Employee.findById(_id)
        
    } catch(err) {
        console.log(err)
        throw new Error("getting doc failed")
    }

}


module.exports.postEmployee = async (data) => {
    try {
        const newEmployee = new Employee(data)

        const savedEmployee = await newEmployee.save()  

        return savedEmployee      
    } catch(err) {
        console.log(err)
        throw new Error("Posting doc failed")
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
        throw new Error("Posting doc failed")
    }

}


module.exports.deleteEmployee = async(_id) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(_id)
        
        if(!deletedEmployee) throw new Error("No document found")

        return deletedEmployee
    } catch(err) {
        console.log(err)
        throw new Error("Deleting doc failed")
    }
}