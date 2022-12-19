import axios from "axios";

export default async ({ email, password }) => {
  
  const response = await axios({
    method: "POST",
    url: `http://localhost:3000/login`,
    data: {
      email,
      password,
    },
  })
  return response.data
};
