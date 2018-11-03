import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class PocketController {
  constructor() {
    this.path = 'pockets/';
    this.pocketPath = '{pocket}/';
  }

  editPocketSerialNumber = async (token, pocket, serialNumber) =>
    new Promise((resolve, reject) => {
      const pocketPath = this.pocketPath.replace('{pocket}', pocket);
      const specificPath = 'edit_serial_number/';
      axios
        .put(
          `${basePath}${this.path}${pocketPath}${specificPath}`,
          {
            serial_number: `${serialNumber}`,
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
            pocketData: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorEditBale));
        });
    });

  editPocketWeight = async (token, pocket, weight) =>
    new Promise((resolve, reject) => {
      const pocketPath = this.pocketPath.replace('{pocket}', pocket);
      const specificPath = 'edit_weight/';
      axios
        .put(
          `${basePath}${this.path}${pocketPath}${specificPath}`,
          {
            weight: `${weight}`,
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
            pocketData: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorEditBale));
        });
    });

  addPocketWeight = async (token, pocket, weight) =>
    new Promise((resolve, reject) => {
      const pocketPath = this.pocketPath.replace('{pocket}', pocket);
      const specificPath = 'add_weight/';
      axios
        .put(
          `${basePath}${this.path}${pocketPath}${specificPath}`,
          {
            weight: `${weight}`,
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
            pocketData: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorEditBale));
        });
    });

  getPockets = async token =>
    new Promise((resolve, reject) => {
      axios
        .get(`${basePath}${this.path}`, {
          headers: {
            'Content-Type': 'application/json',
            ApiKey: `${token}`,
          },
        })
        .then((response) => {
          resolve({
            pockets: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.error));
        });
    });
}

export default new PocketController();
