import React from 'react'
import EditVehicle from '../../components/Admin/AddNewOrder/EditOrder/EditVechel';
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
export default function EditVheicle() {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditVehicle />
          </div>
        </div>
      </div>
    </div>
  );
}
