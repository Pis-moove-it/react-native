import axios from 'axios';
import strings from '../localization';

class LoginController {
  constructor() {
    this.basePath = 'http://34.213.11.120';
  }

  login = async (organization, password, path) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `${this.basePath}${path}`,
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
            identifier: '1', // response.data.identifier,
          });
        })
        .catch((error) => {
          reject(new Error(strings.loginError));
        });
    });

  logout = () => null;
}

export default new LoginController();
