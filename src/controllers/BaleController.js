import axios from 'axios';
import strings from '../localization';
import basePath from './BaseController';

class BaleController {
  constructor() {
    this.path = 'bales/{bale}';
  }

  editBale = async (token, bale, weight, material) =>
    new Promise((resolve, reject) => {
      this.path = this.path.replace('{bale}', bale);
      axios
        .put(
          `${basePath}${this.path}`,
          {
            bale: {
              weight: `${weight}`,
              material: `${material}`,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              ApiKey: `${token}`,
            },
          },
        )
        .then((response) => {
          resolve({
            baleData: response.data,
          });
        })
        .catch((error) => {
          reject(new Error(strings.baleEditError));
        });
    });

  newBale = async (token, bale, weight, material) =>
    new Promise((resolve, reject) => {
      this.path = this.path.replace('{bale}', bale);
      axios
        .post(
          `${basePath}${this.path}`,
          {
            bale: {
              weight: `${weight}`,
              material: `${material}`,
            },
          },
          {
            headers: {
              'Content-Type': 'application/json',
              ApiKey: `${token}`,
            },
          },
        )
        .then((response) => {
          resolve({
            baleData: response.data,
          });
        })
        .catch((error) => {
          reject(new Error(strings.baleNewError));
        });
    });
}

export default new BaleController();
