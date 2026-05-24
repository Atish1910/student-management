import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "bootstrap";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";

const StudentTable = ({  studentsData,fetchStudentData,handleDelete,}) => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents =
    studentsData.slice(
      indexOfFirstStudent,
      indexOfLastStudent
    );

  const totalPages = Math.ceil(
    studentsData.length / studentsPerPage
  );

  const handleEditClick = (student) => {
    setSelectedStudent({
      ...student,
      marks: student.Marks || [],
    });

    const modal = new Modal(
      document.getElementById("updateModal")
    );

    modal.show();
  };

  const handleUpdateStudent = async (data ) => {
    try {
      await axios.put( `http://localhost:4000/api/students/${selectedStudent.id}`,data);
      toast.success( "Student updated successfully");
      fetchStudentData();
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error( "Failed to update student" );
    }
  };

  return (
    <>
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary">Student Management</h2>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate("/add-student")
              }
            >
              Add New Data
            </button>

          </div>

          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Marks</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentStudents.map(
                  (student, index) => (
                    <tr key={student.id}>
                      <td>{indexOfFirstStudent + index +1}</td>
                      <td> {student.full_name}</td>
                      <td>{student.phone}</td>
                      <td>
                        {student.Marks?.map(
                          (mark, idx) => (
                            <div key={idx}>
                              <strong>{mark.subject_name}</strong>
                              {" : "}
                              {mark.marks}
                            </div>
                        ))}
                      </td>
                      <td>
                        <button className="btn btn-warning btn-sm me-2" onClick={() =>handleEditClick(student)}> Update </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id )}>Delete</button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button  className="btn btn-primary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage( currentPage - 1) } > Prev </button>
            <span className="fw-bold">  Page {currentPage} of{" "} {totalPages} </span>
            <button className="btn btn-primary ms-2" disabled={ currentPage === totalPages } onClick={() =>setCurrentPage(currentPage + 1)}> Next </button>
          </div>
        </div>
      </div>

      {/* Modal */}

      <div
        className="modal fade"id="updateModal" tabIndex="-1" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> Update Student</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"/>
            </div>

            <div className="modal-body">
              {selectedStudent && (
                <StudentForm defaultValues={selectedStudent } onSubmit={ handleUpdateStudent} buttonText="Update Student"/>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentTable;