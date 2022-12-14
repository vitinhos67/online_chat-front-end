const axios = require("axios");
export default async () => {
  const usersOn = await axios({
    method: "get",
    url: "http://localhost:3000/usersOnChat",
  });

  return usersOn;
};
