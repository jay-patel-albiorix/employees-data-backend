const express = require("express")
const { 
    getEmployee,
    getEmployeeList,
    postEmployee,
    patchEmployee,
    deleteEmployee,
} = require("../controllers/appControllers")

const router = express.Router()

router.get("/employee/one/:id", getEmployee)

router.get("/employee/list", getEmployeeList)

router.post("/employee/new", postEmployee)

router.put("/employee/edit/:id", patchEmployee)

router.delete("/employee/delete/:id", deleteEmployee)

module.exports = router