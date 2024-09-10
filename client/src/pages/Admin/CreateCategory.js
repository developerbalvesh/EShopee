import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import { Modal } from "antd";
import e from "cors";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  // show modal
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // submit category form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} added`);
        getAllCategory(); // to update category list
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while Adding Category");
    }
  };

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting all category");
      // toast.error(error.message)
    }
  };

  // calling function inside useEffect, it uses to execute when component is loaded
  useEffect(() => {
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success("Category updated!");
        setSelected(null); // reset selected category
        setUpdatedName(""); // reset updated name
        setVisible(false); // disable popup
        getAllCategory(); // update category list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating category");
    }
  };

  // delete Category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting category");
    }
  };

  return (
    <>
      <AdminDashboard title="EShopee | Create Category">
        <ScrollAnimation
          animateIn="fadeInUp"
          duration="0.5"
          animateOut="fadeOutUp"
        >
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />

          <div className="card text-bg-light mb-3">
            <div className="card-header text-bg-secondary">
              <strong>Manage Category</strong>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th className="text-center" scope="col">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!categories[0] && (<><h4 className="p-3">No Category found</h4></>)}
                  {categories?.map((c) => (
                    <tr
                      key={c._id}
                      className="animate__animated animate__slideInDown"
                    >
                      <td>{c.name}</td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c._id);
                          }}
                          className="btn btn-primary p-1 ms-1"
                        >
                          <strong>Edit</strong>
                        </button>
                        <button
                          className="btn btn-danger p-1 ms-1"
                          onClick={() => handleDelete(c._id)}
                        >
                          <strong>Delete</strong>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              visible={visible}
              footer={null}
            >
              <CategoryForm
                title={"Update Category"}
                button={"Update"}
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </ScrollAnimation>
      </AdminDashboard>
    </>
  );
};

export default CreateCategory;
