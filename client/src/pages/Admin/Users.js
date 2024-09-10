import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminDashboard from "./AdminDashboard";
import ScrollAnimation from "react-animate-on-scroll";

const Users = () => {
  return (
    <>
      <AdminDashboard title="EShopee | Manage User">
        <ScrollAnimation animateIn="fadeInUp" duration="0.5" animateOut="fadeOut">
          <div className="card text-bg-light mb-3">
            <div className="card-header">Users</div>
            <div className="card-body">
              <h5 className="card-title">Light card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </AdminDashboard>
    </>
  );
};

export default Users;
