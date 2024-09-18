import React, { useState, useEffect, Children } from "react";
import { useParams, useNavigate } from "react-router-dom";
import serviceService from "../../../../services/service.service";
import { useAuth } from "../../../../Contexts/AuthContext";
// import  from "../../../../assets/styles/custom.css";
const ServiceEditForm = () => {
  const { id } = useParams(); // Get the service ID from the URL params
  const { employee } = useAuth(); // Get the authenticated employee token
  const [formData, setFormData] = useState({
    service_name: "",
    service_description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        if (employee && employee.employee_token) {
          const result = await serviceService.getServiceById(
            employee.employee_token,
            id
          );
          console.log(result);
          setFormData({
            id: id || "",
            service_name: result.service_name || "",
            service_description: result.service_description || "",
            service_id: result.service_id || "",
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (employee && employee.employee_token) {
        if (!formData.service_name || !formData.service_description || !id) {
          throw new Error("Form data or ID is missing");
        }

      console.log("FormData being sent:", formData);
      console.log("ID:", id);

        const result = await serviceService.updateService(
          employee.employee_token,
          formData
        );
        if (result.status === 200) {
          navigate(`/admin/services`);
        } else {
          throw new Error("Failed to update service data");
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
          <h2>Edit:{formData.service_name}</h2>
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
                        name="service_name"
                        value={formData.service_name}
                        onChange={handleChange}
                        placeholder="Service name"
                        required
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="service_description"
                        value={formData.service_description}
                        onChange={handleChange}
                        placeholder="Service description"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceEditForm;
