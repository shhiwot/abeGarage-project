import React from "react";
// Import the AddNewOrderForm component
import CreateNewOrder from "../../components/Admin/AddNewOrder/CreateNewOrder";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerProfile from "../../components/Admin/AddNewOrder/CustomerProfile/CustomerProfile";


export default function AdminDashboard() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CreateNewOrder />
          </div>
        </div>
      </div>
    </div>
  );
}
