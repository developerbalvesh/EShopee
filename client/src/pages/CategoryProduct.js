import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams , Link} from "react-router-dom";
import axios from "axios";
import { IoMdAddCircleOutline } from "react-icons/io";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();

  const getProByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      if (data.success) {
        setProducts(data?.products);
        setCategory(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    getProByCat();
  },[params])
  return (
    <Layout>
      <div className="container mt-2 mb-2 pt-1 pb-1">
        <div className="d-flex justify-content-between align-items-center">
        <h2 className="flex-grow-1 gr-black-white p-2 text-light shadow rounded">{category?.name}</h2>
        <p className="bg-secondary ms-2 p-2 text-light shadow rounded">{products?.length} results found</p>
        </div>
        <div className="row">
            {products.map((p) => (
              <>
                <div key={p._id} className="col-6 col-lg-2 col-md-3 col-sm-4 mb-3 animate__animated animate__zoomIn">
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
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
