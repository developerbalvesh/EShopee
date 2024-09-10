import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState([]);
  const [photo, setPhoto] = useState("");
  const [shippingOptions, setShippingOptions] = useState([
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]);

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while getting categories");
    }
  };

  
// calling get all category
  useEffect(() => {
    getAllCategory();
    // eslint-disable-next-line
  }, []);

  // setting options for category
  useEffect(()=>{
    setOptions(
      categories.map((obj) => {
        obj["value"] = obj["_id"];
        obj["label"] = obj["name"];
        return obj;
      })
    );
  },[categories])

  // add product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // using form data to add form data
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category._id);
      productData.append("shipping", shipping.value);

      console.log(productData);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );

      if (data?.success) {
        toast.success("Product added");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 2000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while adding product");
    }
  };
  return (
    <>
      <AdminDashboard title="EShopee | Create Product">
        <ScrollAnimation
          animateIn="fadeInUp"
          duration="0.5"
          animateOut="fadeOut"
        >
          <div className="card text-bg-light mb-3">
            <div className="card-header text-bg-secondary">Create Product</div>
            <div className="card-body">
              <form onSubmit={handleCreate}>
                <Select
                  options={options}
                  value={category}
                  onChange={setCategory}
                  placeholder="Select Category"
                  className="mb-2"
                />
                <div className="col-md-12 mb-2">
                  <label
                    htmlFor="upload-img"
                    className="btn btn-outline-secondary col-md-12"
                  >
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      id="upload-img"
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-2">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product-img"
                        height="100px"
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter product name"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product description"
                    className="form-control"
                  ></textarea>
                </div>
                <div className="mb-2">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Price"
                    className="form-control"
                    min={"1"}
                    max={"9999999999"}
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    className="form-control"
                    min={"0"}
                  />
                </div>
                <div className="mb-2">
                  <Select
                    options={shippingOptions}
                    value={shipping}
                    onChange={setShipping}
                    placeholder="Select Shipping"
                    className="mb-2"
                  />
                </div>
                <div className="mb-2">
                  <button
                    className="btn btn-success w-100"
                    onClick={handleCreate}
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </ScrollAnimation>
      </AdminDashboard>
    </>
  );
};

export default CreateProduct;
