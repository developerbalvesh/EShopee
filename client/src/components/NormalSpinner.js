import React from "react";

const NormalSpinner = () => {
  return (
    <div className="container text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default NormalSpinner;
