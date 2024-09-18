


const api_url = import.meta.env.VITE_API_URL; // Ensure this environment variable is correctly set

// A function to send a GET request to get all customers
const getAllCustomers = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const response = await fetch(`${api_url}/api/customers`, requestOptions);

    // Check if the response status is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON data from the response
    const data = await response.json();
console.log(data);
    // Check the status of the returned data
    if (data.status !== 200) {
      return data; // Return the data if the request was successful
      console.log(data);
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};




const getServiceById = async (id, token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };    

    const response = await fetch(   
      `${api_url}/api/service/${id}`,
      requestOptions      
    );

    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error; // Re-throw the error to be handled by the caller

  }
      
}

const getCustomerById = async (id, token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const response = await fetch(
      `${api_url}/api/customer/${id}`,
      requestOptions
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
console.log(data);
    // Assuming that your API response includes a `status` field
    if (data.status !== 200) {
      return data;
    }

    return { success: true, data: data.data }; // Adjust based on your API response structure
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const getCustomerVehicles = async (customer_id, token) => {
  console.log("Fetching vehicles for customer ID:", customer_id);
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const response = await fetch(
      `${api_url}/api/vehicles/${customer_id}`,
      requestOptions
    );
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data) {
      return data; // Return the data if the request was successful
    } else {
      throw new Error(data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  }
};
const getVehicleById = async (id, token) => {
  console.log("Fetching vehicle for ID:", id);
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      }
      
    };
    const response = await fetch(
      `${api_url}/api/vehicle/${id}`,
      requestOptions
    );
console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched vehicle data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    throw error;
  }
};

const getAllServices = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };
    const response = await fetch(`${api_url}/api/services`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched services data:", data);

    // Directly return the data as an array of services
    return data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
const createOrder = async (data, token) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data), // Ensure the data object matches backend expectations
    };

    const response = await fetch(`${api_url}/api/order`, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Order creation result:", result); // For debugging
    return result;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

const updateOrder = async (token, data) => {
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(
      `${api_url}/api/order/edit/${data.id}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Order update result:", result); // For debugging
    return result;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

const updateVehicle = async (token, data) => {
  try {
    const url = `${api_url}/api/vehicle/`; // Adjusted URL if needed
    console.log("Updating vehicle at:", url);
    console.log("Payload:", data);

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Vehicle update result:", result); // For debugging
    return result;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw error;
  }
};

export {
  getAllCustomers,  
  getCustomerById,
  getCustomerVehicles,
  getVehicleById,
  getAllServices,
  createOrder,
  getServiceById,
  updateOrder,
  updateVehicle
};


