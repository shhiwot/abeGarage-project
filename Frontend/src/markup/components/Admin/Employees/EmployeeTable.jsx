// import React from "react";
// import styles from "./Table.module.css"; // Importing CSS module

// const Table = () => {
//   return (
//     <table className={styles.customTable}>
//       <thead>
//         <tr>
//           <th>Active</th>
//           <th>First Name</th>
//           <th>Last Name</th>
//           <th>Email</th>
//           <th>phone</th>
//           <th>Added Date</th>
//           <th>Role</th>
//           <th>Edit/Delete</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Array.from({ length: 5 }, (_, rowIndex) => (
//           <tr key={rowIndex}>
//             {Array.from({ length: 8 }, (_, colIndex) => (
//               <td key={colIndex}>
//                 Row {rowIndex + 1}, Col {colIndex + 1}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default Table;


// Table.jsx
import React, { useEffect, useState } from "react";
import styles from "./Table.module.css";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons from react-icons
import { format } from 'date-fns'; // Import date-fns
import { useNavigate } from "react-router-dom"; // Import useNavigate
const Table = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { employee } = useAuth();
const navigate=useNavigate()
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log("Employee object from AuthContext:", employee);

        if (employee && employee.employee_token) {
          console.log("Using token for API request:", employee.employee_token);

          const result = await employeeService.getAllEmployees(
            employee.employee_token
          );

          console.log("API result:", result);

          if (result.status === "success") {
            setEmployees(result.data);
          } else {
            throw new Error("Failed to fetch employees");
          }
        } 
      } catch (error) {
        console.error("Error fetching employees:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [employee]);

  const handleEdit = (employeeId) => {
    // Implement edit logic here
    console.log("Edit employee with ID:", employeeId);
    // Navigate to the edit page with the employee ID
    navigate(`/admin/employee/edit/${employeeId}`);
  };

  const handleDelete = (employeeId) => {
    // Implement delete logic here
    console.log("Delete employee with ID:", employeeId);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section className="contact-section">
      <div className="contact-title">
        <h2>employees</h2>
      </div>
      <table className={styles.customTable}>
        <thead>
          <tr>
            <th>Active</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Added Date</th>
            <th>Role</th>
            <th>Edit/Delete</th> {/* New header for actions */}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.employee_id}>
              <td className="mr-2">{emp.active_employee ? "yes" : "No"}</td>
              <td className="mr-4">{emp.employee_first_name}</td>
              <td> {emp.employee_last_name}</td>
              <td>{emp.employee_email}</td>
              <td>{emp.employee_phone}</td>

              <td>{format(new Date(emp.added_date), "M-d-yyyy")}</td>

              <td>{emp.company_role_name}</td>
              <td>
                <button
                  onClick={() => handleEdit(emp.employee_id)}
                  className={styles.editButton}
                >
                  <FaEdit /> {/* Edit icon */}
                </button>
                <button
                  onClick={() => handleDelete(emp.employee_id)}
                  className={styles.deleteButton}
                >
                  <FaTrash /> {/* Delete icon */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Table;
