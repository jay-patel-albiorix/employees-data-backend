const { gql } = require("apollo-server")

const typeDefs = gql`
    type Query {
        employeeList(
            keys: String!
            search: String
            skip: Int
            limit: Int
        ): EmployeeListResponse
        employee(
            _id: ID!
        ): Employee
    }

    type Mutation {
        post(
            data: EmployeeInput!
        ): Employee
        put(
            _id: ID!, 
            data: EmployeeInput!
        ): Employee
        delete(
            _id: ID!
        ): Employee
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
        createdAt: Date!
        updatedAt: Date
        schema_version: Int!
    }

    input EmployeeInput {
        _id: ID
        personal_details: PersonalDetailsInput
        bank_details: BankDetailsInput
        professional_details: ProfessionalDetailsInput
        educational_details: [EducationInput!]
        past_works: [PastWorkInput!]
        current_work: CurrentWorkInput
        createdAt: Date
        updatedAt: Date
        schema_version: Int
    }

    type PersonalDetails {
        first_name: String
        last_name: String
        date_of_birth: Date
        phone: String
        email: String
        profile_pic: String
    }

    input PersonalDetailsInput {
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

    input BankDetailsInput {
        account_number: String
        ifsc: String
        pan_card_number: String
        adhaar_card_number: String
    }

    type ProfessionalDetails {
        experience: TotalExperience
        skills: [String]
        resume: String
    }

    input ProfessionalDetailsInput {
        experience: TotalExperienceInput
        skills: [String]
        resume: String
    }

    type TotalExperience {
        years: Int
        months: Int
    }

    input TotalExperienceInput {
        years: String
        months: String
    }

    type Education {
        _id: ID
        course: String
        university: String
        passed_on: Date
        grade: String
    }

    input EducationInput {
        _id: ID
        course: String
        university: String
        passed_on: Date
        grade: String
    }

    type PastWork {
        _id: ID
        company: String
        designation: String
        department: String
        ctc: Float
        from: Date
        to: Date
    }

    input PastWorkInput {
        _id: ID
        company: String
        designation: String
        department: String
        ctc: String
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

    input CurrentWorkInput {
        company: String
        designation: String
        department: String
        ctc: String
        from: Date
    }

    scalar Date
`

module.exports = typeDefs