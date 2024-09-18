
const api_url = import.meta.env.VITE_API_URL;

const createVehicle = async (formData, loggedInEmployeeToken) => {
  console.log(formData, loggedInEmployeeToken);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
    console.log(response);
   
    let data=await response.json();
    console.log(data);
    
    // return response.json();
    return data;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw error;
  }
};


const getAllVehicle = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/vehicles/:customer_id`,
      requestOptions
    );
    // Check if the response status is OK
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    // Parse the JSON data from the response
    const data = await response.json();
    console.log(data);
    // Check the status of the returned data
    if (data && Array.isArray(data) && data.length > 0) {
      console.log("Data fetched successfully:", data);
      return data; // Return the data to be used by the calling code
    } else {
      console.error("No data returned or data is not in expected format.");
      throw new Error(`No service data available. Please add a new service.`);
    }
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const getVehicleById = async (token, id) => {
  console.log("Fetching service ID:", id);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/vehicle/${id}`,
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
    if (typeof data !== "object" || Object.keys(data).length === 0) {
      throw new Error(
        `Failed to fetch service: ${data.message || "Unknown error"}`
      );
    }
    // Return the first item of the array
    return data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};
// Function to update employee data
const updateVehicle = async (token, formData, id) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };
  console.log("FormData being sent:", formData);
  try {
    const response = await fetch(
      `${api_url}/api/vehicle/`,
      requestOptions
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }
    if (response.status === 200) {
      return response; // Return the data if the update was successful
    } else {
      throw new Error(
        `Failed to update service: ${data.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

// A function to send delete request to delete an employee
const deleteVehicle = async (token, id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/vehicle/${id}`,
      requestOptions
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    if (response.status === 200) {
      console.log(response);
      return response; // Return the data if the delete was successful
    } else {
      throw new Error(
        `Failed to delete service: ${data.message || "Unknown error"}`
      );
    }
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};

// Export all the functions
const vehicleService = {
  createVehicle,
  getAllVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};
export default vehicleService;