const { GraphQLScalarType } = require('graphql')
const { ApolloError } = require("apollo-server")

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
        put: async (parent, args, context, info) => {
            try {
                console.log(
                    "\n\nput employee resolver",
                    // "\nparent", parent,
                    "\nargs", args,
                ) 
                const employee = await context.dataSources.employees.putEmployee(args._id, args.data)
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
}

module.exports = resolvers