import React from "react";
// Import the AddEmployeeForm component
import EmployeesTable from "../../components/Admin/Employees/EmployeeTable"
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

function Employees(props) {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side ">
            <EmployeesTable className="pl-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Employees;
