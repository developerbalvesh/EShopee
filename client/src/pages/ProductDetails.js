import axios from "axios";
import Layout from "../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();

  // get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (data.success) {
        setProduct(data.product);
        getSimilarProducts(data?.product._id, data?.product?.category?._id);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  // get similar products
  const getSimilarProducts = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/similar-product/${pid}/${cid}`
      );
      if (data.success) {
        setSimilarProducts(data.products);
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   getSimilarProducts();
  // }, [product]);

  return (
    <Layout title={`EShopee | ${product.name}`}>
      <div className="product-details pt-3 pb-3 d-flex justify-content-center align-items-center border">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 d-flex align-items-center justify-content-center">
              <img
                className="details-img"
                src={`/api/v1/product/product-photo/${product._id}`}
                alt={`${product.name}`}
                // width="100%"
              />
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="d-flex flex-column text-start align-items-left justify-content-center p-3">
                <h1 className="p-0 m-1">{product.name}</h1>
                <h4 className="m-1 p-0">{product?.category?.name}</h4>
                <p className="p-0 m-1">
                  {product.shipping && "Available for shipping"}
                </p>
                <p className="p-0 m-1">{product.description}</p>
                <p className="fw-bold text-danger p-0 m-1">
                  {!product.shipping && "Not Available for shipping"}
                </p>
                <p className="fw-bold text-success p-0 m-1">
                  {product.shipping && "Available for shipping"}
                </p>
                <div className="d-flex">
                  <button className="btn btn-dark m-2">
                    Price: {product.price} Rs.
                  </button>
                  <button
                    className="btn btn-success m-2"
                    disabled={!product.shipping}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {similarProducts[0] && (
        <div className="container mt-5">
          <h2 className="p-2 gr-black-white text-light">Similar Products</h2>
          <div className="row">
            {similarProducts.map((p) => (
              <>
                <div className="col-6 col-lg-2 col-md-3 col-sm-4 mb-3 animate__animated animate__zoomIn">
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

                      <button className="btn fs-6 w-100 btn-outline-secondary p-0 mt-2">
                        Rs. {p.price} <IoMdAddCircleOutline />
                      </button>

                      {/* <button disabled={true} className="btn fs-5 w-100 btn-outline-secondary p-0 mt-2">
                                <FaRegCheckCircle />
                              </button> */}
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
