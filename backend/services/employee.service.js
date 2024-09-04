// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid"); // Use uuid for unique IDs

// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}
// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a unique string ID
    const employee_id = uuidv4().toUpperCase();

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    // Insert the email into the employee table with the generated ID
    const query =
      "INSERT INTO employee (employee_id, employee_email, active_employee) VALUES (?, ?, ?)";
    const rows = await conn.query(query, [
      employee_id,
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);

    if (rows.affectedRows !== 1) {
      return false;
    }

    // Insert the remaining data into the other tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    await conn.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);

    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    await conn.query(query3, [employee_id, hashedPassword]);

    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    await conn.query(query4, [employee_id, employee.company_role_id]);

    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  return createdEmployee;
}

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
// A function to get all employees
async function getAllEmployees() {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const rows = await conn.query(query);
  return rows;}





async function deleteEmployee(id) {
  try {
    // Check if employee exists by ID
    const [employee] = await conn.query(
      "SELECT employee_email FROM employee WHERE employee_id = ?",
      [id]
    );

    if (employee.length === 0) {
      return { status: 404, message: "Employee not found" };
    }

    // Delete employee from related tables
    await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [id]);

    await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [id]);

    await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [id]);

    await conn.query("DELETE FROM employee WHERE employee_id = ?", [id]);

    return { status: 200, message: "Employee deleted successfully" };
  } catch (error) {
    console.error("Error in deleteEmployee service:", error);
    return { status: 500, message: "Internal server error" };
  }
}

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  deleteEmployee,
};


