import axios from 'axios';

const staging = 'http://34.213.11.120/';

export const getUsersApi = organizationId =>
  axios.get(`${staging}organizations/${organizationId}/users`);

export const getBalesApi = () => axios.get(`${staging}/bales`);
