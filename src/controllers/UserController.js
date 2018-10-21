import axios from 'axios';
import strings from '../localization';
import basePath from './BaseController';

class UserController {
  constructor() {
    this.path = 'organizations/{organization}/users/{user}/login';
  }

  login = async (token, organization, user) =>
    new Promise((resolve, reject) => {
      this.path = this.path.replace('{organization}', organization);
      this.path = this.path.replace('{user}', user);
      axios
        .post(
          `${basePath}${this.path}`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
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
          reject(new Error(strings.userError));
        });
    });

  logout = () => null;
}

export default new UserController();
