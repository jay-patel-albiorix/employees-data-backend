const { GraphQLScalarType } = require('graphql')
const { ApolloError } = require("apollo-server-express")
const { GraphQLUpload } = require("graphql-upload")

const _includes = require("lodash/includes")

const resolvers = {
    Query: {
        employeeList: async (parent, args, context, info) => {
            try {

                console.log(
                    "\n\nemployeeList resolver",
                    "\nparent", parent,
                    "\nargs", args,
                    // "\ncontext", context,
                    // "\ninfo", info,
                    // "\nfieldNodes", info.fieldNodes,
                    // "\nfieldNodes[0].name", info.fieldNodes[0]?.name,
                    // "\nfieldNodes[0].selectionSet", info.fieldNodes[0]?.selectionSet,
                    // "\nfieldNodes[0].selectionSet.selections[0]", info.fieldNodes[0]?.selectionSet?.selections[0],
                )
                const list = await context.dataSources.employees.getEmployeeList(
                    args.keys,
                    args.search,
                    args.skip,
                    args.limit,
                )
                console.log("\nlist", list)
                return list
            } catch(err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        employee: async (parent, args, context, info) => {
            try {
                console.log(
                    "\n\nemployee resolver",
                    "\nparent", parent,
                    "\nargs", args,
                ) 
                const employee = await context.dataSources.employees.getEmployee(args._id)
                console.log("employee", employee)
                return employee 
            } catch(err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    },
    Mutation: {
        post: async (parent, args, context, info) => {
            try {
                console.log(
                    "\n\npost employee resolver",
                    // "\nparent", parent,
                    "\nargs", args,
                ) 
                const employee = await context.dataSources.employees.postEmployee(args.data)
                console.log("employee", employee)
                return employee 
            } catch(err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        patch: async (parent, args, context, info) => {
            try {
                console.log(
                    "\n\npatch employee resolver",
                    // "\nparent", parent,
                    "\nargs", args,
                ) 
                const employee = await context.dataSources.employees.patchEmployee(args._id, args.data)
                console.log("employee", employee)
                return employee 
            } catch(err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        delete: async (parent, args, context, info) => {
            try {
                console.log(
                    "\n\ndelete employee resolver",
                    // "\nparent", parent,
                    "\nargs", args,
                ) 
                const employee = await context.dataSources.employees.deleteEmployee(args._id)
                console.log("employee", employee)
                return employee 
            } catch(err) {
                console.log(err)
                throw new ApolloError(err)
            }
        },
        upload: async (parent, args, context, info) => {
            try {
                console.log(
                    "\n\nupload resolver",
                    "\nargs", args,
                )
                const { createReadStream, filename, mimetype } = await args.file
                
                if(!_includes(["image/jpg", "image/jpeg", "image/png"], mimetype)) throw "Only jpg, jpeg & png are accepted"

                const file = await context.dataSources.upload.upload(createReadStream())
                console.log("file", file)
                return file
            } catch(err) {
                console.log(err)
                throw new ApolloError(err)
            }
        }
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date scalar type',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return new Date(value)
        },
    }),
    Upload: GraphQLUpload,
}

module.exports = resolvers