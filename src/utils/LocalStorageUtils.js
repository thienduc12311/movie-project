import { LOCALSTORAGE_TOKEN_NAME } from '../configurations';
import jwt_decode from 'jwt-decode';
class LocalStorageUtils {
  getItem(key, defaultValue = '""') {
    if (typeof localStorage !== 'undefined') {
      let item = localStorage.getItem(key);
      if (item && item === 'undefined') item = defaultValue;
      return JSON.parse(item);
    }
    return undefined;
  }

  setItem(key, value = '') {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  removeItem(key) {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  clear() {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
  }
  deleteUser() {
    this.removeItem(LOCALSTORAGE_TOKEN_NAME);
    window.location.reload(false);
  }
  getUser() {
    if (typeof localStorage !== 'undefined') {
      const token = this.getItem(LOCALSTORAGE_TOKEN_NAME);
      if (token) {
        try {
          jwt_decode(token);
          return jwt_decode(token);
        } catch (ex) {
          if (ex.response && ex.response.status === 401) {
            this.deleteUser();
          }
        }
      } else return token;
    }
    return undefined;
  }

  getToken() {
    return this.getItem(LOCALSTORAGE_TOKEN_NAME);
  }
}

export default new LocalStorageUtils();
