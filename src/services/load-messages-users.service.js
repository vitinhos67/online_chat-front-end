const axios = require("axios");

export default async ({ from_id, for_id }) => {
  const response = await axios({
    method: "post",
    url: "http://localhost:3000/messages/restore",
    data: {
      from_id,
      for_id,
    },
  });

  if (response.status !== 200) {
    throw new Error("nao foi possivel carregar as mensagem");
  }
  return response.data;
};
