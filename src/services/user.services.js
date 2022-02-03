import axios from 'axios';

const API_URL = 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data';

const getUserData = async () => {
  const response = axios.get(API_URL);
  return response;
};

const userServices = {
  getUserData,
};

export default userServices;
