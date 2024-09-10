import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [disabled, setDisabled] = useState(false);
  
    const handleSubmit = async (e) => {
      setDisabled(true);
      e.preventDefault();
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
          {
            email,
            answer,
            newPassword
          }
        );
        if (res.data.success) {
          // toast.success(res.data.message);
          // new toast
          toast.success(res.data.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
  
          localStorage.setItem("auth", JSON.stringify(res.data));
  
          setTimeout(() => {
            navigate(location.state || "/");
          }, 2000);
        } else {
          setDisabled(false);
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went Wrong");
        setDisabled(false);
      }
      // toast("Registration successfully!")
    };
  return (
    <Layout title={"EShopee | Login"}>
      <div className="register">
        <h1 className="text-dark">Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="email"
              placeholder="name@example.com"
            />
            <label htmlFor="email">Enter your dream</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="name@example.com"
            />
            <label htmlFor="password">Password</label>
          </div>

          {!disabled && (
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          )}

          {disabled && (
            <button disabled={true} type="submit" className="btn btn-dark">
              <VscLoading />
            </button>
          )}
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword;
