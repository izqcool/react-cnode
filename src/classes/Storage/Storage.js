/**
 * Global storage
 */
class _Storage {

  constructor() {
    this._data = {};
  }

  put(key, value) {
    this.set(key, value);
  }

  set(key, value) {
    if (typeof key === 'string') {
      this._data[key] = value;
    } else {
      throw Error('key is invalid');
    }
  }

  get(key) {
    return typeof this._data[key] !== 'undefined' ? this._data[key] : null;
  }

  remove(key) {
    if (typeof this._data[key] !== 'undefined') {
      delete this._data[key];
    }
  }

  clear() {
    this._data = {};
  }

}

export const Storage = Object.freeze(new _Storage());
