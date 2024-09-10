import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import AdminDashboard from "./AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import NormalSpinner from '../../components/NormalSpinner'

const Products = () => {
  const [products, setProducts] = useState([]);

  //   get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Error while getting products");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <AdminDashboard title="EShopee | Manage products">
        <ScrollAnimation
          animateIn="fadeInUp"
          duration="0.5"
          animateOut="fadeOut"
        >
          <div className="card text-bg-light mb-3">
            <div className="card-header text-bg-secondary">All Products</div>
            <div className="card-body">
              <div className="container-fluid">
                <div className="row">
                  {!products ? (
                    <NormalSpinner />
                  ) : (
                    products.map((p) => (
                      <>
                        <div className="col-lg-3 col-md-4 col-sm-6 col-xs-6 mb-3">
                          <Link
                            key={p._id}
                            to={`/dashboard/admin/update-product/${p.slug}`}
                          >
                            <div className="card overflow-x-hidden">
                              <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className=" mx-auto d-block m-2"
                                alt={p.name}
                              />
                              <div className="card-body">
                                <h5 className="card-title text-center product-list-wrap h6">
                                  {p.name}
                                </h5>
                                <p className="card-text text-center product-list-wrap fs-6">
                                  {p.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </AdminDashboard>
    </>
  );
};

export default Products;
