const api_url = import.meta.env.VITE_API_URL;
export const getAllorder = async (token) => {
  try {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    };

    const response = await fetch(`${api_url}/api/orders`, requestOptions);

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

//get order by id
export const getCustomerAndVehicleInfo = async (id, token) => {
  try {
    const response = await fetch(
      `${api_url}/api/order/get-customer-and-vehicle-info/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data; // Return the customer info from the response
  } catch (error) {
    console.error("Error fetching customer info:", error);
    throw error;
  }
};
  


export const getOrdersPerCustomer = async (customerId, token) => {
  console.log("Fetching order data for customer:", customerId);
  

  try {
    const response = await fetch(`${api_url}/api/order/${customerId}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },  
    });
    
      const data = await response.json();
   
    
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching order data:", error);
    throw error;
  }
};

export const getCustomerInfo = async (token, customerIds) => {
  try {
    const response = await fetch(`${api_url}/api/order/get-customer-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ customer_ids: customerIds }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the customer info from the response
  } catch (error) {
    console.error("Error fetching customer info:", error);
    throw error;
  }
};

export const getVehicleInfo = async (token, vehicleIds) => {
  try {     
    const response = await fetch(`${api_url}/api/order/get-vehicle-info`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ vehicle_ids: vehicleIds }),
    });   

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }   

    const data = await response.json();
    return data; // Return the vehicle info from the response
  } catch (error) {
    console.error("Error fetching vehicle info:", error);
    throw error;
  }
};

export const getEmployeeInfo = async (token, orderIds) => {
  console.log(orderIds); // This should be an array of order IDs
  try {
    const response = await fetch(`${api_url}/api/order/get-empolyee-info/`, {
      // Make sure the URL matches your backend endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ order_ids: orderIds }), // Updated to send an array of order IDs
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Employee data:", data); // Inspect the response
    return data;
  } catch (error) {
    console.error("Error fetching employee info:", error);
    throw error;
  }
};


// get the service info
export const getServiceInfo = async (token, orderId) => {
  console.log(orderId);
  try {
    const response = await fetch(`${api_url}/api/order/get-service-info/${orderId}`, {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({ order_id: orderId }), // Adjusted to match backend expectations
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }     

    const data = await response.json();
    console.log("Service data:", data); // Inspect the response
    return data;
  } catch (error) {
    console.error("Error fetching service info:", error);
    throw error;
  }
};  

//handel delete order 
export const deleteOrder = async (token, Id) => {
  try {
    const response = await fetch(`${api_url}/api/order/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    if (!response.ok) { 
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting order:", error);    
    throw error;
  }   
}

//delete vehicle 
export const deleteVehicle = async (token, Id) => {
  try {
    const response = await fetch(`${api_url}/api/vehicle/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    if (!response.ok) { 
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting vehicle:", error);    
    throw error;
  }   
}
// export  {getAllorder};