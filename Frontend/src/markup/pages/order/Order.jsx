import React from 'react'
import AdminMenu from '../../../markup/components/Admin/AdminMenu/AdminMenu';
import Order from '../../../markup/components/Admin/Order/Order';
export default function OrderPeg() {
  return (
    <div>
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <Order />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
