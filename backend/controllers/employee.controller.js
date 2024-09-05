
// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
  // console.log(req.headers);

  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          status: "true",
          employee_id: employee.employee_id,
          message: "Employee added successfully",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    })}};




async function getEmployeeByIdController(req, res, next) {
  const id = req.params.employee_id;
  console.log(id);

  try {
    const result = await employeeService.getEmployeeFromDb(id); // Call the DB function

    if (result.status === 404) {
      return res.status(404).json({ message: result.message });
    }

    res.status(200).json({ data: result.data });
  } catch (err) {
    console.error("Error fetching employee:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


async function updateEmployee(req, res) {
 const id = req.params.employee_id;
  const employeeData = req.body;
  console.log(employeeData);
  

  try {
  const result = await employeeService.updateEmployee(id, employeeData);
    res
      .status(result.status)
      .json({ status: result.status, message: result.message });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// Export the createEmployee controller 

//Delete Employee
async function deleteEmployee(req, res) {
  const id = req.params.employee_id;

  try {
    const result = await employeeService.deleteEmployee(id);
    res
      .status(result.status)
      .json({ status: result.status, message: result.message });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Export the createEmployee controller
module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeByIdController,
  updateEmployee,
  deleteEmployee,
};
