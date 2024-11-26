const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");


const customer = sequelize.define(
    'customers',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        customer_name :{
            type: DataTypes.STRING(100),
            allowNull:false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isEmail:{
                    msg:"Enter the Valid Email !"
                }
            }
        },
        phone_number:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                isNumeric:{
                    msg:"Enter the Valid Phone Number !"
                },
                len:{
                    args:[10,10],
                    msg:"Enter the Valid Phone Number !"
                }
            }
        },
        tenant_id:{
            type:DataTypes.STRING,
            allowNull:true,
            // defaultValue:2,
            comment:"while creating the data current user is tenant"
        }
    },
    {
        tableName:"customers",
        timestamps:true,
        "createdAt":"created_at",
        "updatedAt":"updated_at",
        paranoid:true
    }
)

module.exports = customer