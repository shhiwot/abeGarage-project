import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employeeService from "../../../../../services/employee.service";
import { useAuth } from "../../../../../Contexts/AuthContext";
import classes from "../../EmployeeEditForm/style.module.css";
import {
  getVehicleById,
  updateVehicle,
} from "../../../../../services/Order/order.service";
import "./EditOrder.css";

const EditVehicle = () => {
  const { employee } = useAuth(); // Access employee from authentication context
  const [vehicle, setVehicle] = useState(null);
  const [formData, setFormData] = useState({
    vehicle_mileage: "",
    vehicle_color: "",
    vehicle_tag: "",
    customer_id: "",
    vehicle_id: "",
  });
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      if (employee && employee.employee_token) {
        try {
          const fetchedVehicles = await getVehicleById(
            id,
            employee.employee_token
          );

          // Assuming fetchedVehicles is an array, extract the first item
          const fetchedVehicle = fetchedVehicles[0];

          if (fetchedVehicle) {
            console.log(fetchedVehicle); // Debug: check the structure of fetchedVehicle
            setFormData({
              vehicle_id: fetchedVehicle.vehicle_id || "",
              customer_id: fetchedVehicle.customer_id || "",
              vehicle_mileage: fetchedVehicle.vehicle_mileage || "",
              vehicle_color: fetchedVehicle.vehicle_color || "",
              vehicle_tag: fetchedVehicle.vehicle_tag || "",
            });
          } else {
            setError("No vehicle data found");
          }
        } catch (err) {
          setError(err.message || "Failed to fetch vehicle data");
        }
      } else {
        setError("Authentication required to fetch vehicle data");
      }
    };

    fetchVehicle();
  }, [id, employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (employee && employee.employee_token) {
      console.log(formData);
      console.log(formData);
      try {
        await updateVehicle(employee.employee_token, { id, ...formData });
        navigate("/admin/order"); // Redirect to the vehicles list or another page
      } catch (err) {
        setError(err.message || "Failed to update vehicle");
      }
    } else {
      setError("Authentication required to update vehicle");
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Edit Vehicle</h2>
          <h5>Fill the form below</h5>
        </div>
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_mileage"
                        value={formData.vehicle_mileage}
                        onChange={handleChange}
                        placeholder={
                          formData.vehicle_mileage || "Vehicle Mileage"
                        }
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_color"
                        value={formData.vehicle_color}
                        onChange={handleChange}
                        placeholder={formData.vehicle_color || "Vehicle Color"}
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="vehicle_tag"
                        value={formData.vehicle_tag}
                        onChange={handleChange}
                        placeholder={formData.vehicle_tag || "Vehicle Tag"}
                        required
                      />
                    </div>
                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </form>
                {error && <div className="error">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditVehicle;