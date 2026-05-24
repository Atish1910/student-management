import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";


const AddNewStudent = () => {
  const navigate = useNavigate();
  const defaultValues = {
    full_name: "",
    phone: "",
    marks: [
      {
        subject_name: "",
        marks: "",
      },
    ],
  };

  const handleAddStudent = async (data) => {
    try {
      await axios.post( "http://localhost:4000/api/students", data );
      toast.success( "Student Added Successfully" );
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error( "Failed to add student");
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0 rounded-4">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 text-primary">Add New Student </h2>
              <StudentForm defaultValues={defaultValues} onSubmit={handleAddStudent} buttonText="Add Student" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewStudent;