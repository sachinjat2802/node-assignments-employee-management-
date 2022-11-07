 import CrudOperations from "../crudOpertions/moongodbCrud.js";
 import {Employee}from "../models/employee.js";
 import bcrypt from "bcryptjs";
 import jwt from "jsonwebtoken";
 

 class EmployeeController{
   async createEmployee(req,res){
    const employeeData = req.body;
    if(employeeData.email){
        const employee = await new  CrudOperations(Employee).getDocument({"email":employeeData.email,"isDeleted":false});
        if(employee){
            return res.status(400).json({
                "msg":"employee already exists please login"
            })
        }
        const hash = await bcrypt.hash(employeeData.password, 10)
        employeeData.password = hash
        const newEmployee = new Employee(employeeData);
         try{
            const result = await new CrudOperations(Employee).save(newEmployee)
             res.status(201).json(
                result
             )
            }
        catch(error){
            res.status(201).json(
                 {
                     "msg":error.message
                 }
             )
        }
     }
      else{
        res.status(400).json({
            "msg":"please provide email"
         })
        }
  }
   async login(req,res){
    const employeeData = req.body;
    if(employeeData.email){
        const employee = await new CrudOperations(Employee).getDocument({"email":employeeData.email,"isDeleted":false});
        if(employee){
            const isMatch = await bcrypt.compare(employeeData.password, employee.password);
            if(isMatch){
                const token = jwt.sign({           
                    "id":employee._id,           
                    "email":employee.email},           
                    "SECRETKEY",           
                    {           
                        "expiresIn":"24h"           
                    }           
                );           
                res.status(200).json({           
                    "msg":"login successful ",           
                    "token":token           
                })           
            }           
            else{           
                res.status(400).json({           
                    "msg":"invalid credentials"})
                }
            }
            else{
                res.status(400).json({           
                    "msg":"enter valid email address"
            })

             }
            }	
            else{
                res.status(400).json({           
                 "msg":"please provide email"           
                })           
        }
    }

        
   async getEmployee(req,res){
    const query=req.query??{};
    const pageNo=req.query.pageNo;
    const limit=req.query.limit;
    delete query.pageNo;
    delete query.limit;
    
    query.isDeleted =false;
    try{
        if(req.params.id){
            const employee = await new CrudOperations(Employee).getDocument({"_id":req.params.id,"isDeleted":false});           
            res.status(200).json(employee)
        }else{
  const result = await new CrudOperations(Employee).getAllDocuments(query,{},{pageNo:Number(pageNo)||0,limit:Number(limit)||0})
        res.status(201).send(
            result
        );
    }
    }
    catch(error)
    {  res.status(400).send(
       error.message
   )}
   }
   async updateEmployee(req,res){
    const employeeData = req.body
    if(employeeData.password){
        const hash = await bcrypt.hash(employeeData.password, 10)
        employeeData.password = hash
    }
    try{
       const employee = await new CrudOperations(Employee).getDocument({"_id":req.params.id,"isDeleted":false});           
       if(employee){          
        const updatedEmployee = Object.assign(employee,employeeData)
        const result = await new CrudOperations(Employee).updateDocument({"_id":req.params.id},updatedEmployee);           
           res.status(200).json(result)           
       }           
       else{           
           res.status(400).json({           
               "msg":"employee not found"   

    })}
   }
    catch(error){
        {  res.status(400).send(
            error.message
        )}
    }

   }
   async deleteEmployee(req,res){
    try{
        const employee = await new CrudOperations(Employee).getDocument({"_id":req.params.id,"isDeleted":false});           
        if(employee){          
         const updatedEmployee = Object.assign(employee,{isDeleted:true})
         const result = await new CrudOperations(Employee).updateDocument({"_id":req.params.id},updatedEmployee);           
            res.status(200).json(result)           
        }           
        else{           
            res.status(400).json({           
                "msg":"employee already deleted"   
 
     })}
    }
     catch(error){
         {  res.status(400).send(
             error.message
         )}
     }
 
    }

    async logOut(req,res){
        req.currentUser = undefined;
        res.status(200).send(
            {
                "msg":"logged out successfully"
        })
 }
}
export const employeeController = new EmployeeController();