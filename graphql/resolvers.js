const { GraphQLScalarType } = require('graphql')

const resolvers = {
    Query: {
        employeeList: async (parent, args, context, info) => {
            console.log(
                // "\n\nemployeeList resolver",
                // "\nparent", parent,
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
                args.filter,
                args.skip,
                args.limit,
            )
            console.log("\nlist", list)
            return list
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