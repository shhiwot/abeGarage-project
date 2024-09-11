
// import "./ServicesDashboard.css";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
import Services_management from "../../components/Admin/Services_management/Services_management";



function Services_page() {
  return (
    <div className="container-fluid dashboard-container">
      <div className="row">
        <div className="col-md-3 admin-left-side">
          <AdminMenu />
        </div>
        <div className="col-md-9 services-right-side main-content">
         <Services_management/>
        </div>
      </div>
    </div>
  );
}

export default Services_page;
