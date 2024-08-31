//base URL for your API requests
const apiUrl = import.meta.env.VITE_FRONTEND_URL;

// A function to send the login request to the server
const logIn = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData), //converts the object into a JSON string
  };
  console.log("About to send request");
  //to see exactly what data is being sent
  console.log(requestOptions.body);
  const response = await fetch(`${apiUrl}/api/employee/login`, requestOptions);
  return response;
};

// removes the stored employee data from local storage,
const logOut = () => {
  localStorage.removeItem("employee");
};

// Export the functions
export default { logIn, logOut };
