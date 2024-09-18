import React from "react";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for edit and delete actions
import serviceService from "../../../../services/service.service"; //to perform API calls related to service data, such as fetching, editing, and deleting employees.
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Services_management.css"
import ConfirmationModal from "./ConfirmationModal";


function Services_management(props) {
  const [services, setServices] = useState([]);
  const [service_name, setService_name] = useState("");
  const [service_description, setService_description] = useState("");
  const [service_price, setService_price] = useState(""); // New state for price
  const [serviceNameError, setNameRequired] = useState("");
  const [serviceDescriptionError, setDescriptionRequired] = useState("");
  const [servicePriceError, setServicePriceError] = useState(""); // New state for price error
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const { employee } = useAuth();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  let loggedInEmployeeToken = "";
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        if (employee && employee.employee_token) {
          const result = await serviceService.getAllServices(
            employee.employee_token
          );
          if (result && Array.isArray(result)) {
            setServices(result);
          } else {
            throw new Error("Failed to fetch services");
          }
        }
      } catch (error) {
        setFetchError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [employee]);

  const handleEdit = (service_id) => {
    navigate(`/admin/service/edit/${service_id}`);
  };

  const handleDelete = (service_id) => {
    setServiceToDelete(service_id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (employee && employee.employee_token) {
      try {
        await serviceService.deleteService(
          employee.employee_token,
          serviceToDelete
        );
        setServices(services.filter((ser) => ser.id !== serviceToDelete));
        setSuccessMessage("Service has been successfully deleted.");
        setServiceToDelete(null);
        setIsModalOpen(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        setFetchError(`Failed to delete service: ${error.message}`);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    if (!service_name) {
      setNameRequired("Service name is required");
      valid = false;
    } else {
      setNameRequired("");
    }
    if (!service_description) {
      setDescriptionRequired("Service description is required");
      valid = false;
    } else {
      setDescriptionRequired("");
    }
    if (!service_price) {
      setServicePriceError("Service price is required");
      valid = false;
    } else {
      setServicePriceError("");
    }

    if (!valid) {
      return;
    }

    const formData = {
      service_name,
      service_description,
      service_price, // Include price in the form data
    };

    try {
      const response = await serviceService.createService(
        formData,
        loggedInEmployeeToken
      );
      const data = await response;
      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccessMessage("Service added successfully!");
        setServerError("");
        setTimeout(() => {
          window.location.href = "/admin/services";
        }, 2000);
      }
    } catch (error) {
      const resMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      setServerError(resMessage);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <header className="header">
        <h4 className="mr-2">Services we provide</h4>
        <span className="header-line" />
      </header>
      <p className="header-description">
        Bring to the table win-win survival strategies to ensure proactive
        domination. At the end of the day, going forward, a new normal that has
        evolved from generation X is on the runway heading towards a streamlined
        cloud solution.
      </p>
      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", fontSize: "18px" }}
        >
          {successMessage}
        </div>
      )}
      {fetchError && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "20px" }}
        >
          Error: {fetchError}
        </div>
      )}
      <div className="services-list">
        {services &&
          services.map((service, index) => (
            <div key={index} className="service-item">
              <h5>{service?.service_name || "No name available"}</h5>
              <div className="service-actions">
                <p>
                  {service?.service_description || "No description available"}
                  <br />
                  {service?.service_price
                    ? `Price: $${service.service_price}`
                    : "No price available"}
                </p>
                <div className="icon ml-4">
                  <FaEdit
                    onClick={() => handleEdit(service.id)}
                    className="icon edit-icon"
                    size={14}
                    style={{ color: "red" }}
                  />

                  <FaTrash
                    onClick={() => handleDelete(service.id)}
                    className="icon delete-icon"
                    size={14}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4">
        <div className="header">
          <h5 className="mr-2" style={{ fontWeight: "bold" }}>
            Add a new service
          </h5>
          <span className="header2-line" />
        </div>
        {serverError && (
          <div className="validation-error" role="alert">
            {serverError}
          </div>
        )}
        <form className="add-service-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="service_name"
            value={service_name}
            onChange={(event) => setService_name(event.target.value)}
            placeholder="Service Name"
          />
          {serviceNameError && (
            <div className="validation-error" role="alert">
              {serviceNameError}
            </div>
          )}
          <textarea
            className="service-description"
            type="text"
            name="service_description"
            value={service_description}
            onChange={(event) => setService_description(event.target.value)}
            placeholder="Service Description"
          ></textarea>
          {serviceDescriptionError && (
            <div className="validation-error" role="alert">
              {serviceDescriptionError}
            </div>
          )}
          <input
            type="text"
            name="service_price"
            value={service_price}
            onChange={(event) => setService_price(event.target.value)}
            placeholder="Service Price"
          />
          {servicePriceError && (
            <div className="validation-error" role="alert">
              {servicePriceError}
            </div>
          )}
          <button type="submit" data-loading-text="Please wait...">
            ADD SERVICE
          </button>
        </form>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        message="Are you sure you want to delete this service?"
      />
    </>
  );
}

export default Services_management;
