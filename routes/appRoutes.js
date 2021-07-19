const express = require("express")
const { 
    getEmployeeList,
    postEmployee,
} = require("../controllers/appControllers")

const router = express.Router()


router.get("/employee/list", getEmployeeList)

router.post("/employee/new", postEmployee)

module.exports = router