import axios from 'axios';
import strings from '../localization';
import basePath from './BaseController';

class GatherController {
  constructor() {
    this.path = '/routes';
  }

  startCollection = async token =>
    new Promise((resolve, reject) => {
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
}

export default new GatherController();
