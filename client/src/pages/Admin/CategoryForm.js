import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue, title="Create Category", button="Create" }) => {
  return (
    <>
      <div className="card text-bg-light mb-3">
      <div className="card-header text-bg-secondary"><strong>{title}</strong></div>
      <div className="card-body"> 
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Category"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button type="submit" className="btn w-100 btn-success">
              {button}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CategoryForm;
