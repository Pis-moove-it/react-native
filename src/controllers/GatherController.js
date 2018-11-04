import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class GatherController {
  constructor() {
    this.routeID = null;
    this.routesPath = 'routes';
    this.collectionsPath = `routes/${this.routeID}/collections`;
    this.containersPath = 'containers';
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
      this.routeID = routeId;
      axios
        .post(
          `${basePath}${this.collectionsPath}`,
          {
            collection_point_id: collectionId,
            pockets_attributes: [{ serial_number: `${pocket.serial_number}` }],
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
            length: 10, // parseInt(routeLength, 10),
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
