import React, { useState, useEffect } from "react";
import AdminDashboard from "../Admin/AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { toast } from "react-toastify";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [auth, setAuth] = useAuth();

  // fetch all orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth?.token]);

  // handle status changes
  const handleChange =async(value, oid)=>{
    try {
      console.log(value, oid)
      const {data} = await axios.put(`/api/v1/auth/order-status/${oid}`,{
        status: value
      })
      toast.success(`Status updated to ${data.order}`)
      fetchOrders();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <AdminDashboard title="EShopee | Manage Orders">
        <ScrollAnimation
          animateIn="fadeInUp"
          duration="0.5"
          animateOut="fadeOut"
        >
          <div className="card text-bg-light mb-3">
            <div className="card-header">My Orders</div>
            <div className="card-body">
              {orders?.map((o, i) => {
                return (
                  <div className="border" key={o._id}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Orders</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          {/* <th>{o?.status}</th> */}
                          <td>
                            <select
                              class="form-select"
                              aria-label="Select Option"
                              value={changeStatus || o?.status}
                              onChange={(e)=>handleChange(e.target.value, o?._id)}
                            >
                              {status.map(s=>(
                                <option value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
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

export default AdminOrders;
