import axios from 'axios';

const staging = 'http://34.213.11.120';

export const getUsersApi = (organization) => {
  axios.get(`${staging}/organizations/${organization}/users`);
};

export const getBalesApi = () => {
  axios.get(`${staging}/bales`);
};
