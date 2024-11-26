const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../db/config/db.config.js');
const AdminuserModel = require('../../db/models/adminUser.model.js');
const { resetTenantID } = require('../../helper/setTenantId.js');

module.exports ={
    createUser:async(data,callback)=>{
        const transaction = await sequelize.transaction();
        try {
            const exists = await AdminuserModel.findOne({
                where:{
                    user_name:data.user_name
                },
                transaction
            })

            console.log("exists",exists)
            if(exists){
                throw new Error('User already have Account !');
            }

            await sequelize.query(`create role ${data.user_name}`,{
                type:QueryTypes.RAW,
                // replacements:{username:data.user_name},
                transaction
            })

            console.log('created Roles ')

            await sequelize.query(`Grant all privileges on all tables in schema public to ${data.user_name}`,{
                type:sequelize.QueryTypes.RAW,
                // replacements:{username :data.user_name},
                transaction
            })
             await sequelize.query(`Grant all privileges on all sequences in schema public to ${data.user_name}`,{
                type:sequelize.QueryTypes.RAW,
                // replacements:{username :data.user_name},
                transaction
            })

            const users = await AdminuserModel.create(data,{transaction})
            await transaction.commit();
            return callback(null,users);

        } catch (error) {
            console.log("error", error)
            if(transaction) await transaction.rollback()
            callback(error)
        }
    },
    getOne: async (data,callback)=>{
        try {
            console.log(" requesting user",data.id)
            const getOne = await AdminuserModel.findOne(
                {
                    where: {
                        id: data.id
                    },
                    attributes:{
                        exclude:['password','updated_at','deletedAt']
                    }
                }
            )
            if(!getOne){
                throw new Error('User Not Found !')
            }
            callback(null,getOne)
        } catch (error) {
            callback(error)
        }
    },
    login: async(data,callback)=>{
        try {
            const users = await AdminuserModel.findOne(
               { 
                where:{
                    user_name:data.user_name,
                },
                attributes:['password','id','user_name']
            }
            )
            if(!users){
                throw new Error("Username Invalid!")
            }
            callback(null,users)
        } catch (error) {
            callback(error);
        }
    },
    getAll: async (callback)=>{
        try {
            
            const users = await AdminuserModel.findAll()
             await resetTenantID();
            return callback(null,users)
        } catch (error) {
            callback(error)
        }
    }
}