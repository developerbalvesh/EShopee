import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import NormalSpinner from "../components/NormalSpinner";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { BiErrorAlt } from "react-icons/bi";
import { TbShoppingBagX } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useCart();

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/products-per-page/${page}`
      );
      if (data?.success) {
        setProducts(data.products);
        setSpinner(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (!checked.length && !radio.length) {
      getAllProducts();
    }
    // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [page]);

  // get all category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    // eslint-disable-next-line
  }, []);

  // handle filter

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/filter-products", {
        radio,
        checked,
      });
      setProducts(data.products);
      setPage(1);
      setTotal(0);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (radio.length || checked.length) {
      filterProduct();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  // get total count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      if (data.success) {
        setTotal(data.total);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalCount();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Layout title={"EShopee | Best Offers"}>
        <div className="container animate__animated animate__fadeIn">
          <div className="row mt-3">
            <div className="col-md-3">
              {/* Filter by Category */}
              <div className="card text-bg-light mb-3">
                <div className="card-header fw-semibold">
                  Filter By Category
                </div>

                <div className="card-body p-2">
                  {/* <ul className="list-group"> */}
                  {categories?.map((c) => (
                    <>
                      {/* <li className="list-group-item list-group-item-secondary"> */}
                      <Checkbox
                        className="fs-6"
                        key={c._id}
                        onChange={(e) => {
                          handleFilter(e.target.checked, c._id);
                        }}
                      >
                        {c.name}
                      </Checkbox>
                      {/* </li> */}
                    </>
                  ))}
                  {/* </ul> */}
                </div>
              </div>
              {/* Filter by Category end */}
              {/* Filter by price */}
              <div className="card text-bg-light mb-3">
                <div className="card-header fw-semibold">Filter By Price</div>

                <div className="card-body p-2">
                  <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
              </div>
              {/* Filter by price end */}
              <button
                className="btn btn-danger mb-2 w-100"
                onClick={() => window.location.reload()}
              >
                Reset filters
              </button>
            </div>
            <div className="col-md-9">
              {/* <h1 className="text-center">Welcome to EShopee !</h1> */}
              <div className="container">
                <h4>Products</h4>
                <div className="row">
                  {!products.length && (
                    <>
                      <div className="container text-center p-5 animate__animated animate__fadeIn">
                        <h4>
                          <TbShoppingBagX /> No Match Found <TbShoppingBagX />
                        </h4>
                      </div>
                    </>
                  )}
                  {spinner ? (
                    <NormalSpinner />
                  ) : (
                    products.map((p) => (
                      <>
                        <div className="col-xs-6 col-lg-3 col-md-3 col-sm-6 mb-3  animate__animated animate__zoomIn">
                          <div className="card p-0 overflow-x-hidden">
                            <div className="card-body p-2">
                              <Link to={`/product-details/${p.slug}`}>
                                <img
                                  src={`/api/v1/product/product-photo/${p._id}`}
                                  className=" mx-auto d-block m-2"
                                  alt={p.name}
                                />
                                <h5 className="card-title text-center product-list-wrap h6">
                                  {p.name}
                                </h5>
                                <p className="card-text text-center product-list-wrap fs-6">
                                  {p.description}
                                </p>
                              </Link>

                              <button
                                onClick={() => {
                                  setCart([...cart, p]);
                                  toast.success(`${p.name} was added`);
                                  localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                }}
                                className="btn fs-5 w-100 btn-outline-secondary p-0 mt-2"
                              >
                                Rs. {p.price} <IoMdAddCircleOutline />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    ))
                  )}
                </div>
                <div className="container d-flex justify-content-center">
                  <nav aria-label="...">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <button
                          disabled={page <= 1 ? true : false}
                          onClick={() => setPage(page - 1)}
                          type="button"
                          className="btn rounded-0 rounded-start btn-outline-secondary"
                        >
                          Previous
                        </button>
                      </li>
                      <li
                        className="page-item"
                        style={
                          page - 1 <= 2
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        <button
                          onClick={() => setPage(page - 2)}
                          type="button"
                          className="btn rounded-0 btn-outline-secondary"
                        >
                          {page - 2}
                        </button>
                      </li>
                      <li
                        className="page-item"
                        style={
                          page <= 1 ? { display: "none" } : { display: "block" }
                        }
                      >
                        <button
                          onClick={() => setPage(page - 1)}
                          disabled={page === 1 ? true : false}
                          type="button"
                          className="btn rounded-0 btn-outline-secondary"
                        >
                          {page - 1}
                        </button>
                      </li>
                      <li className="page-item">
                        <button
                          type="button"
                          className="btn active rounded-0 btn-outline-secondary"
                        >
                          {page}
                        </button>
                      </li>
                      <li
                        className="page-item"
                        style={
                          page >= total
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        <button
                          type="button"
                          onClick={() => setPage(page + 1)}
                          className="btn rounded-0 btn-outline-secondary"
                        >
                          {page + 1}
                        </button>
                      </li>
                      <li
                        className="page-item"
                        style={
                          page + 1 >= total
                            ? { display: "none" }
                            : { display: "block" }
                        }
                      >
                        <button
                          type="button"
                          onClick={() => setPage(page + 2)}
                          className="btn rounded-0 btn-outline-secondary"
                        >
                          {page + 2}
                        </button>
                      </li>
                      <li className="page-item">
                        <button
                          onClick={() => setPage(page + 1)}
                          disabled={page >= total ? true : false}
                          type="button"
                          className="btn rounded-0 rounded-end btn-outline-secondary"
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;
