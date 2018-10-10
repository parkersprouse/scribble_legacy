/* eslint import/no-extraneous-dependencies: "off", no-unused-vars: "off" */

import Cookies from 'universal-cookie';

const cookies = new Cookies();
export default {
  lib: cookies,
  get: cookies.get,
  set: cookies.set,
  getToken: () => cookies.get('token'),
  removeToken: () => cookies.remove('token'),
  setToken: (token, options) => {
    const default_opts = { maxAge: 60 * 60 * 24 * 7, httpOnly: false };
    cookies.set('token', token, options || default_opts);
  },
};
