const axios = require("axios");

class UserMethods {
  async find(id) {
    const usersOn = await axios({
      method: "get",
      url: `http://localhost:3000/user/${id}`,
    });

    return usersOn.data;
  }

  async dataUser(token) {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:3000/data/user`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
}

export default new UserMethods();
