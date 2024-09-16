import React from 'react'
//import CreateNewOrder from '../../../components/Admin/AddNewOrder/CreateNewOrder';
import CoustmerOrder from "../../../components/Admin/AddNewOrder/CoustmerOrder/CoustmerOrder";
import AdminMenu from '../../../components/Admin/AdminMenu/AdminMenu';                        
export default function CoustmerOrderDetail() {
  return (
   
      <div>
        <div className="container-fluid admin-pages">
          <div className="row">
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
            <div className="col-md-9 admin-right-side">
              <CoustmerOrder/>
            </div>
          </div>
        </div>
      </div>
    
  );
}
