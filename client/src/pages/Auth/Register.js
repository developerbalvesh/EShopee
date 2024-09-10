import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          password,
          phone,
          address,
          answer
        }
      );
      if (res.data.success) {
        // toast.success(res.data.message);
        // new toast
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setTimeout(() => {
          navigate("/login");
        }, 5000);
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
    <Layout title={"EShopee | Register"}>
      <div className="register">
        <h1 className="text-dark">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="floatingInput"
              placeholder="name middlename sirname"
            />
            <label htmlFor="floatingInput">Full Name</label>
          </div>

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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="name@example.com"
            />
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phone"
              placeholder="name@example.com"
            />
            <label htmlFor="phone">Phone no</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="answer"
              placeholder="Your Class teacher name"
            />
            <label htmlFor="answer">What is your dream</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="address"
              placeholder="Address"
            />
            <label htmlFor="address">Address</label>
          </div>

          {!disabled && (
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          )}

          {disabled && (
            <button disabled="true" type="submit" className="btn btn-dark">
              <VscLoading />
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default Register;
