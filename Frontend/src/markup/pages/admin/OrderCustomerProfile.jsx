import React from "react";
// Import the AddEmployeeForm component
import AddEmployeeForm from "../../components/Admin/AddEmployeeForm/AddEmployeeForm";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import CustomerProfile from "../../components/Admin/AddNewOrder/CustomerProfile/CustomerProfile";

function orderCustomerProfile(params) {

  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerProfile/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default orderCustomerProfile;
