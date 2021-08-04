const express = require("express")
const { 
    getEmployee,
    getEmployeeList,
    postEmployee,
    putEmployee,
    deleteEmployee,
    upload,
} = require("../controllers/appControllers")
const multer = require("../middlewares/multer")


const router = express.Router()

router.get("/employee/one/:id", getEmployee)

router.get("/employee/list", getEmployeeList)

router.post("/employee/new", postEmployee)

router.put("/employee/edit/:id", putEmployee)

router.delete("/employee/delete/:id", deleteEmployee)

router.post("/upload", multer.single("upload"), upload)

module.exports = router