class Auth {
  constructor() {
    this.authenticated = false;
  }

  signIn(callback) {
    this.authenticated = true;
    callback();
  }

  signOut(callback) {
    this.authenticated = false;
    callback();
  }

  isAuthenticated() {
    return this.authenticated;
  }

}

export default new Auth(); 