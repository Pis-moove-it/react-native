import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class UserController {
  constructor() {
    this.organizationPath = 'organizations/{organization}/';
    this.userPath = 'users/{user}/';
    this.loginPath = 'login';
  }

  login = async (token, organization, user) =>
    new Promise((resolve, reject) => {
      const organizationPath = this.organizationPath.replace('{organization}', organization);
      const userPath = this.userPath.replace('{user}', user);
      axios
        .post(
          `${basePath}${organizationPath}${userPath}${this.loginPath}`,
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
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorUser));
        });
    });

  logout = () => null;

  getUsers = async (token, organization) =>
    new Promise((resolve, reject) => {
      const organizationPath = this.organizationPath.replace('{organization}', organization);
      axios
        .get(`${basePath}${organizationPath}users`, {
          headers: {
            'Content-Type': 'application/json',
            ApiKey: `${token}`,
          },
        })
        .then((response) => {
          resolve({
            users: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.error));
        });
    });
}

export default new UserController();
