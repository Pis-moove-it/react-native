import axios from 'axios';
import strings from '../localization';

class BaleController {
  constructor() {
    this.basePath = 'http://34.213.11.120';
  }

  getBalesApi = async (token, path) =>
    new Promise((resolve, reject) => {
      axios
        .get(`${this.basePath}${path}`, {
          headers: {
            ApiKey: `${token}`,
          },
        })
        .then((response) => {
          resolve({
            bales: response.data,
          });
        })
        .catch((error) => {
          reject(new Error(strings.loginError));
        });
    });
}

export default new BaleController();
