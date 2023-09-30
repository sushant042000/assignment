import axios from "axios";


//api for get token
export const loginApi = async (email, password) => {
  return await axios.get(
    `https://assignment.8848digitalerp.com/api/method/assignment.API.access_token.get_access_token?usr=${email}&pwd=${password}`
  );
};



//api for get all users
export const getAllUsersApi = async (token) => {
  const url =
    "https://assignment.8848digitalerp.com/api/method/assignment.API.all_users_api.get_user";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  let response;

  await fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      response = data;
    })
    .catch((error) => {
      response = error;
    });

    
  return response;
};


//api for get specific user

export const getSpecificUserApi  = async (token,name) => {
  const url = new URL(
    "https://assignment.8848digitalerp.com/api/method/assignment.API.specific_user.get_specific"
  );
  url.searchParams.append("name1", name);

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };
  let response;

  await fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
     
      response = data;
    })
    .catch((error) => {
      response = error;
    });
    
  return response;
};


// update api 

export const updateUserApi = async (name, token, data) => {
  const url = `https://assignment.8848digitalerp.com/api/resource/Assignment/${name}`;
  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  let response;

  await fetch(url, requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      response = data;

      console.log(data);
    })
    .catch((error) => {
      response = error;
      console.error("Fetch error:", error);
    });
  return response;
};


