import axios from 'axios';

const URL = 'http://34.213.11.120/organizations/1/users'; // Change 1 for {UserOrganization} with new Login

export default () => axios.get(URL);
