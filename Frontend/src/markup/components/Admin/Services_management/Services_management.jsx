import React from "react";
import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Icons for edit and delete actions
import serviceService from "../../../../services/service.service"; //to perform API calls related to service data, such as fetching, editing, and deleting employees.
import { useAuth } from "../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// function Services_management(props) {
//   const [services, setServices] = useState([]); //hold an array of service objects fetched from the server
//   const [service_name, setService_name] = useState("");
//   const [service_description, setService_description] = useState("");
//   const [serviceNameError, setNameRequired] = useState("");
//   const [serviceDescriptionError, setDescriptionRequired] = useState("");
//   const [loading, setLoading] = useState(true); //to indicate whether the data is still being fetched
//   const [fetchError, setFetchError] = useState(null); //to hold any error messages that might occur during data fetching or deleting employees.
//   const [successMessage, setSuccessMessage] = useState(""); // to display success messages when actions like deleting an employee are successful.
//   const { employee } = useAuth(); //to get the current authenticated employee's details, including their token.
//   const [serverError, setServerError] = useState("");
//   // const { service_id } = useParams(); // Get the employee ID from the URL params
//   let loggedInEmployeeToken = "";
//   const navigate = useNavigate();
//   if (employee && employee.employee_token) {
//     loggedInEmployeeToken = employee.employee_token;
//   }
//   // to fetch services data from the server.
//   useEffect(() => {
//     const fetchServices = async () => {
//       setLoading(true);
//       try {
//         //Checks if the employee object and employee token exist to ensure that only authenticated users can fetch service data.
//         if (employee && employee.employee_token) {
//           //Calls the getAllServices method from the serviceService with the employee's token to fetch the service data.
//           const result = await serviceService.getAllServices(
//             employee.employee_token
//           );
//           console.log(result);
//           //if the result status is "success" updates the service state with the fetched data.
//           if (result && Array.isArray(result)) {
//             setServices(result);
//             console.log(services);
//           } else {
//             throw new Error("Failed to fetch services");
//           }
//         }
//       } catch (error) {
//         //Sets the error message if there is an issue fetching data.
//         setFetchError(error.message);
//       } finally {
//         //Sets the loading state to false once data fetching is complete, whether successful or not.
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, [employee]);

//   const handleEdit = (service_id) => {
//     //Uses navigate to redirect the user to the edit page for the specified serviceId.
//     navigate(`/admin/service/edit/${service_id}`);
//   };

