const { gql } = require("apollo-server")

const typeDefs = gql`
    type Query {
        employeeList(
            # filter: ,
            # keys: ,
            skip: Int,
            limit: Int,
        ): EmployeeListResponse,
        employee: Employee,
    }

    type EmployeeListResponse {
        data: [Employee!],
        meta: EmployeeListMeta,
    }

    type EmployeeListMeta  {
        count: Int
    }

    type Employee {
        personal_details: PersonalDetails,
    }

    type PersonalDetails {
        first_name: String,
        last_name: String,
    }

`

module.exports = typeDefs