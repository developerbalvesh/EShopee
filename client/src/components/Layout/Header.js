import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();
  const handleLogout = () => {
    toast("Logging out");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
  };
  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to="/" className="navbar-brand" href="#">
            E-Shopee
          </Link>
          <button
            className="navbar-toggler position-relative"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
            <span className="position-absolute top-100 start-0 translate-middle badge rounded-pill bg-danger">
              {cart?.length}
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <SearchInput />
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  {categories &&
                    categories.slice(0, 3).map((c) => (
                      <>
                        <li key={c._id}>
                          <NavLink
                            className="dropdown-item"
                            to={`/categories/${c.slug}`}
                          >
                            {c.name}
                          </NavLink>
                        </li>
                      </>
                    ))}
                  <li>
                    <NavLink
                      className="dropdown-item text-primary bg-light"
                      to="/categories"
                    >
                      See all Categories
                    </NavLink>
                  </li>
                </ul>
              </li>

              {auth.user && (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </Link>
                    <ul className="dropdown-menu text-center">
                      <li className="nav-item m-1">
                        <NavLink
                          className="w-100 rounded dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? `admin` : `user`
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item m-1">
                        <Link
                          className="btn w-100 btn-danger fs-6"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {!auth.user && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  <div className="cart position-relative">
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.length}
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
