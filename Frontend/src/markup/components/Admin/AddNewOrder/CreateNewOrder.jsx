import React, { useState, useEffect, useRef } from "react";
import "./style.css"; // Import the CSS file
import { useAuth } from "../../../../Contexts/AuthContext";
import { getAllCustomers } from "../../../../services/Order/order.service"; // Import the service function
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa"; // Import FaUser for the profile icon

export default function CreateNewOrder() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { employee } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCustomers() {
      if (employee && employee.employee_token) {
        try {
          const data = await getAllCustomers(employee.employee_token);

          if (data.customers) {
            setCustomers(data.customers || []);
          } else {
            console.error("Failed to fetch customers:", data.message);
          }
        } catch (error) {
          console.error("Error fetching customer data:", error);
        }
      }
    }
    fetchCustomers();
  }, [employee]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setDropdownVisible(true);
      const filtered = customers.filter((customer) => {
        const firstName = customer.customer_first_name || "";
        const lastName = customer.customer_last_name || "";
        const email = customer.customer_email || "";
        const phoneNumber = customer.customer_phone_number || "";

        return (
          firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          phoneNumber.includes(searchTerm)
        );
      });
      setFilteredCustomers(filtered);
    } else {
      setDropdownVisible(false);
      setFilteredCustomers([]);
    }
  }, [searchTerm, customers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCustomerSelect = (customer) => {
    setSearchTerm(
      `${customer.customer_first_name} ${customer.customer_last_name}`
    );
    setDropdownVisible(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileRedirect = (Id) => {
    navigate(`/admin/customer/order/${Id}`);
  };

  return (
    <section className="contact-section section-Wrapper outer-container">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Create new order</h2>
        </div>
        <div>
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div>
                <div className="col-md-12">
                  <div className="search-box-container" ref={dropdownRef}>
                    <div className="search-input-wrapper">
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search for customers using first name, last name, email address, or phone number"
                      />
                      {/* <button className="search-icon">
                        <FaSearch />
                      </button> */}
                    </div>
                    {dropdownVisible && filteredCustomers.length > 0 && (
                      <div className="dropdown">
                        <table className="dropdown-table">
                          <thead>
                            <tr>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Email</th>
                              <th>Phone Number</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCustomers.map((customer) => (
                              <tr key={customer.customer_id}>
                                <td>{customer.customer_first_name}</td>
                                <td>{customer.customer_last_name}</td>
                                <td>{customer.customer_email}</td>
                                <td>{customer.customer_phone_number}</td>
                                <td>
                                  <button
                                    className="profile-icon"
                                    onClick={() =>
                                      handleProfileRedirect(customer.id)
                                    }
                                  >
                                    <FaUser />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <button
                    className="theme-btn btn-style-one"
                    type="submit"
                    data-loading-text="Please wait..."
                  >
                    <span>ADD NEW CUSTOMER</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// import React, { useState, useEffect, useRef } from "react";
// import "./style.css";
// import { useAuth } from "../../../../Contexts/AuthContext";
// import { getAllCustomers } from "../../../../services/order.service";
// import { useNavigate } from "react-router-dom";
// import { FaSearch, FaUser } from "react-icons/fa";

// export default function CreateNewOrder() {
//   const [customers, setCustomers] = useState([]);
//   const [filteredCustomers, setFilteredCustomers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const dropdownRef = useRef(null);
//   const { employee } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchCustomers() {
//       if (employee && employee.employee_token) {
//         try {
//           const data = await getAllCustomers(employee.employee_token);
//           console.log("Fetched customers:", data); // Debugging log
//           if (data.customers) {
//             setCustomers(data.customers || []);
//           } else {
//             console.error("Failed to fetch customers:", data.message);
//           }
//         } catch (error) {
//           console.error("Error fetching customer data:", error);
//         }
//       }
//     }
//     fetchCustomers();
//   }, [employee]);

//   useEffect(() => {
//     if (searchTerm.length > 0) {
//       setDropdownVisible(true);
//       const filtered = customers.filter((customer) => {
//         const firstName = customer.customer_first_name || "";
//         const lastName = customer.customer_last_name || "";
//         const email = customer.customer_email || "";
//         const phoneNumber = customer.customer_phone_number || "";

//         return (
//           firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           phoneNumber.includes(searchTerm)
//         );
//       });
//       setFilteredCustomers(filtered);
//       console.log("Filtered customers:", filtered); // Debugging log
//     } else {
//       setDropdownVisible(false);
//       setFilteredCustomers([]);
//     }
//   }, [searchTerm, customers]);

//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     console.log("Search term changed:", event.target.value); // Debugging log
//   };

//   const handleCustomerSelect = (customer) => {
//     setSearchTerm(
//       `${customer.customer_first_name} ${customer.customer_last_name}`
//     );
//     setDropdownVisible(false);
//     console.log("Customer selected:", customer); // Debugging log
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setDropdownVisible(false);
//       console.log("Clicked outside"); // Debugging log
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleProfileRedirect = (Id) => {
//     navigate(`/admin/customer/order/${Id}`);
//   };

//   return (
//     <section className="contact-section">
//       <div className="auto-container">
//         <div className="contact-title">
//           <h2>Create new order</h2>
//         </div>
//         <div>
//           <div className="form-column col-lg-7">
//             <div className="inner-column">
//               <div>
//                 <div className="col-md-12">
//                   <div className="search-box-container" ref={dropdownRef}>
//                     <div className="search-input-wrapper">
//                       <input
//                         type="text"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         placeholder="Search for customers using first name, last name, email address, or phone number"
//                       />
//                       <button className="search-icon">
//                         <FaSearch />
//                       </button>
//                     </div>
//                     {dropdownVisible && filteredCustomers.length > 0 && (
//                       <div className="dropdown">
//                         <table className="dropdown-table">
//                           <thead>
//                             <tr>
//                               <th>First Name</th>
//                               <th>Last Name</th>
//                               <th>Email</th>
//                               <th>Phone Number</th>
//                               <th>Action</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {filteredCustomers.map((customer) => (
//                               <tr key={customer.customer_id}>
//                                 <td>{customer.customer_first_name}</td>
//                                 <td>{customer.customer_last_name}</td>
//                                 <td>{customer.customer_email}</td>
//                                 <td>{customer.customer_phone_number}</td>
//                                 <td>
//                                   <button
//                                     className="profile-icon"
//                                     onClick={() =>
//                                       handleProfileRedirect(
//                                         customer.customer_id
//                                       )
//                                     }
//                                   >
//                                     <FaUser />
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     className="theme-btn btn-style-one"
//                     type="submit"
//                     data-loading-text="Please wait..."
//                   >
//                     <span>ADD NEW CUSTOMER</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
