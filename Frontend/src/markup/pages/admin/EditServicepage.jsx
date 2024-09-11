import React from 'react'
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import ServiceEditForm from "../../components/Admin/ServiceEditForm/ServiceEditForm";

function EditServicepage() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <ServiceEditForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditServicepage