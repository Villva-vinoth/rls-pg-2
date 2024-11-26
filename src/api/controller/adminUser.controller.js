const { setTenantId } = require("../../helper/setTenantId");
const { createUser, getOne, login, getAll } = require("../services/adminUser.service");

module.exports ={
    createUser: (req,res)=>{
        const body = req.body;
        createUser(body,(err,result)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:err.message || "Internal Server Error !"
                })
            }
            return res.status(201).json({
                success:true,
                message:"User Created successfully !"
            })
        })
    },
    getOne: (req,res)=>{
        const body = req.params;
        getOne(body,(err,result)=>{
            if(err){
                return res.status(500).json({
                    success:false,
                    message:err.message || "Internal Server Error !"
                })
            }
            return res.status(201).json({
                success:true,
                data:result
            })
        })
    },


    login: (req,res,next)=>{
        const body = req.body;
        login(body,(err,result)=>{
            if(err){
                 res.status(500)
                 return next(err)
            }
            if(result){
                if(result.password == body.password){

                     res.status(201).json({
                        success:true,
                        data:result
                    })
                    return next(null,result);
                }
            }
            
            res.status(401)
            return next(new Error('password InValid !'))
           
        })
    },
    getAll: (req,res,next)=>{
        getAll((err,result)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).json({
                success:true,
                data:result
            })
        })
    }

}