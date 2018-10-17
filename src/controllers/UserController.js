import axios from 'axios';
import strings from '../localization';

class UserController {
  constructor() {
    this.basePath = 'http://34.213.11.120/organizations/{organization}/users/{user}/login';
  }

  login = async (token, organization, user) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          this.basePath.replace('{organization}', organization).replace('{user}', user),
          {},
          {
            headers: {
              ApiKey: `${token}`,
            },
          },
        )
        .then((response) => {
          resolve({
            userData: response.data,
          });
        })
        .catch((error) => {
          reject(new Error());
        });
    });

  logout = () => null;
}

export default new UserController();
