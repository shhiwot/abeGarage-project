import React from "react";
// Import the AddEmployeeForm component
import AddCustomerForm from "../../components/Admin/AddCustomerForm/AddCustomerForm.jsx";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu.jsx";
// import the auth hook context
import { useAuth } from "../../../Contexts/AuthContext.jsx";
// import the login component
import LoginForm from "../../components/LoginForm1/LoginForm.jsx";
import { Link } from "react-router-dom";

function AddEmployee(props) {
  const { isLogged, isAdmin } = useAuth();
  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <AddCustomerForm />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="not-found-container">
          <div class="not-found-content">
            <h2>
              {" "}
              You don't have the Permission to access the page you request!
            </h2>
            <Link class="back-home-link" to="/">
              <span> Back to Home</span>
            </Link>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default AddEmployee;
