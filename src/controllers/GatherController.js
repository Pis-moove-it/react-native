import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class GatherController {
  constructor() {
    this.routeID = null;
    this.routesPath = 'routes';
    this.containersPath = 'containers';
    this.collectionsPath = '/collections';
  }

  startCollection = async token =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `${basePath}${this.routesPath}`,
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

  addPocketToCollection = async (token, routeId, collectionId, pocket) =>
    new Promise((resolve, reject) => {
      axios
        .post(
          `${basePath}${this.routesPath}/${routeId}${this.collectionsPath}`,
          {
            collection_point_id: collectionId,
            pockets_attributes: [{ serial_number: `${pocket}` }],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              ApiKey: `${token}`,
            },
          },
        )
        .then(() => {
          resolve({});
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorUser));
        });
    });

  endCollection = async (token, routeId, routeLength, routeImage) =>
    new Promise((resolve, reject) => {
      axios
        .put(
          `${basePath}${this.routesPath}/${routeId}`,
          {
            length: routeLength,
            travel_image: routeImage,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              ApiKey: `${token}`,
            },
          },
        )
        .then(() => {
          resolve({});
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorUser));
        });
    });

  getContainers = async token =>
    new Promise((resolve, reject) => {
      axios
        .get(`${basePath}${this.containersPath}`, {
          headers: {
            'Content-Type': 'application/json',
            ApiKey: `${token}`,
          },
        })
        .then((response) => {
          resolve({
            containers: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.error));
        });
    });
}

export default new GatherController();
