import React from "react";
// Import the AddEmployeeForm component

// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import EditEmployee from "../../components/Admin/EmployeeEditForm/EmployeeEditForm";
import Order from "../../components/Admin/AddNewOrder/EditOrder/PreOrderService1";
function EditOrder(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            < Order/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditOrder;
