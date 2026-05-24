const Mark = require("../models/Mark");

exports.addMarks = async (req, res) => {

  try {

    const marks = await Mark.create(req.body);

    res.status(201).json({
      success: true,
      data: marks,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMarks = async (req, res) => {

  try {

    const marks = await Mark.findAll();

    res.json(marks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateMarks = async (req, res) => {

  try {

    const mark = await Mark.findByPk(req.params.id);

    if (!mark) {
      return res.status(404).json({
        message: "Marks record not found",
      });
    }

    await mark.update(req.body);

    res.json({
      success: true,
      data: mark,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteMarks = async (req, res) => {

  try {

    const mark = await Mark.findByPk(req.params.id);

    if (!mark) {
      return res.status(404).json({
        message: "Marks record not found",
      });
    }

    await mark.destroy();

    res.json({
      success: true,
      message: "Marks deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};