import React from "react";
import { useForm, useFieldArray, } from "react-hook-form";

const StudentForm = ({defaultValues, onSubmit,buttonText, }) => {
  const {register, control, handleSubmit,} = useForm({ defaultValues,});

  const { fields, append, remove,} = useFieldArray({control, name: "marks",});

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input
        type="text"
        placeholder="Full Name"
        className="form-control mb-3"
        {...register("full_name")}
      />

      <input
        type="text"
        placeholder="Phone"
        className="form-control mb-3"
        {...register("phone")}
      />

      <div className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-primary">Student Marks</h5>
          <button
            type="button"
            className="btn btn-success btn-sm"
            onClick={() =>
              append({
                subject_name: "",
                marks: "",
              })
            }
          >Add Subject </button>

        </div>

        {fields.map((field, index) => (

          <div
            className="row mb-3"
            key={field.id}
          >
            <div className="col-md-5">
              <input
                type="text"
                placeholder="Subject Name"
                className="form-control"
                {...register(
                  `marks.${index}.subject_name`
                )}
              />
            </div>
            <div className="col-md-5">
              <input
                type="number"
                placeholder="Marks"
                className="form-control"
                {...register(
                  `marks.${index}.marks`
                )}
              />
            </div>
            <div className="col-md-2">
              {fields.length > 1 && (
                <button
                  type="button"
                  className="btn btn-danger w-100"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary w-100" > {buttonText} </button>
    </form>
  );
};

export default StudentForm;