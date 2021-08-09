// remove dotenv in deployed
const dotenv = require("dotenv")
dotenv.config()

const { ApolloServer } = require("apollo-server")

const typeDefs = require("../graphql/schema")
const resolvers = require("../graphql/resolvers")
const employeesDataSources = require("../graphql/dataSources/employees")

require("../db/index.js")


const port = process.env.PORT || 8080
const server = new ApolloServer({
    port,
    cors: {
        origin: "*",
    },
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            employees: employeesDataSources,
        } 
    }
})

server.listen().then(({ url }) => {
    console.log("server is running on ", url)
})