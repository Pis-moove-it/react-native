import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class GatherController {
  constructor() {
    this.path = 'routes/';
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
            identifier: response.data.id,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorUser));
        });
    });
}

export default new GatherController();
