const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Student = sequelize.define("Student", {
    full_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    phone:{
        type: DataTypes.STRING
    }
});

module.exports = Student;