/* eslint import/no-extraneous-dependencies: "off", no-unused-vars: "off" */

import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default {
  lib: cookies,
  get: cookies.get,
  set: cookies.set,
  getToken: () => cookies.get('token'),
  setToken: (token, options) => cookies.set('token', token, options),
};
