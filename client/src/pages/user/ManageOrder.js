import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminDashboard from "./AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth?.token]);
  return (
    <>
      <AdminDashboard title="EShopee | Create Product">
        <ScrollAnimation
          animateIn="fadeInUp"
          duration="0.5"
          animateOut="fadeOut"
        >
          <div className="card text-bg-light mb-3">
            <div className="card-header">Your Orders</div>
            <div className="card-body">
              {orders?.map((o, i) => {
                return (
                  <div className="border" key={o._id}>
                    <table className="table">
                      <thead>
                        <tr>
                          <td scope="col">#</td>
                          <td scope="col">Status</td>
                          <td scope="col">Buyer</td>
                          <td scope="col">Orders</td>
                          <td scope="col">Payment</td>
                          <td scope="col">Quantity</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{i + 1}</th>
                          <th>{o?.status}</th>
                          <th>{o?.buyer?.name}</th>
                          <th>{moment(o?.createdAt).fromNow()}</th>
                          <th>{o?.payment.success ? "Success" : "Failed"}</th>
                          <th>{o?.products?.length}</th>
                        </tr>
                      </tbody>
                    </table>
                    <div>
                      {o.products.map((p) => (
                        <div
                          key={`${p._id}${i++}`}
                          className="p-2 m-2 border rounded"
                        >
                          <div className="row">
                            <div className="col-md-6 text-center">
                              <img
                                style={{
                                  height: "100px",
                                  width: "100%",
                                  objectFit: "contain",
                                }}
                                src={`/api/v1/product/product-photo/${p._id}`}
                                alt="img"
                              />
                            </div>
                            <div className="col-md-6">
                              <div
                                className="d-flex flex-column align-self-center justify-content-center"
                                style={{ height: "100%" }}
                              >
                                <h4>{p.name}</h4>
                                <h5>Rs. {p.price}</h5>
                                <p>{p.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollAnimation>
      </AdminDashboard>
    </>
  );
};

export default ManageOrder;
