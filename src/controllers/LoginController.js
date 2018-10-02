class LoginController {
  constructor() {
    this.basePath = '/users';
  }

  login = async (organization, password) =>
    // This is a mocked example to simulate api behavior
    new Promise((resolve, reject) => {
      if (organization !== null && password !== null) {
        setTimeout(() => resolve({ name: organization }), 1000);
      } else {
        setTimeout(
          () => reject(new Error('Invalid identifier/username')),
          1000,
        );
      }
    });

  logout = () => null;
}

export default new LoginController();
