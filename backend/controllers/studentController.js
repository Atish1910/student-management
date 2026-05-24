const Marks = require("../models/Mark");
const Student = require("../models/Student");

exports.createStudent = async (req, res) => {

    try {
        const {
            full_name,
            email,
            phone,
            course,
            marks
        } = req.body;

        // Create Student
        const student = await Student.create({
            full_name,
            email,
            phone,
            course
        });

        // Create Marks
        if (marks && marks.length > 0) {

            const marksData = marks.map((item) => ({
                subject_name: item.subject_name,
                marks: item.marks,
                student_id: student.id
            }));

            await Marks.bulkCreate(marksData);
        }

        // Fetch Student with Marks
        const studentWithMarks = await Student.findByPk(student.id, {
            include: [Marks]
        });

        res.status(201).json({
            success: true,
            data: studentWithMarks
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};


exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll({
      include:[Marks]
    });

    res.status(200).json({
      success: true,
      data: students,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getStudentById = async (req, res) => {
    try {
        
        const student = await Student.findByPk(req.params.id, {
            include:[Marks]
        });

        if(!student){
            return res.status(400).json({
                message : "Student not found..."
            });
        }

        res.json(student);

    } catch (error) {
        console.log("error to fetch student data", error);
        res.status(500).json({
            message: error.message
        });
    };
};

// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const {
      full_name,
      phone,
      marks
    } = req.body;

    // Find Student
    const student = await Student.findByPk(req.params.id);

    if (!student) {

      return res.status(404).json({
        message: "Student not found",
      });
    }

    // Update Student Details
    await student.update({
      full_name,
      phone,
    });

    // Update Marks
    if (marks && marks.length > 0) {

      // Delete Old Marks
      await Marks.destroy({
        where: {
          student_id: student.id
        }
      });

      // Insert New Marks
      const marksData = marks.map((item) => ({
        subject_name: item.subject_name,
        marks: item.marks,
        student_id: student.id
      }));
      await Marks.bulkCreate(marksData);
    }

    // Fetch Updated Student With Marks
    const updatedStudent = await Student.findByPk(student.id, {
      include: [Marks]
    });
    res.json({success: true,data: updatedStudent});

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message});
  }
};
// Delete Student
exports.deleteStudent = async (req, res) => {

  try {

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    await student.destroy();

    res.json({
      success: true,
      message: "Student deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};