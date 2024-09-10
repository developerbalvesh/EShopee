import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { TbShoppingBagX } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";

const Search = () => {
  const [search] = useSearch();
  return (
    <>
      <Layout title="EShopee | Search Results">
        <div className="container pt-2 text-center">
          <h2>Search Result</h2>
          {!search?.results.length > 0 ? (
            <div className="container d-flex flex-column align-items-center justify-content-center animate__animated animate__fadeIn"
            style={{height:'50vh', border:"1px solid grey"}}>
              <h1>
                <TbShoppingBagX /> 404 <TbShoppingBagX />
              </h1>
              <p>Oops ! No Product found</p>
            </div>
          ) : (
            `Found ${search.results.length} result`
          )}
          <div className="row mt-2">
            {search.results.map((p) => (
              <>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 mb-3">
                  <div className="card p-0 overflow-x-hidden">
                    <div className="card-body p-2">
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
                      <button className="btn fs-5 w-100 btn-outline-secondary p-0 mt-2">
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
    </>
  );
};

export default Search;
