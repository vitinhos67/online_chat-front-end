const axios = require("axios");
module.exports = async () => {
  const usersOn = await axios({
    method: "get",
    url: "http://localhost:3000/usersOnChat",
  });

  return usersOn;
};
