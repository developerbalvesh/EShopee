import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <>
      <Layout title="EShopee | All Categories">
        <div className="container mt-3 mb-3">
          <h2 className="gr-black-white text-light p-2">All Categories</h2>
          <div className="row">
            {categories && categories.map((c)=>(
              <>
                <div className="col-md-6">
                  <Link to={`/categories/${c.slug}`}>
                    <div
                      className="card text-bg-light mb-3"
                    >
                      <div className="card-header">
                        <h3 className="m-0">{c.name}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Categories;
