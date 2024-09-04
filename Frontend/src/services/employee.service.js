// Import from the env
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  console.log("Using token for API request:", token); // Debug log

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(`${api_url}/api/employees`, requestOptions);

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();
    console.log(data);
    // Check the status of the returned data
    if (data.status !== "success") {
      throw new Error(
        "Failed to fetch employees: " + (data.message || "Unknown error")
      );
    }

    return data; // Return the data to be used by the calling code
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};


// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
};
export default employeeService;
