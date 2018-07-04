/* eslint import/no-extraneous-dependencies: "off", no-unused-vars: "off" */

import axios from 'axios';
import constants from './constants';

function get(endpoint, callback) {
  axios.get(constants.server + endpoint)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function post(endpoint, data, callback) {
  axios.post(constants.server + endpoint, data)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function doDelete(endpoint, callback) {
  axios.delete(constants.server + endpoint)
    .then((response) => {
      callback(response.status === constants.http_ok ||
               response.status === constants.http_no_content, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function put(endpoint, data, callback) {
  axios.put(constants.server + endpoint, data)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

function patch(endpoint, data, callback) {
  axios.patch(constants.server + endpoint, data)
    .then((response) => {
      callback(response.status === constants.http_ok, response.data);
    })
    .catch((error) => {
      callback(false, error.response.data);
    });
}

export default {

  // user auth
  login(data, callback) {
    post('/api/auth/login', data, callback);
  },

  register(data, callback) {
    post('/api/auth/register', data, callback);
  },

};
