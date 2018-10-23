import axios from 'axios';
import strings from '../localization';
import basePath from './BaseController';

class PocketController {
  constructor() {
    this.path = 'pockets/';
  }

  getPockets = async token =>
    new Promise((resolve, reject) => {
      axios
        .get(`${basePath}${this.path}`, {
          headers: {
            ApiKey: `${token}`,
          },
        })
        .then((response) => {
          resolve({
            pockets: response.data,
          });
        })
        .catch(() => {
          reject(new Error(strings.loginError));
        });
    });
}

export default new PocketController();
