import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";

const StudentTable = ({ studentsData, handleDelete }) => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    full_name: "",
    phone: "",
    Marks: [],
  });

  // ================= PAGINATION =================

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  const currentStudents = studentsData.slice(indexOfFirstStudent,indexOfLastStudent);
  const totalPages = Math.ceil( studentsData.length / studentsPerPage);

  // ================= EDIT MODAL =================

  const handleEditClick = (student) => {
    setSelectedStudent({
      ...student,
      marks: student.Marks || [],
    });
    const modal = new Modal(document.getElementById("updateModal"));
    modal.show();
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setSelectedStudent({
      ...selectedStudent,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE MARKS =================

  const handleMarksChange = (index, e) => {
    const values = [...selectedStudent.marks];
    values[index][e.target.name] = e.target.value;
    setSelectedStudent({
      ...selectedStudent,
      marks: values,
    });
  };

  // ================= ADD SUBJECT =================

  const addMoreSubject = () => {

    setSelectedStudent({
      ...selectedStudent,

      marks: [
        ...selectedStudent.marks,
        {
          subject_name: "",
          marks: "",
        },
      ],
    });
  };

  // ================= REMOVE SUBJECT =================

  const removeSubject = (index) => {
    const values = [...selectedStudent.marks];
    values.splice(index, 1);
    setSelectedStudent({
      ...selectedStudent,
      marks: values,
    });
  };

  // ================= UPDATE STUDENT =================

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:4000/api/students/${selectedStudent.id}`,
        selectedStudent
      );
      alert("Student updated successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error updating student", error);
    }
  };

  return (
    <>
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-primary mb-0"> Student Management</h2>
            <button className="btn btn-success" onClick={() => navigate("/add-student")} >Add New Data </button>
          </div>
          {/* ================= TABLE ================= */}
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Full Name</th>
                  <th>Phone</th>
                  <th>Marks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td> {indexOfFirstStudent + index + 1} </td>
                    <td>{student.full_name}</td>
                    <td>{student.phone}</td>
                    <td>
                      {student.Marks &&
                      student.Marks.length > 0 ? (
                        student.Marks.map((mark, idx) => (
                          <div key={idx}>
                            <strong>{mark.subject_name}</strong>
                            {" : "}
                            {mark.marks}
                          </div>
                        ))) : (<span>No Marks</span>)}
                    </td>
                    <td>
                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(student) } >Update</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)} >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= PAGINATION ================= */}

          <div className="d-flex justify-content-center align-items-center mt-4">
            <button className="btn btn-primary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
            <span className="fw-bold"> Page {currentPage} of {totalPages}</span>
            <button className="btn btn-primary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>
        </div>
      </div>

      {/* ================= UPDATE MODAL ================= */}

      <div className="modal fade" id="updateModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Student</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <form onSubmit={handleUpdateStudent}>
              <div className="modal-body">
                  <input type="text" placeholder="Full Name" className="form-control mb-3" name="full_name" value={selectedStudent.full_name || ""} onChange={handleChange}/>
                  <input type="text" className="form-control mb-3" placeholder="Phone" name="phone" value={selectedStudent.phone || ""} onChange={handleChange} />

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-primary mb-0">Student Marks</h5>
                    <button type="button" className="btn btn-success btn-sm" onClick={addMoreSubject}>Add Subject </button>
                  </div>
                  {selectedStudent.marks &&
                    selectedStudent.marks.map((item, index) => (

                      <div
                        className="row mb-3 align-items-end"
                        key={index}
                      >

                        <div className="col-md-5">

                          <input
                            type="text"
                            className="form-control"
                            placeholder="Subject Name"
                            name="subject_name"
                            value={item.subject_name || ""}
                            onChange={(e) =>
                              handleMarksChange(index, e)
                            }
                          />
                        </div>
                        <div className="col-md-3">
                          <input type="number" className="form-control" placeholder="Marks" name="marks" value={item.marks || ""} onChange={(e) => handleMarksChange(index, e) }  />
                        </div>
                        <div className="col-md-4">
                          {selectedStudent.marks.length > 1 && (
                            <button type="button" className="btn btn-danger w-100" onClick={() => removeSubject(index)}> Remove</button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                <button type="submit" className="btn btn-primary" >Update Student</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentTable;