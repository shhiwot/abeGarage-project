// Import the employee service 

//update employee

async function updateEmployee(req, res) {
  const id = req.params.id;
  const employeeData = req.body;
  console.log(employeeData);
  

  try {
  const result = await employeeService.updateEmployee(id, employeeData);
    res.status(result.status).json({ message: result.message });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}


// Export the createEmployee controller 
module.exports = {
  updateEmployee,
};