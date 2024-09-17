import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceInfo } from "../../../../../services/Order/Allorders.service"; // Adjust the import path as needed
import { useAuth } from "../../../../../Contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./style2.css";



export default function CustomerOrderDetail() {
  const [services, setServices] = useState(null);
  const [arrayservices, setArrayservices] = useState([]);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
   
  console.log(id);
  useEffect(() => {
    const fetchServices = async () => {
      if (employee && employee.employee_token) {
        try {
          const fetchedServices = await getServiceInfo(
            employee.employee_token,
            id
          );
          console.log("Fetched services:", fetchedServices);
          setServices(fetchedServices[0] || {});
          setArrayservices(fetchedServices);
        } catch (err) {
          setError(err.message || "Failed to fetch services");
        }
      }
    };
    fetchServices();
  }, [employee, id]);

     


  return (
    <div>
      <div className="inner-column mt-5">
        <div className="service-listwrapper">
          <p>
            <b>{services?.vehicle_tag}</b>
          </p>
          <h2>Requested Service</h2>
          <div className="inner-column">
            {error ? (
              <p>Error: {error}</p>
            ) : services ? (
              <>
                <div className="services-list">
                  {arrayservices.length > 0 ? (
                    arrayservices.map((service) => (
                      <>
                        <div
                          className="servicelistWrapper row"
                          key={service.service_id}
                        >
                          <div className="seviceWrapper col-8">
                            <i className="fas fa-cogs icon"></i>
                            {/* Add your icon here */}
                            <div>
                              <h6>{service.service_name}</h6>
                              <p>{service.service_description}</p>
                            </div>
                          </div>
                          {/* <div className="col-4 status">In Progress</div> */}
                          <div
                            className="col-4 status"
                            style={{
                              width: "17%", 
                            }}
                          >
                            <span
                              style={{
                                fontSize: "15px",
                                width: "150%",
                                fontWeight: "bold",
                              }}
                              className={
                                service.active_order === 0
                                  ? "statusInProgress"
                                  : "statusCompleted"
                              }
                            >
                              {service.active_order === 0
                                ? "In Progress"
                                : "Completed"}
                            </span>
                          </div>
                        </div>
                      </>
                    ))
                  ) : (
                    <p>No services available.</p>
                  )}
                </div>
                <div className="servicelistWrapper ">
                  <div className="seviceWrapper col-8">
                    <i className="fas fa-cogs icon"></i>
                    <div>
                      <h6>Additional request</h6>
                      <p>
                        {services.additional_request || "No additional request"}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`col-4 status ${
                      services.active_order === 0
                        ? "statusInProgress"
                        : "statusInCompleted"
                    }`}
                    style={{
                      fontSize: "15px",
                      width: "15%",
                      fontWeight: "bold",
                    }}
                  >
                    {services.active_order === 0 ? "In Progress" : "Completed"}
                  </div>
                </div>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
