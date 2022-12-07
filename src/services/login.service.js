const axios = require("axios");

module.exports = (email, password) => {
  const user = axios({
    method: "POST",
    url: `http:localhost:3000/login`,
    body: {
      email,
      password,
    },
  });
};
