// remove dotenv in deployed
const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const { graphqlUploadExpress } = require("graphql-upload")

const typeDefs = require("../graphql/schema")
const resolvers = require("../graphql/resolvers")
const employeesDataSources = require("../graphql/dataSources/employees")
const uploadDataSources = require("../graphql/dataSources/upload")

require("../db/index.js")


const startServer = async () => {
    console.log("Starting server")

    const port = process.env.PORT || 4000

    const server = new ApolloServer({
        cors: {
            origin: "*",
        },
        typeDefs,
        resolvers,
        dataSources: () => {
            return {
                employees:  new employeesDataSources(),
                upload: new uploadDataSources(),
            } 
        }
    })
    
    await server.start()


    const app = express()

    app.use(graphqlUploadExpress())

    server.applyMiddleware({
        app,
    })

    await new Promise(r => app.listen({
        port,
    }, r))
    
    console.log(`graphql server is running on port: ${port}, route: ${server.graphqlPath}`)

} 

startServer()
