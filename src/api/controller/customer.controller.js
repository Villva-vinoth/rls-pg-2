const { createCustomer, getOne, getAll } = require("../services/customer.service");

module.exports = {
    createCustomer : (req,res,next)=>{
        const body = req.body;
        body.tenant_id = req.get('tenantId')

        createCustomer(body,(err,result)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).json({
                success:true,
                message:"Customer created Successfully!"
            })
        })
    },
    getOne:(req,res,next)=>{
        const body = req.params.id;
        getOne(body,(err,result)=>{
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(200).json({
                success:true,
                data:result
            })
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
                data : result
            })
        })
    }
}