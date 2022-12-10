import axios from "axios";

export default ({ email, password }) => {
  return new Promise((resolve,reject) => {
    
    
    const resolveFunction = (data) => {
      resolve({
        user: data.data,
        statusCode: 200
      })
    }
    axios({
      method: "POST",
      url: `http://localhost:3000/login`,
      data: {
        email,
        password,
      }
    })
      .then((data) => data)
      .then(resolveFunction).catch(error => reject(error.message))

  })
};
