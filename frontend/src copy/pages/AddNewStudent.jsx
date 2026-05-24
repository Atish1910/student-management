import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewStudent = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    marks: [
      {
        subject_name: "",
        marks: "",
      },
    ],
  });

  // Handle Student Inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Marks Inputs
  const handleMarksChange = (index, e) => {
    const values = [...formData.marks];
    values[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      marks: values,
    });
  };

  // Add More Subject
  const addMoreSubject = () => {
    setFormData({
      ...formData,
      marks: [
        ...formData.marks,
        {
          subject_name: "",
          marks: "",
        },
      ],
    });
  };

  // Remove Subject
  const removeSubject = (index) => {
    const values = [...formData.marks];
    values.splice(index, 1);
    setFormData({
      ...formData,
      marks: values,
    });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post( "http://localhost:4000/api/students",formData);
      alert("Student Added Successfully");
      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow border-0 rounded-4">
              <div className="card-body p-4">
                <h2 className="text-center mb-4 text-primary">
                  Add New Student
                </h2>

                <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="form-control mb-3"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                    />

                    <input
                      type="text"
                      className="form-control mb-3"
                      placeholder="enter phone No"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                  <div className="">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="text-primary mb-0">
                        Student Marks
                      </h5>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={addMoreSubject}
                      >Add Subject</button>
                    </div>

                    {formData.marks.map((item, index) => (
                      <div className="row mb-3 align-items-end" key={index}>
                        <div className="col-md-5">
                          <input
                            type="text"
                            className="form-control"
                            name="subject_name"
                            placeholder="Subject Name"
                            value={item.subject_name}
                            onChange={(e) =>
                              handleMarksChange(index, e)
                            }
                          />
                        </div>
                        <div className="col-md-5">
                          <input
                            type="number"
                            className="form-control"
                            name="marks"
                            placeholder="Marks"
                            value={item.marks}
                            onChange={(e) =>
                              handleMarksChange(index, e)
                            }
                          />
                        </div>
                        <div className="col-md-2">
                          {formData.marks.length > 1 && (
                            <button
                              type="button"
                              className="btn btn-danger w-100"
                              onClick={() => removeSubject(index)}
                            >Remove</button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Add Student</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewStudent;