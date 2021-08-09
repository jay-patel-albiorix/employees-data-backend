const resolvers = {
    Query: {
        employeeList: async (parent, args, context, info) => {
            console.log(
                "\n\nemployeeList resolver", 
                "\nparent", parent, 
                "\nargs", args, 
                "\ncontext",context, 
                // "\ninfo", info
            )
            const list = await context.dataSources.employees.getEmployeeList(
                // args.filter, 
                // args.keys,
                args.skip,
                args.limit,
            )
            console.log("list", list)
            return list
        },
    },
}

module.exports = resolvers