import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <h1>User Panel</h1>
        <div className="list-group">
          <NavLink
            to="/dashboard/user/manage-profile"
            className="list-group-item list-group-item-action"
            aria-current="true"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/manage-order"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
