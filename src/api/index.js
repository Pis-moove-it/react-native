import axios from 'axios';

const URL = 'http://34.213.11.120/organizations/1/users'

export default () => {
  return axios.get(URL).then(response => response)
}