//   const handleDelete = async (service_id) => {
//     // Confirms with the user if they really want to delete the service.
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       try {
//         if (employee && employee.employee_token) {
//           //Calls the deleteService method from serviceService to delete the service using the provided token and serviceId.
//           await serviceService.deleteService(
//             employee.employee_token,
//             service_id
//           );
//           // Updates the Service state to remove the deleted Service.
//           setServices(services.filter((ser) => ser.id !== service_id));
//           // Set the success message
//           setSuccessMessage("Service has been successfully deleted.");
//           // Clear the success message after 3 seconds
//           setTimeout(() => {
//             setSuccessMessage("");
//           }, 3000); // Adjust the duration as needed
//         }
//       } catch (error) {
//         setFetchError(`Failed to delete service: ${error.message}`);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let valid = true;

//     if (!service_name) {
//       setNameRequired("Service name is required");
//       valid = false;
//     } else {
//       setNameRequired("");
//     }
//     if (!service_description) {
//       setDescriptionRequired("Service description is required");
//       valid = false;
//     } else {
//       setDescriptionRequired("");
//     }

//     if (!valid) {
//       return;
//     }
//     const formData = {
//       service_name,
//       service_description,
//     };

//     try {
//       const response = await serviceService.createService(
//         formData,
//         loggedInEmployeeToken
//       );
//       // Check if the response is a JSON object
//       const data = await response;
//       if (data.error) {
//         setServerError(data.error);
//       } else {
//         setSuccessMessage("Service added successfully!");
//         setServerError("");
//         setTimeout(() => {
//           window.location.href = "/admin/services";
//         }, 2000);
//       }
//     } catch (error) {
//       const resMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       setServerError(resMessage);
//     }
//   };
//   // Render loading state
//   if (loading) {
//     return <p>Loading...</p>;
//   }
//   console.log(services);
//   return (
//     <>
//       {/* Header */}
//       <header className="header">
//         <h4 className="mr-2">Services we provide</h4>
//         <span className="header-line" />
//       </header>
//       <p className="header-description">
//         Bring to the table win-win survival strategies to ensure proactive
//         domination. At the end of the day, going forward, a new normal that has
//         evolved from generation X is on the runway heading towards a streamlined
//         cloud solution.
//       </p>
//       {successMessage && (
//         <div
//           className="success-message"
//           style={{ color: "green", fontSize: "18px" }}
//         >
//           {successMessage}
//         </div>
//       )}
//       {/* Render error message if present */}
//       {fetchError && (
//         <div
//           className="error-message"
//           style={{ color: "red", marginBottom: "20px" }}
//         >
//           Error: {fetchError}
//         </div>
//       )}
//       {/* Services List */}
//       <div className="services-list">
//         {services &&
//           services.map((service, index) => (
//             <div key={index} className="service-item">
//               <h5>{service?.service_name || "No name available"}</h5>
//               <div className="service-actions">
//                 <p>
//                   {service?.service_description || "No description available"}
//                 </p>
//                 <div className="icon ml-4 ">
//                   <button onClick={() => handleEdit(service.id)}>
//                     <FaEdit
//                       className="icon edit-icon "
//                       size={14}
//                       style={{ color: "red" }}
//                     />
//                   </button>
//                   <button onClick={() => handleDelete(service.id)}>
//                     <FaTrash className="icon delete-icon " size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//       {/* Add New Service Form */}
//       <div className="mt-4">
//         <div className="header">
//           <h5 className="mr-2" style={{ fontWeight: "bold" }}>
//             Add a new service
//           </h5>
//           <span className="header2-line" />
//         </div>
//         {serverError && (
//           <div className="validation-error" role="alert">
//             {serverError}
//           </div>
//         )}
//         <form className="add-service-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="service_name"
//             value={service_name}
//             onChange={(event) => setService_name(event.target.value)}
//             placeholder="Service_name"
//           />
//           {serviceNameError && (
//             <div className="validation-error" role="alert">
//               {serviceNameError}
//             </div>
//           )}
//           <textarea
//             type="text"
//             name="service_description"
//             value={service_description}
//             onChange={(event) => setService_description(event.target.value)}
//             placeholder="Service_description"
//           ></textarea>
//           {serviceDescriptionError && (
//             <div className="validation-error" role="alert">
//               {serviceDescriptionError}
//             </div>
//           )}
//           <button type="submit" data-loading-text="Please wait...">
//             ADD SERVICE
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default Services_management;



// src/components/Services_management.js

import ConfirmationModal from "./ConfirmationModal";

// function Services_management(props) {
//   const [services, setServices] = useState([]);
//   const [service_name, setService_name] = useState("");
//   const [service_description, setService_description] = useState("");
//   const [serviceNameError, setNameRequired] = useState("");
//   const [serviceDescriptionError, setDescriptionRequired] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [fetchError, setFetchError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [serviceToDelete, setServiceToDelete] = useState(null);
//   const { employee } = useAuth();
//   const [serverError, setServerError] = useState("");
//   const navigate = useNavigate();

//   let loggedInEmployeeToken = "";
//   if (employee && employee.employee_token) {
//     loggedInEmployeeToken = employee.employee_token;
//   }

//   useEffect(() => {
//     const fetchServices = async () => {
//       setLoading(true);
//       try {
//         if (employee && employee.employee_token) {
//           const result = await serviceService.getAllServices(
//             employee.employee_token
//           );
//           if (result && Array.isArray(result)) {
//             setServices(result);
//           } else {
//             throw new Error("Failed to fetch services");
//           }
//         }
//       } catch (error) {
//         setFetchError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchServices();
//   }, [employee]);

//   const handleEdit = (service_id) => {
//     navigate(`/admin/service/edit/${service_id}`);
//   };

//   const handleDelete = (service_id) => {
//     setServiceToDelete(service_id);
//     setIsModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     if (employee && employee.employee_token) {
//       try {
//         await serviceService.deleteService(employee.employee_token, serviceToDelete);
//         setServices(services.filter((ser) => ser.id !== serviceToDelete));
//         setSuccessMessage("Service has been successfully deleted.");
//         setServiceToDelete(null);
//         setIsModalOpen(false);
//         setTimeout(() => setSuccessMessage(""), 3000);
//       } catch (error) {
//         setFetchError(`Failed to delete service: ${error.message}`);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     let valid = true;

//     if (!service_name) {
//       setNameRequired("Service name is required");
//       valid = false;
//     } else {
//       setNameRequired("");
//     }
//     if (!service_description) {
//       setDescriptionRequired("Service description is required");
//       valid = false;
//     } else {
//       setDescriptionRequired("");
//     }

//     if (!valid) {
//       return;
//     }
//     const formData = {
//       service_name,
//       service_description,
//     };

//     try {
//       const response = await serviceService.createService(
//         formData,
//         loggedInEmployeeToken
//       );
//       const data = await response;
//       if (data.error) {
//         setServerError(data.error);
//       } else {
//         setSuccessMessage("Service added successfully!");
//         setServerError("");
//         setTimeout(() => {
//           window.location.href = "/admin/services";
//         }, 2000);
//       }
//     } catch (error) {
//       const resMessage =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       setServerError(resMessage);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <header className="header">
//         <h4 className="mr-2">Services we provide</h4>
//         <span className="header-line" />
//       </header>
//       <p className="header-description">
//         Bring to the table win-win survival strategies to ensure proactive
//         domination. At the end of the day, going forward, a new normal that has
//         evolved from generation X is on the runway heading towards a streamlined
//         cloud solution.
//       </p>
//       {successMessage && (
//         <div
//           className="success-message"
//           style={{ color: "green", fontSize: "18px" }}
//         >
//           {successMessage}
//         </div>
//       )}
//       {fetchError && (
//         <div
//           className="error-message"
//           style={{ color: "red", marginBottom: "20px" }}
//         >
//           Error: {fetchError}
//         </div>
//       )}
//       <div className="services-list">
//         {services &&
//           services.map((service, index) => (
//             <div key={index} className="service-item">
//               <h5>{service?.service_name || "No name available"}</h5>
//               <div className="service-actions">
//                 <p>
//                   {service?.service_description || "No description available"}
//                 </p>
//                 <div className="icon ml-4 ">
//                   <button onClick={() => handleEdit(service.id)}>
//                     <FaEdit
//                       className="icon edit-icon "
//                       size={14}
//                       style={{ color: "red" }}
//                     />
//                   </button>
//                   <button onClick={() => handleDelete(service.id)}>
//                     <FaTrash className="icon delete-icon " size={14} />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//       <div className="mt-4">
//         <div className="header">
//           <h5 className="mr-2" style={{ fontWeight: "bold" }}>
//             Add a new service
//           </h5>
//           <span className="header2-line" />
//         </div>
//         {serverError && (
//           <div className="validation-error" role="alert">
//             {serverError}
//           </div>
//         )}
//         <form className="add-service-form" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="service_name"
//             value={service_name}
//             onChange={(event) => setService_name(event.target.value)}
//             placeholder="Service_name"
//           />
//           {serviceNameError && (
//             <div className="validation-error" role="alert">
//               {serviceNameError}
//             </div>
//           )}
//           <textarea
//             type="text"
//             name="service_description"
//             value={service_description}
//             onChange={(event) => setService_description(event.target.value)}
//             placeholder="Service_description"
//           ></textarea>
//           {serviceDescriptionError && (
//             <div className="validation-error" role="alert">
//               {serviceDescriptionError}
//             </div>
//           )}
//           <button type="submit" data-loading-text="Please wait...">
//             ADD SERVICE
//           </button>
//         </form>
//       </div>
//       <ConfirmationModal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         onConfirm={confirmDelete}
//         message="Are you sure you want to delete this service?"
//       />
//     </>
//   );
// }

// export default Services_management;







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
                  <button onClick={() => handleEdit(service.id)}>
                    <FaEdit
                      className="icon edit-icon"
                      size={14}
                      style={{ color: "red" }}
                    />
                  </button>
                  <button onClick={() => handleDelete(service.id)}>
                    <FaTrash className="icon delete-icon" size={14} />
                  </button>
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
