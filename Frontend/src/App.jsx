// Import react
import React from "react";
// Import the Routes and Route components from react-router


import Home from "./markup/pages/Home";
// Import the contactus components

import Contact from "./markup/pages/Contact";
// Import the login components
import Login from "./markup/pages/Login";
// My task Start ******************
import AddEmployee from "./markup/pages/admin/AddEmployee.jsx";
// Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute.jsx";
import Unauthorized from "./markup/pages/Unauthorized.jsx";
// My task End ******************
// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";
import { Routes, Route } from "react-router";
import "@fortawesome/fontawesome-free/css/all.min.css";
// Import the custom css file
import "./assets/styles/custom copy.css";
import "./assets/styles/custom.css";

// Import the Header component
import Header from "./markup/components/Header/Header";
// Import the Footer component
import Footer from "./markup/components/Footer/Footer";
import AdminDashboard from "./markup/pages/admin/AdminDashboard.jsx";
import Employees from "./markup/pages/admin/Employees.jsx";
import EditEmployee from "./markup/pages/admin/EditEmployeePege.jsx";
import AboutusPeg from "./markup/pages/AboutPage/AboutUsPeg.jsx";
import Services from "./markup/pages/Services.jsx";
import Services_page from "./markup/pages/admin/Services_page.jsx";
import EditServicepage from "./markup/pages/admin/EditServicepage.jsx";
// About Customer Management Start
import AddCustomer from "./markup/pages/admin/AddCustomer.jsx";
import Customers from "./markup/pages/admin/Customers.jsx";
import EditCustomer from "./markup/pages/admin/EditCustomer.jsx";

import CreateNewOrder from "./markup/pages/admin/CreateNewOrder.jsx";
import CustomerOrderProfile from "./markup/pages/admin/OrderCustomerProfile.jsx";
import VechelDetail from "./markup/pages/admin/VehicelDetailPeg.jsx";
import CustomerOrder from "./markup/components/Admin/AddNewOrder/CoustmerOrder/CoustmerOrder.jsx";
import CustomerOrderDetail from "./markup/pages/order/AddNeworder/CoustmerOrderDetail.jsx";
import Order from "./markup/pages/order/Order.jsx";
import Edit from "./markup/components/Admin/AddNewOrder/EditOrder/EditVechel.jsx";
import EditOrder from "../src/markup/pages//admin/EditOrder.jsx";
import EditVehicle from "./markup/pages/admin/EditVheicle.jsx";
import CustomerProfile from "./markup/components/Admin/CustomerProfile/CustomerProfile.jsx";
// About Customer Management End

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/about" element={<AboutusPeg />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        {/* add admin dashboard Route  */}
        <Route
          path="/admin"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AdminDashboard />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />

        {/* // Add the Employees Route  */}
        <Route
          path="/admin/employees"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Employees />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/employee/edit/:employee_id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/services"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Services_page />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/service/edit/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditServicepage />
            </PrivateAuthRoute>
          }
        />
        {/* Customer Management Start */}
        {/* add customer page route */}
        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        {/* Customers List page route */}
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />

        {/* Edit Customer Page Route */}
        <Route
          // path="/admin/customer/edit/:customer_id"
          path="/admin/customer-update/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        {/* Customer Management End */}
        {/* ************************************************************* */}
        {/* order page start **/}
        <Route
          path="/admin/order"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CreateNewOrder />
            </PrivateAuthRoute>
          }
        />
        {/* // add orderCustomerProfile in order route */}
        <Route
          path="/admin/customer/order/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerOrderProfile />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/customer/vehicle/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <VechelDetail />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/order/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerOrderDetail />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Order />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/order/edit/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditOrder />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/vehicle/edit/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <EditVehicle />
            </PrivateAuthRoute>
          }
        />
        {/* order page end */}
        {/* ************************************************************** */}

        <Route
          path="/admin/customer-profile/:id"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <CustomerProfile />
            </PrivateAuthRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
