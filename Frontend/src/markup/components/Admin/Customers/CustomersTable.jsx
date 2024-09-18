import React, { useEffect, useState } from "react";
import styles from "./customersTable.module.css";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import {
  FaEdit,
  FaSearch,
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa"; // Pagination icons
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Table = () => {
  const [customers, setCustomers] = useState([]); // Ensure customers is an empty array initially
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { employee } = useAuth();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10; // Adjust this value as needed

  // Search state
  const [searchTerm, setSearchTerm] = useState(""); // New state to store the search input

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       if (employee && employee.employee_token) {
  //         const resultCustomer = await customerService?.getAllCustomers(
  //           employee.employee_token
  //         );
  //         if (resultCustomer?.status === "success") {
  //           setCustomers(resultCustomer.customers || []); // Ensure we are setting an array
  //         } else {
  //           throw new Error("Failed to fetch customers");
  //         }
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCustomers();
  // }, [employee]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        if (employee && employee.employee_token) {
          const resultCustomer = await customerService?.getAllCustomers(
            employee.employee_token
          );
          console.log("Fetched customers: ", resultCustomer);

          // Assuming the actual data you need is in resultCustomer.data
          if (Array.isArray(resultCustomer?.customers)) {
            setCustomers(resultCustomer.customers);
          } else {
            console.error("Invalid data format", resultCustomer);
            setCustomers([]); // Set to an empty array if data is not as expected
          }
        }
      } catch (error) {
        setError(error.message || "Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [employee]);

  const handleEdit = (id) => {
    navigate(`/admin/customer-update/${id}`);
  };

  const handleProfile = (id) => {
    navigate(`/admin/customer-profile/${id}`);
  };

  // Filter customers based on the search input
  // const filteredCustomers = customers.filter((customer) =>
  //   [
  //     "customer_first_name",
  //     "customer_last_name",
  //     "customer_email",
  //     "customer_phone_number",
  //   ].some((key) =>
  //     customer[key]?.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );

  const filteredCustomers = Array.isArray(customers)
    ? customers.filter((customer) =>
        [
          "customer_first_name",
          "customer_last_name",
          "customer_email",
          "customer_phone_number",
        ].some((key) =>
          customer[key]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];
  console.log(filteredCustomers.length);
  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const handleFirstPage = () => setCurrentPage(1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => (prev === 1 ? 1 : prev - 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => (prev === totalPages ? totalPages : prev + 1));
  const handleLastPage = () => setCurrentPage(totalPages);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="contact-section">
      <div className="contact-title" style={{ marginBottom: "50px" }}>
        <h2>Customers</h2>
        {/* Search Input */}
        <div className={`${styles.searchContainer} `}>
          <input
            type="text"
            className={`${styles.searchInput} `}
            placeholder="Search for a customer using first name, last name, email, or phone number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          <FaSearch className={`${styles.searchIcon} `} />
        </div>
      </div>

      {successMessage && (
        <div
          className="success-message container-fluid"
          style={{ color: "green", marginBottom: "20px", fontSize: "20px" }}
        >
          {successMessage}
        </div>
      )}
      {error && (
        <div
          className="error-message container-fluid"
          style={{ color: "red", marginBottom: "20px" }}
        >
          Error: {error}
        </div>
      )}

      {/* Display message if no customers */}
      {filteredCustomers.length === 0 ? (
        <div className="container-fluid"> No customers found</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className={`${styles.customTable} table container-fluid`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Active</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody className="table container-fluid">
                {currentCustomers.map((customer) => (
                  <tr key={customer.customer_id}>
                    <td data-label="ID">{customer.customer_id}</td>
                    <td data-label="First Name">
                      {customer.customer_first_name}
                    </td>
                    <td data-label="Last Name">
                      {customer.customer_last_name}
                    </td>
                    <td data-label="Email">{customer.customer_email}</td>
                    <td data-label="Phone">{customer.customer_phone_number}</td>
                    <td data-label="Added Date">
                      {format(
                        new Date(customer.customer_added_date),
                        "MM-dd-yyyy HH:mm"
                      )}
                    </td>
                    <td data-label="Active">
                      {customer.active_customer_status ? "Yes" : "No"}
                    </td>
                    <td data-label="Edit" style={{display:"flex"}}>
                      <button>
                        <FaEdit
                          onClick={() => handleEdit(customer.id)}
                         style={{color:"red"}}
                        />
                      </button>
                      <button>
                        <FaArrowUpRightFromSquare
                          onClick={() => handleProfile(customer.id)}
                          className={styles.viewButton}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className={styles.paginationContainer}>
            <button
              className={styles.paginationButton}
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleDoubleLeft />
              First
            </button>
            <button
              className={styles.paginationButton}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
              Previous
            </button>
            <button
              className={styles.paginationButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <FaAngleRight />
            </button>
            <button
              className={styles.paginationButton}
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              Last
              <FaAngleDoubleRight />
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Table;
