const { Op } = require('sequelize')
const customerModel = require('../../db/models/customer.model')
const { sequelize } = require('../../db/config/db.config')
module.exports = {
    createCustomer : async (data,callback)=>{
        const transaction = await sequelize.transaction()
        try{
            const existingCustomer = await customerModel.findOne({
                where:{[Op.or]:{
                    email:data.email,
                    phone_number : data.phone_number
                }},
                transaction
            })
            
            if(existingCustomer){
                throw new Error("Customer already exists !")
            }

            console.log("existing Customers");
            const customer = await customerModel.create(data,{transaction})
            await transaction.commit();
            return callback(null,customer);
        }
        catch(error){
            if(transaction){
                await transaction.rollback();
            }
            callback(error)
        }
    },
    getOne: async(data,callback)=>{
        try {
            const getCustomer = await customerModel.findByPk(data)
            if(!getCustomer){
                throw new Error('Customer Not Found !');
            }
            return callback(null,getCustomer);
        } catch (error) {
            callback(error)
        }
    },
    getAll : async (callback)=>{
        try {
            const getAllCustomer = await customerModel.findAll()
            return callback(null,getAllCustomer)
        } catch (error) {
            callback(error)
        }
    }
}