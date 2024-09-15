import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const {data} = await axios.get(`/api/v1/product/search/${search.keyword}`);
        setSearch({...search,results:data})
        navigate('/search')
    } catch (error) {
        console.log(error.message)
    }
  };
  return (
    <>
      <form className="d-flex ms-auto" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={search.keyword}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
          required
        />
        <button className="btn btn-outline-dark" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
