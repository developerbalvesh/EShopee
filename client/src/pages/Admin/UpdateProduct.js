import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");
  const [options, setOptions] = useState([]);
  const [photo, setPhoto] = useState("");
  const [pid, setPid] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);
  const [disabled, setIsDisabled] = useState(false);
  const [shippingOptions, setShippingOptions] = useState([
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ]);

  console.log(category);
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
  useEffect(() => {
    setOptions(
      categories.map((obj) => ({ ...obj, value: obj._id, label: obj.name }))
    );
  }, [categories]);

  // update product
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      // using form data to add form data
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      // if(photo){
      //   productData.append("photo", photo);
      // }
      productData.append("category", category._id);
      productData.append("shipping", shipping.value);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${pid}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated");
        // setTimeout(() => {
        //   navigate("/dashboard/admin/products");
        // }, 2000);
        setIsDisabled(false);
      } else {
        toast.error(data?.message);
        setIsDisabled(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while updating product");
      setIsDisabled(false);
    }
  };

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setPid(data.product._id);
        // setting options
        setShipping(
          data.product.shipping
            ? { value: "yes", label: "Yes" }
            : { value: "no", label: "No" }
        );
        setCategory(() => ({
          ...data.product.category,
          value: data.product.category._id,
          label: data.product.category.name,
        }));
      }
    } catch (error) {}
  };

  // calling get single product
  useEffect(() => {
    getSingleProduct();
  }, []);

  // delete product

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const { data } = await axios.delete(`/api/v1/product/product/${pid}`);
      if (data.success) {
        toast.success("Deleted, redirecting to products page");
        setTimeout(() => {
          navigate("/dashboard/admin/products");
        }, 2000);
      } else {
        toast.error(data.message);
        setIsDisabled(false);
        setIsConfirm(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while deleting product");
      setIsDisabled(false);
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
            <div className="card-header text-bg-secondary">Update Product</div>
            <div className="card-body">
              {/* <form onSubmit={handleUpdate}> */}
              <Select
                options={options}
                value={category}
                onChange={setCategory}
                placeholder="Select Category"
                className="mb-2"
                autoFocus
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
                {!photo && (
                  <div className="text-center">
                    <img
                      src={`/api/v1/product/product-photo/${pid}`}
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
              <div className="d-flex justify-content-around">
                <button
                  disabled={disabled}
                  className="btn btn-danger w-40"
                  onClick={() => setIsConfirm(true)}
                >
                  Delete Product
                </button>

                <button
                  disabled={disabled}
                  className="btn btn-success w-40"
                  onClick={handleUpdate}
                >
                  Update Product
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
          {isConfirm && (
            <div
              className="
            d-flex 
            justify-content-center 
            align-items-center 
            cust-modal"
            >
              <div className="bg-light text-center rounded p-5 animate__animated animate__bounceInDown">
                <h4>Are you sure?</h4>
                <button
                  disabled={disabled}
                  className="btn btn-success m-1"
                  onClick={() => setIsConfirm(false)}
                >
                  Cancel
                </button>
                <button
                  disabled={disabled}
                  className="btn btn-danger m-1"
                  onClick={handleDelete}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </ScrollAnimation>
      </AdminDashboard>
    </>
  );
};

export default UpdateProduct;
