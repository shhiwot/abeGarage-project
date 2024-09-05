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
const getEmployeeById = async (token, employee_id) => {
  console.log("Fetching employee ID:", employee_id);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/employee/${employee_id}`,
      requestOptions
    );

    console.log("Response:", response);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    const data = await response.json();

    console.log("Data:", data);

    // Ensure `data` contains `data` field and it is an array with at least one item
    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error(
        `Failed to fetch employee: ${data.message || "Unknown error"}`
      );
    }

    // Return the first item of the array
    return data.data[0];
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};
// Function to update employee data
const updateEmployee = async (token, employee_id, formData) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(
      `${api_url}/employee/${employee_id}`,
      requestOptions
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    const data = await response.json();
console.log(data);
    if (data.status === 200) {
      return data; // Return the data if the update was successful
    } else {
      throw new Error(
        `Failed to update employee: ${data.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

// A function to send delete request to delete an employee
const deleteEmployee = async (token, employee_id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(`${api_url}/employee/${employee_id}`, requestOptions);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    const data = await response.json();
console.log(data);
    if (data.status === 200) {
      return data; // Return the data if the delete was successful
    } else {
      throw new Error(
        `Failed to delete employee: ${data.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
export default employeeService;
