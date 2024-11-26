const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.config");


const AdminUser = sequelize.define(
    'admin_users',
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
        },
        user_name :{
            type: DataTypes.STRING(100),
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:{
                    args:[6,Number.MAX_SAFE_INTEGER],
                    msg:"password must contain atleast 6 characters !"
                }
            }
        },
        role:{
            type:DataTypes.INTEGER,
            allowNull:true,
            defaultValue:2,
            comment:"1->Admin 2->user"
        }
    },
    {
        tableName:"admin_users",
        timestamps:true,
        "createdAt":"created_at",
        "updatedAt":"updated_at",
        paranoid:true
    }
)

module.exports = AdminUser