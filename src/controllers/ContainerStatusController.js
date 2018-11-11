import axios from 'axios';
import strings from '../localization';
import basePath, { Network } from './BaseController';

class ContainerStatusController {
  constructor() {
    this.path = 'containers/';
    this.containerPath = '{container_id}/';
  }

  editContainerStatus = async (token, container, status) =>
    new Promise((resolve, reject) => {
      const containerPath = this.containerPath.replace('{container_id}', container);
      axios
        .put(
          `${basePath}${this.path}${containerPath}`,
          {
            status: `${status}`,
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
            containerData: response.data,
          });
        })
        .catch((error) => {
          if (error.message.includes(Network)) reject(new Error(strings.errorNetwork));
          else reject(new Error(strings.errorChangeContainerStatus));
        });
    });
}

export default new ContainerStatusController();
