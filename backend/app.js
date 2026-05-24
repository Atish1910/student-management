const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
require("dotenv").config();

const studentRoutes = require("./routes/studentRoutes");
const markRoutes = require("./routes/markRoutes");

const app = express();
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.use("/api/students", studentRoutes);
app.use("/api/marks", markRoutes);

const startServer = async () => {
    try {
        await sequelize.sync()
        console.log("Database Connected");
        
        app.listen(PORT, () => {
            console.log(`your serever is running at PORT : ${PORT}`);
        });
        
    } catch (error) {
        console.log("Error while connecting database:", error);
    }
}
startServer();