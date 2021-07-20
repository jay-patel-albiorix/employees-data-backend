const mongoose = require("mongoose")

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const db = "employees-db"

mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0.zjxmg.mongodb.net/${db}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
).then(() => {
    console.log(`${db} connected successfully`)
})
.catch(err => console.log(err))