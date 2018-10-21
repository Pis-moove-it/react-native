import axios from 'axios';
import strings from '../localization';
import basePath from './BaseController';

class LoginController {
  constructor() {
    this.path = 'organizations/login';
  }

  login = async (organization, password) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `${basePath}${this.path}`,
          {
            name: `${organization}`,
            password: `${password}`,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              DeviceTypeHeader: 'android',
              DeviceIdHeader: 'a587refvs251fw8wgw12r8njytio8pqn1vhf93eej',
            },
          },
        )
        .then((response) => {
          resolve({
            token: response.headers.apikey,
            name: response.data.name,
            identifier: response.data.id,
          });
        })
        .catch((error) => {
          reject(new Error(strings.loginError));
        });
    });

  logout = () => null;
}

export default new LoginController();
