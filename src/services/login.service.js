import axios from "axios";

export default ({ email, password }) => {
  axios({
    method: "POST",
    url: `http:localhost:3000/login`,
    body: {
      email,
      password,
    },
  })
    .then((data) => data)
    .then((result) => {
      return {
        statusCode: result.statusCode,
        user: result.data,
      };
    });
};
