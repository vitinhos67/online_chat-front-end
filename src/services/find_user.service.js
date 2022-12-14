const axios = require("axios");
export default async (id) => {
  const usersOn = await axios({
    method: "get",
    url: `http://localhost:3000/user/${id}`,
  });

  return usersOn.data;
};
