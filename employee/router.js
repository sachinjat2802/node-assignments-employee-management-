import { Router } from "express";
import { isLoggedIn } from "../middleware/jwtVerify.js";
export const router = Router();
import{employeeController} from "./controller.js"

router.get("/ping", (req, res) => {
    res.send("pong")
})

router.post('/employee',employeeController.createEmployee);
router.post('/employee/login',employeeController.login);
router.get('/employee',isLoggedIn,employeeController.getEmployee);
router.put('/employee/:id',isLoggedIn,employeeController.updateEmployee);
router.delete('/employee/:id',isLoggedIn,employeeController.deleteEmployee);
router.get('/employee/logOut',isLoggedIn,employeeController.logOut)
router.get('/employee/:id',isLoggedIn,employeeController.getEmployee);
