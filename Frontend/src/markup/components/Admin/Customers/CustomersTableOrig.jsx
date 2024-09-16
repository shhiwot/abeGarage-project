// // My ting to add search functionality *******
import React, { useEffect, useState } from "react";
import classesCustomer from "./customersTable.module.css";
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
  const [customers, setCustomers] = useState([]); // Customers array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const { employee } = useAuth();
  const navigate = useNavigate();
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10; // Adjust this value as needed

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        if (employee && employee.employee_token) {
          const resultCustomer = await customerService?.getAllCustomers(
            employee.employee_token
          );
          if (resultCustomer) {
            setCustomers(resultCustomer.customers || []);
          } else {
            throw new Error("Failed to fetch customers");
          }
        }
      } catch (error) {
        setError(error.message);
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

  // Search and Filter logic
  const filteredCustomers = customers.filter((customer) => {
    return (
      customer.customer_first_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.customer_last_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.customer_email
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.customer_phone_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  });

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
    <section className="contact-section" style={{ paddingTop: "0" }}>
      <div className="contact-title" style={{ marginBottom: "50px" }}>
        <h2>Customers</h2>
        <div className={`${classesCustomer.searchContainer} container-fluid`}>
          <input
            type="text"
            className={classesCustomer.searchInput}
            placeholder="Search for a customer using first name, last name, email, or phone number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
          />
          {/* Place the icon inside the search bar */}
          <FaSearch className={classesCustomer.searchIcon} />
        </div>
      </div>

      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", marginBottom: "20px", fontSize: "20px" }}
        >
          {successMessage}
        </div>
      )}
      {error && (
        <div
          className="error-message"
          style={{ color: "red", marginBottom: "20px" }}
        >
          Error: {error}
        </div>
      )}

      {/* Display message if no customers */}
      {filteredCustomers.length === 0 ? (
        <div>No customers found</div>
      ) : (
        <div className="container-fluid">
          <table className={classesCustomer.customTable}>
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
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{customer.customer_id}</td>
                  <td>{customer.customer_first_name}</td>
                  <td>{customer.customer_last_name}</td>
                  <td>{customer.customer_email}</td>
                  <td>{customer.customer_phone_number}</td>
                  <td>
                    {format(
                      new Date(customer.customer_added_date),
                      "MM-dd-yyyy | HH:mm"
                    )}
                  </td>
                  <td>{customer.active_customer_status ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(customer.id)}
                      className={classesCustomer.editButton}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleProfile(customer.id)}
                      className={classesCustomer.viewButton}
                    >
                      <FaArrowUpRightFromSquare />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className={classesCustomer.paginationContainer}>
            <button
              className={classesCustomer.paginationButton}
              onClick={handleFirstPage}
              disabled={currentPage === 1}
            >
              <FaAngleDoubleLeft />
              First
            </button>
            <button
              className={classesCustomer.paginationButton}
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              <FaAngleLeft />
              Previous
            </button>
            <button
              className={classesCustomer.paginationButton}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <FaAngleRight />
            </button>
            <button
              className={classesCustomer.paginationButton}
              onClick={handleLastPage}
              disabled={currentPage === totalPages}
            >
              Last
              <FaAngleDoubleRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Table;
