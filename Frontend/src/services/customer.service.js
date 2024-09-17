// Import the API URL from the environment variables
const api_url = import.meta.env.VITE_API_URL;

// Function to send a POST request to create a new customer
const createCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };
  try {
    const response = await fetch(`${api_url}/api/customer`, requestOptions);
    console.log(response)
    // if (!response.ok) {
    //   const errorText = await response.text();
    //   throw new Error(
    //     `HTTP error! Status: ${response.status}, Details: ${errorText}`
    //   );
    // }
    const data = await response.json();
    return data; // Return the data to be used by the calling code
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

// Function to send a GET request to retrieve all customers
const getAllCustomers = async (loggedInEmployeeToken) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  try {
    const response = await fetch(`${api_url}/api/customers`, requestOptions);
    console.log(response);
    // if (!response.ok) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    // Parse the JSON data from the response
    const data = await response.json();
    console.log(data);
    // Check the status of the returned data
    // if (!data) {
    //   throw new Error(
    //     "Failed to fetch customer: " + (data.message || "Unknown error")
    //   );
    // }
    return data; // Return the data to be used by the calling code
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Function to send a PUT request to update an existing customer
const updateCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${api_url}/api/customer/`, requestOptions);
    console.log(response);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! Status: ${response.status}, Details: ${errorText}`
      );
    }

    const data = await response.json();
    console.log(data)
    return data; // Return the updated customer data
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};
// Function to send a GET request to retrieve a single customer by ID
// Function to send a GET request to retrieve a single customer by hash
const singleCustomer = async (formData,loggedInEmployeeToken) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };
  try {
    const response = await fetch(
      // `${api_url}/api/customer/${customer_hash}`,
      `${api_url}/api/customer/:id`,
      requestOptions
    );
    // if (!response.ok) {
    //   const errorText = await response.text();
    //   throw new Error(
    //     `HTTP error! Status: ${response.status}, Details: ${errorText}`
    //   );
    // }
    const data = await response.json();
    return data; // Return the customer data
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};
// Function to send a GET request to retrieve a single customer by ID
const getCustomerById = async (
  id, loggedInEmployeeToken) => {
   console.log("Fetching customer ID:", id);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
    // body: JSON.stringify(id),
  };
  try {
    const response = await fetch(
      // `${api_url}/api/customer/${customer_hash}`,
      `${api_url}/api/customer/${id}`,
      requestOptions
    );
    // if (!response.ok) {
    //   const errorText = await response.text();
    //   throw new Error(
    //     `HTTP error! Status: ${response.status}, Details: ${errorText}`
    //   );
    // }
    const data = await response.json();
    console.log(data)
    return data; // Return the customer data
  } catch (error) {
    console.error("Error fetching customer:", error);
    throw error;
  }
};

// Function to find customers based on a query
const findCustomer = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": loggedInEmployeeToken,
    },
  };

  try {
    const response = await fetch(
      `${api_url}/api/customer/:id?query=${formData}`,
      requestOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the search results
  } catch (error) {
    console.error("Error finding customer:", error);
    throw error;
  }
};

// Export all the functions as part of customerService
const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  singleCustomer,
  getCustomerById,
  findCustomer,
};

export default customerService;
