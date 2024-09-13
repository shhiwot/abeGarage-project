import React from 'react'
import { Link } from 'react-router-dom';
export default function Admin() {
  return (
    <div>
      <section class="services-section">
        <div class="auto-container">
          <div class="sec-title style-two">
            <h2>Admin Dashboard</h2>
            <div class="text">
              Welcome to the Admin Dashboard! Here, you'll find all the tools
              and insights you need to manage our garage shop efficiently. From
              tracking service appointments to managing inventory and customer
              records, our dashboard is designed to streamline your workflow and
              help you stay on top of daily operations.
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 service-block-one">
              <div class="inner-box hvr-float-shadow">
                <h5>OPEN FOR ALL</h5>
                <h2>All Orders</h2>
                <a href="#" class="read-more">
                  LIST OF ORDERS +
                </a>
                <div class="icon">
                  <span class="flaticon-gearbox"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 service-block-one">
              <div class="inner-box hvr-float-shadow">
                <h5>OPEN FOR LEADS</h5>
                <h2>New Orders</h2>
                <a href="#" class="read-more">
                  LIST OF ORDERS +
                </a>
                <div class="icon">
                  <span class="flaticon-gearbox"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 service-block-one">
              <div class="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Employees</h2>
                <Link to="/admin/employees" class="read-more">
                  LIST OF ORDERS +
                </Link>
                <div class="icon">
                  <span class="flaticon-brake-disc"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 service-block-one">
              <div class="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Add Employee</h2>
                <Link to="/admin/add-employee" class="read-more">
                  Read More +
                </Link>
                <div class="icon">
                  <span class="flaticon-tire"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 service-block-one">
              <div class="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Add Customer</h2>
                <Link to="/admin/add-customer" class="read-more">
                  Read More +
                </Link>
                <div class="icon">
                  <span class="flaticon-tire"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 service-block-one">
              <div class="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Customers</h2>
                <Link to="/admin/customers" class="read-more">
                  List of Customers +
                </Link>
                <div class="icon">
                  <span class="flaticon-spray-gun"></span>
                </div>
              </div>
            </div>
            <div class="col-lg-4 service-block-one">
              <div class="inner-box hvr-float-shadow">
                <h5>OPEN FOR ADMINS</h5>
                <h2>Services</h2>
                <Link to="/admin/services" class="read-more">
                  LIST OF Service +
                </Link>
                <div class="icon">
                  <span class="flaticon-spray-gun"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
