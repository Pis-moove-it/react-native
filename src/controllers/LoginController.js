import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class LoginController {
  constructor() {
    this.path = 'organizations/login/';
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
              DeviceTypeHeader: 'android', // Temporal
              DeviceIdHeader: 'a587refvs251fw8wgw12r8njytio8pqn1vhf93eej', // Temporal
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
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorLogin));
        });
    });

  logout = () => null;
}

export default new LoginController();
