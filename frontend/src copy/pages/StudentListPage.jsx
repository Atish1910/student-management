import React, { useEffect, useState } from "react";
import axios from "axios";
import StudentTable from "../components/StudentTable";
import toast from "react-hot-toast";

const StudentListPage = () => {
  const [studentsData, setStudentsData] = useState([]);
  const fetchStudentData = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/students/");
      setStudentsData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    debugger
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this student?"
      );
      if (!confirmDelete) return;
      await axios.delete(`http://localhost:4000/api/students/${id}`);
      toast.success("Student deleted successfully");
      window.location.reload();
      fetchStudentData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete student");
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <StudentTable studentsData={studentsData} handleDelete={handleDelete}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentListPage;