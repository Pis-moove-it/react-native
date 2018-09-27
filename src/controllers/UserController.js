class UserController {
  constructor() {
    this.basePath = '/users';
  }

  login = async (identifier, username) =>
    new Promise((resolve, reject) => {
      if (identifier !== null && username !== null) {
        setTimeout(() => resolve({ name: username }), 1000);
      } else {
        setTimeout(() => reject(new Error('Invalid identifier/username')), 1000);
      }
    });

  logout = () => null;
}

export default new UserController();
