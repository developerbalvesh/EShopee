import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { VscLoading } from "react-icons/vsc";
import AdminDashboard from "./AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";
import { useAuth } from "../../context/auth";

const ManageProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [auth, setAuth] = useAuth();

  // setting auth values
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, [auth?.user]);

  // update profile
  const handleSubmit = async (e) => {
    setDisabled(true);
    e.preventDefault();
    try {
      // send request and get data back
      const {data} = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );

      // check if data is updated
      if (data?.success) {
        // update the auth context
        setAuth({...auth, user: data?.updatedUser})

        // also udpate local storage
        // we're doing this saperately because we're udpdating different
        let ls = localStorage.getItem('auth');
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem('auth', JSON.stringify(ls));

        toast.success("Profile udpated");
        setDisabled(false);
      } else {
        setDisabled(false);
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
      setDisabled(false);
    }
  };

  return (
    <>
      <AdminDashboard title="EShopee | Create Product">
        <ScrollAnimation
          animateIn="fadeInUp"
          duration="0.5"
          animateOut="fadeOut"
        >
          <div className="register p-4">
            <h2 className="text-dark">Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-1">
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

              <div className="form-floating mb-1">
                <input
                  type="email"
                  value={email}
                  className="form-control"
                  id="email"
                  placeholder="name@example.com"
                  disabled
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating mb-1">
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

              <div className="form-floating mb-1">
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

              <div className="form-floating mb-1">
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
                  Update
                </button>
              )}

              {disabled && (
                <button disabled="true" type="submit" className="btn btn-dark">
                  <VscLoading />
                </button>
              )}
            </form>
          </div>
        </ScrollAnimation>
      </AdminDashboard>
    </>
  );
};

export default ManageProfile;
