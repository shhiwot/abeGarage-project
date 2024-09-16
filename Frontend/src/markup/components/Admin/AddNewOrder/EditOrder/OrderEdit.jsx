
import React, { useEffect, useState } from "react";
import { getAllServices } from "../../../../../services/Order/order.service"; // Adjust the import path as needed
import { useAuth } from "../../../../../Contexts/AuthContext";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import "../CoustmerOrder/style.css";
// Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import "../CoustmerOrder/style.css";
import { createOrder } from "../../../../../services/Order/order.service";
import PreOrderService from "./PreOrderService1";
import "./EditOrder.css";
export default function OrderEdit() {                                             
 const {employee}=useAuth();
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);
    const [servicePrices, setServicePrices] = useState({});
    const [orderDescription, setOrderDescription] = useState("");
    const [additionalRequest, setAdditionalRequest] = useState("");
    const [price, setPrice] = useState(""); // Additional price input
    const [totalPrice, setTotalPrice] = useState(0); // State to handle total price
    const [formError, setFormError] = useState(null); // State to handle form validation errors
    const navigate = useNavigate();
const {id}=useParams()
console.log(id);
    useEffect(() => {
      const fetchServices = async () => {
        if (employee && employee.employee_token) {
          try {
            const fetchedServices = await getAllServices(
              employee.employee_token
            );
            const prices = fetchedServices.reduce((acc, service) => {
              acc[service.service_id] = parseFloat(service.service_price) || 0;
              return acc;
            }, {});
            setServices(fetchedServices);
            setServicePrices(prices);


          } catch (err) {
            setError(err.message || "Failed to fetch services");
          }
        }
      };

      fetchServices();
    }, [employee]);

    useEffect(() => {
      // Calculate total price whenever selected services or additional price changes
      const calculatedTotalPrice = selectedServiceIds.reduce(
        (total, serviceId) => total + (servicePrices[serviceId] || 0),
        0
      );

      // Ensure price is a number before adding
      const additionalPrice = parseFloat(price) || 0;
      setTotalPrice(calculatedTotalPrice + additionalPrice);
    }, [selectedServiceIds, servicePrices, price]);

    const handleServiceChange = (event) => {
      const serviceId = parseInt(
        event.target.id.replace("service-checkbox-", ""),
        10
      );
      setSelectedServiceIds((prev) =>
        event.target.checked
          ? [...prev, serviceId]
          : prev.filter((id) => id !== serviceId)
      );
    };

    const handlePriceChange = (event) => {
      setPrice(event.target.value);
    };

    const validateForm = () => {
      if (selectedServiceIds.length === 0) {
        setFormError("Please select at least one service.");
        return false;
      }
      if (isNaN(totalPrice) || totalPrice <= 0) {
        setFormError("Total price must be greater than zero.");
        return false;
      }
      if (!orderDescription.trim()) {
        setFormError("Order description is required.");
        return false;
      }
      setFormError(null);
      return true;
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!validateForm()) {
        return; // Stop submission if validation fails
      }

      const data = {
        customer_id: customerId,
        employee_id: employee.employee_id,
        vehicle_id: vehicleId,
        service_id:
          selectedServiceIds.length > 0 ? selectedServiceIds[0] : null,
        estimated_completion_date: new Date().toISOString(),
        completion_date: "",
        order_description: orderDescription,
        order_completed: 0,
        order_services: selectedServiceIds.join(","),
        additional_request: additionalRequest,
        order_total_price: totalPrice,
      };

      try {
        const result = await createOrder(data, employee.employee_token);
        navigate(`/admin/order/${result.data}`); // Adjust navigation based on actual order ID if available
      } catch (err) {
        setError(err.message || "Failed to create order");
      }
    };

    return (
      <>
        <PreOrderService />
        {/* <div className="choose-service">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="content">
                <h2>Choose Service</h2>
              </div>
              {error && <p className="error">{error}</p>}
              <div className="service-list-container">
                {services.length > 0 ? (
                  services.map((service) => (
                    <div className="service-item" key={service.service_id}>
                      <div className="service-info">
                        <h6 className="service-name">{service.service_name}</h6>
                        <p className="service-description">
                          {service.service_description}
                        </p>
                        <p className="service-price">
                          Price: ${parseFloat(service.service_price).toFixed(2)}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        className="service-checkbox"
                        id={`service-checkbox-${service.service_id}`}
                        onChange={handleServiceChange}
                      />
                    </div>
                  ))
                ) : (
                  <p>No services available.</p>
                )}
              </div>
            </div>
            <div className="inner-column mt-5">
              <div className="contact-form display pt-5">
                <div className="auto-container m-0">
                  <div className="contact-title" style={{ top: "0px" }}>
                    <h2 className="mb-2 mt-3">Additional Request</h2>
                  </div>
                  <form style={{ marginTop: "20px" }} onSubmit={handleSubmit}>
                    {formError && <p className="form-error">{formError}</p>}
                    <div className="row clearfix">
                      <div className="form-group col-md-12">
                        <textarea
                          value={orderDescription}
                          onChange={(event) =>
                            setOrderDescription(event.target.value)
                          }
                          placeholder="Order Description"
                          rows="4"
                          style={{ width: "100%" }}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <textarea
                          value={additionalRequest}
                          onChange={(event) =>
                            setAdditionalRequest(event.target.value)
                          }
                          placeholder="Additional Request"
                          rows="4"
                          style={{ width: "100%" }}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          value={price}
                          onChange={handlePriceChange}
                          placeholder="Enter additional price (optional)"
                          style={{ width: "100%" }}
                          className="form-control"
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <p className="total-price">
                          <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
                        </p>
                      </div>

                      <div className="form-group col-md-12">
                        <button
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>SUBMIT ORDER</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </>
    );
}
