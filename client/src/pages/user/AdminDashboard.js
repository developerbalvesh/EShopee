import React from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";

const AdminDashboard = ({children=(<><h3>Welcome to Panel</h3></>), title="EShopee | Admin Dashboard"}) => {
  const [auth] = useAuth();
  return (
    <Layout title={title}>
      <div className="container mt-3 pt-3 mb-3 pb-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3">
              <div className="container">
                <div className="row">
                  <div className="col-sm-4 col-xs-4">
                    User name: <strong>{auth?.user?.name}</strong>
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
