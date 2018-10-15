import axios from 'axios';

const staging = 'http://34.213.11.120';

export default (token, organization) =>
  axios.get(URL.replace('{organization}', organization), {
    headers: {
      ApiKey: `${token}`,
    },
  });
