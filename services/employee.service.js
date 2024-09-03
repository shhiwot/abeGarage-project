// Import the query function from the db.config.js file 
const conn = require("../config/db.config");
// Import the bcrypt module 
const bcrypt = require('bcrypt');



// A function to update an existing employee
async function updateEmployee(id, employeeData) {
  const {
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_email,
    employee_password, // Ensure this matches the name in request body
    active_employee,
    company_role_id,
  } = employeeData;

  try {
    // Check if employee exists by ID
    const [employee] = await conn.query(
      "SELECT employee_email FROM employee WHERE employee_id = ?",
      [id]
    );
    console.log(employee.employee_email);
    if (employee.length===0) {
      return { status: 404, message: "Employee not found" };
    }

    // Encrypt password if provided
    let hashedPassword = null;
    if (employee_password) {
      hashedPassword = await bcrypt.hash(employee_password, 10);
    }

    // Update employee details
    await conn.query(
      "UPDATE employee SET active_employee = ? WHERE employee_id = ?",
      [active_employee, id]
    );

    await conn.query(
      "UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ?",
      [employee_first_name, employee_last_name, employee_phone, id]
    );

    if (hashedPassword) {
      await conn.query(
        "UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?",
        [hashedPassword, id]
      );
    }

    if (company_role_id) {
      await conn.query(
        "UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?",
        [company_role_id, id]
      );
    }

    return { status: 200, message: "Employee updated successfully" };
  } catch (err) {
    console.error("Error in updateEmployee service:", err);
    throw err;
  }
}






// Export the functions for use in the controller
module.exports = {
  updateEmployee,
  
};