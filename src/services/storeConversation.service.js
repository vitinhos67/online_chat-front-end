import axios from "axios";

export default async ({ from_id, for_id, message }) => {
  const response = axios({
    method: "post",
    url: `http://localhost:3000`,
    data: {
      from_id,
      for_id,
      message,
    },
  });
  if (response.statusCode === 200) response.data;
};
