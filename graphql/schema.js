const { gql } = require("apollo-server")

const typeDefs = gql`
    type Query {
        employeeList(
            keys: String!
            filter: String
            skip: Int
            limit: Int
        ): EmployeeListResponse
        employee: Employee
    }

    type EmployeeListResponse {
        data: [Employee!]
        meta: EmployeeListMeta
    }

    type EmployeeListMeta  {
        count: Int
    }

    type Employee {
        _id: ID!
        personal_details: PersonalDetails
        bank_details: BankDetails
        professional_details: ProfessionalDetails
        educational_details: [Education!]
        past_works: [PastWork!]
        current_work: CurrentWork
    }

    type PersonalDetails {
        first_name: String
        last_name: String
        date_of_birth: Date
        phone: String
        email: String
        profile_pic: String
    }

    type BankDetails {
        account_number: String
        ifsc: String
        pan_card_number: String
        adhaar_card_number: String
    }

    type ProfessionalDetails {
        experience: Experience
        skills: [String]
        resume: String
    }

    type Experience {
        years: Int
        months: Int
    }

    type Education {
        course: String
        university: String
        passed_on: Date
        grade: String
    }

    type PastWork {
        company: String
        designation: String
        department: String
        ctc: Float
        from: Date
        to: Date
    }

    type CurrentWork {
        company: String
        designation: String
        department: String
        ctc: Float
        from: Date
    }

    scalar Date
`

module.exports = typeDefs