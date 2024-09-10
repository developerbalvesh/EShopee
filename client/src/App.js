import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/AdminDashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { useAuth } from "./context/auth";
import { useNavigate } from "react-router-dom";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import "animate.css/animate.compat.css"
import ManageOrder from "./pages/user/ManageOrder";
import ManageProfile from "./pages/user/ManageProfile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";

function App() {
  const [auth, setAuth]= useAuth();
  const navigate=useNavigate();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories/:slug" element={<CategoryProduct />} />
        <Route path="/product-details/:slug" element={<ProductDetails />} />
        <Route path="/register" element={!auth.user?<Register/>:<HomePage/>} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/manage-order" element={<ManageOrder/>} />
          <Route path="user/manage-profile" element={<ManageProfile/>} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute/>}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/update-product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
        </Route>

        <Route path="/login" element={!auth.user?<Login />:<HomePage/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
