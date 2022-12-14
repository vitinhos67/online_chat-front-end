import axios from "axios";

export default async ({
  from_id,
  for_id,
  message,
  from_username,
  for_username,
}) => {
  const response = axios({
    method: "post",
    url: `http://localhost:3000/add/message`,
    data: {
      from_username,
      for_username,
      from_id,
      for_id,
      message,
    },
  });
  if (response.statusCode === 200) response.data;
};
