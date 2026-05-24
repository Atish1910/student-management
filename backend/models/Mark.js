const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");

const Marks = sequelize.define("Marks",{
    
    subject_name:{
        type: DataTypes.STRING
    },

    marks:{
        type: DataTypes.INTEGER
    }
});


// Associations
Student.hasMany(Marks,{
    foreignKey: "student_id",
    onDelete: "CASCADE"
});

Marks.belongsTo(Student,{
    foreignKey: "student_id"
});

module.exports = Marks;