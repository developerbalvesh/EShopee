import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = ({
  children = (
    <>
      <div className="card">
        <div className="card-header text-left">Alert!</div>
        <div className="card-body">
          <h5 className="card-title text-center">Welcome to Admin Panel</h5>
          <p className="card-text text-center">
            Here you can manage Category, Products, and Users.
          </p>
        </div>
      </div>
    </>
  ),
  title = "EShopee | Admin Dashboard",
}) => {
  const [auth] = useAuth();
  return (
    <Layout title={title}>
      <div className="container mt-3 pt-3 mb-3 pb-3 animate__animated animate__fadeIn">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div
              className="card p-3"
              style={{ position: "sticky", top: "61px", zIndex: 1 }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-sm-4 col-xs-4">
                    Admin name: <strong>{auth?.user?.name}</strong>
                  </div>
                  <div className="col-sm-4 col-xs-4">
                    Email: <strong> {auth?.user?.email}</strong>
                  </div>
                  <div className="col-sm-4 col-xs-4">
                    Phone: <strong>{auth?.user?.phone}</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2" mt-2>
              {children}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
