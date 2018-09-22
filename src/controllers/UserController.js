class UserController {
  constructor() {
    this.basePath = '/users';
  }

  login = async (identifier, username) =>
    // This is a mocked example to simulate api behavior
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
