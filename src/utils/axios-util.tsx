import axios from "axios";

const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const request = ({ ...options }) => {
  const onSuccess = (response: any) => {
    console.log(response);
    return response.data;
  };
  const onError = (error: any) => {
    console.log("Error", error);
  };

  return client(options).then(onSuccess).catch(onError);
};
