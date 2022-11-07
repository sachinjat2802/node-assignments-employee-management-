import mongoose from "mongoose"
import validator from "validator";
const employeeSchema = new mongoose.Schema(
    {
     email:{
        type:'string',
        required:true,
        validate:{
            validator:validator.isEmail,
            message:"Please provide a valid email"
        }
     } ,
     name:{
        type:'string',
        required:true,
     },
     password:{
        type:'string',
        required:true
     } ,
     age:{
        type:'number',
        required:true
     } ,
     salary:{
        type:'number',
        required:true
     } ,
     mobile:{
        type:'number',
        required:true
     } ,
     isDeleted:{
        type:'boolean',
        required:true,
        default:false,
     } 
    }
    );
    employeeSchema.set("timestamps", true);

const Employee = new mongoose.model("employee",employeeSchema);

export {Employee,employeeSchema}