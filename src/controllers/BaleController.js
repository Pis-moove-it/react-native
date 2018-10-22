import axios from 'axios';
import strings from '../localization';
import basePath from './BaseController';

class BaleController {
  constructor() {
    this.path = 'bales/';
  }

  editBale = async (token, bale, weight, material) =>
    new Promise((resolve, reject) => {
      axios
        .put(
          `${basePath}${this.path}${bale}`,
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

  newBale = async (token, weight, material) =>
    new Promise((resolve, reject) => {
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

  getBales = async token =>
    new Promise((resolve, reject) => {
      axios
        .get(`${basePath}${this.path}`, {
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
          reject(new Error(strings.error));
        });
    });
}

export default new BaleController();
