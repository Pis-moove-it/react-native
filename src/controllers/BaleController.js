import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class BaleController {
  constructor() {
    this.path = 'bales/';
  }

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
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorNewBale));
        });
    });

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
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorEditBale));
        });
    });

  getBales = async (token, nextPage) =>
    new Promise((resolve, reject) => {
      axios
        .get(`${basePath}${this.path}?page=${nextPage}`, {
          headers: {
            'Content-Type': 'application/json',
            ApiKey: `${token}`,
          },
        })
        .then((response) => {
          resolve({
            bales: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.error));
        });
    });
}

export default new BaleController();
