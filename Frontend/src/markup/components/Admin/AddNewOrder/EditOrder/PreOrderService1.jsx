import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceInfo } from "../../../../../services/Order/Allorders.service"; // Adjust the import path as needed
import { useAuth } from "../../../../../Contexts/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updateOrder } from "../../../../../services/Order/order.service";

// import "../style2.css";
import "../CoustmerOrder/style2.css";
import "./EditOrderstyle.css";


import { Modal, Button } from "react-bootstrap"; // Import components for modal

// Import CSS
import "../CoustmerOrder/style2.css";
import "./EditOrderstyle.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap CSS is imported

export default function CustomerOrderDetail() {
  const [services, setServices] = useState(null);
  const [arrayservices, setArrayservices] = useState([]);
  const [error, setError] = useState(null);
  const [serviceStatus, setServiceStatus] = useState({});
  const [additionalRequest, setAdditionalRequest] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const { employee } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchServices = async () => {
      if (employee && employee.employee_token) {
        try {
          const fetchedServices = await getServiceInfo(
            employee.employee_token,
            id
          );
          setServices(fetchedServices[0] || {});
          setArrayservices(fetchedServices);

          const initialStatus = fetchedServices.reduce((acc, service) => {
            acc[service.service_id] =
              service.active_order === 0 ? "In Progress" : "Completed";
            return acc;
          }, {});
          setServiceStatus(initialStatus);

          const requestStatus =
            fetchedServices[0]?.active_order === 0
              ? "In Progress"
              : "Completed";
          setAdditionalRequest(requestStatus);
        } catch (err) {
          setError(`Error fetching service info: ${err.message}`);
        }
      }
    };
    fetchServices();
  }, [employee, id]);

  const handleServiceStatusChange = (serviceId) => {
    setServiceStatus((prevStatus) => {
      const newStatus =
        prevStatus[serviceId] === "In Progress" ? "Completed" : "In Progress";
      return {
        ...prevStatus,
        [serviceId]: newStatus,
      };
    });
  };

  const handleAdditionalRequestChange = () => {
    setAdditionalRequest((prevStatus) =>
      prevStatus === "In Progress" ? "Completed" : "In Progress"
    );
  };

  const handleSaveChanges = async () => {
    try {
      const orderServices = arrayservices.map((service) => ({
        order_service_id: service.order_service_id,
        service_id: service.service_id,
        service_completed:
          serviceStatus[service.service_id] === "Completed" ? 1 : 0,
      }));

      const updatePayload = {
        id,
        employee_id: employee.employee_id,
        order_services: orderServices,
        order_date: new Date().toISOString(),
        order_completed: additionalRequest === "Completed" ? 1 : 0,
      };

      const response = await updateOrder(
        employee.employee_token,
        updatePayload
      );
      setShowModal(true); // Show modal on success
    } catch (err) {
      setError(`Error saving changes: ${err.message}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/admin/orders"); // Navigate after closing modal
  };

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
                      <div
                        className="servicelistWrapper row"
                        key={service.service_id}
                      >
                        <div className="seviceWrapper col-8">
                          <i className="fas fa-cogs icon"></i>
                          <div>
                            <h6>{service.service_name}</h6>
                            <p>{service.service_description}</p>
                          </div>
                        </div>
                        <div className="col-4 status">
                          <label className="custom-checkbox">
                            <input
                              type="checkbox"
                              checked={
                                serviceStatus[service.service_id] ===
                                "Completed"
                              }
                              onChange={() =>
                                handleServiceStatusChange(service.service_id)
                              }
                            />
                            <span className="checkmark" />
                          </label>
                          <label style={{ fontSize: "15px" }}>
                            {serviceStatus[service.service_id] || "In Progress"}
                          </label>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No services available.</p>
                  )}
                </div>
                <div className="servicelistWrapper row">
                  <div className="seviceWrapper col-8">
                    <i className="fas fa-cogs icon"></i>
                    <div>
                      <h6>Additional request</h6>
                      <p>
                        {services.additional_request || "No additional request"}
                      </p>
                    </div>
                  </div>
                  <div className="col-4 status">
                    <label className="custom-checkbox">
                      <input
                        type="checkbox"
                        checked={additionalRequest === "Completed"}
                        onChange={handleAdditionalRequestChange}
                      />
                      <span className="checkmark" />
                    </label>
                    <label style={{ fontSize: "15px" }}>
                      {additionalRequest === "Completed"
                        ? "Completed"
                        : "In Progress"}
                    </label>
                  </div>
                </div>
                <button
                  className="theme-btn btn-style-one mt-3"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Changes have been saved successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

