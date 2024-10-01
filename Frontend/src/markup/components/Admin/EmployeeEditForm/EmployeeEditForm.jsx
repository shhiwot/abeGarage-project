import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import classes from "./style.module.css";
const EditEmployee = () => {
  const { employee_id } = useParams(); // Get the employee ID from the URL params
  const { employee } = useAuth(); // Get the authenticated employee token
  const [formData, setFormData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_email: "",
    employee_phone: "",
    employee_password: "", // Added for password update
    active_employee: false, // Default to false
    company_role_id: "", // Default to empty or set a valid value
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        if (employee && employee.employee_token) {
          const result = await employeeService.getEmployeeById(
            employee.employee_token,
            employee_id
          );
          setFormData({
            employee_first_name: result.employee_first_name || "",
            employee_last_name: result.employee_last_name || "",
            employee_email: result.employee_email || "",
            employee_phone: result.employee_phone || "",
            employee_password: "", // Reset password field
            active_employee: result.active_employee || false,
            company_role_id: result.company_role_id || "",
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [employee, employee_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee && employee.employee_token) {
        const result = await employeeService.updateEmployee(
          employee.employee_token,
          employee_id,
          formData
        );
        if (result.status === 200) {
          navigate(`/admin/employees`);
        } else {
          throw new Error("Failed to update employee data");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>
            Edit:{formData.employee_first_name} {formData.employee_last_name}
          </h2>
          <h5>Employee email:{formData.employee_email} </h5>
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
                        name="employee_first_name"
                        value={formData.employee_first_name}
                        onChange={handleChange}
                        placeholder="Employee first name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_last_name"
                        value={formData.employee_last_name}
                        onChange={handleChange}
                        placeholder="Employee last name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="employee_phone"
                        value={formData.employee_phone}
                        onChange={handleChange}
                        placeholder="Employee phone (555-555-5555)"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <select
                        name="company_role_id"
                        value={formData.company_role_id}
                        onChange={handleChange}
                        className="custom-select-box"
                      >
                        <option value="1">Employee</option>
                        <option value="2">Manager</option>
                        <option value="3">Admin</option>
                      </select>
                    </div>

                    <div className="form-group col-md-12">
                      <label className={classes.checkbox}>
                        <input
                          type="checkbox"
                          name="active_employee"
                          checked={formData.active_employee}
                          onChange={handleChange}
                        />
                        is active employee
                      </label>
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                        style={{ width: "65%", height: "65%" }}
                      >
                        <span>Update</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditEmployee;
