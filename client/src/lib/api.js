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

  verifyAuthToken(token, callback) {
    post('/api/auth/verify_token', { token }, callback);
  },

  // users
  getUsers(callback) {
    get('/api/users', callback);
  },

  getUsersID(id, callback) {
    get(`/api/users/id/${id}`, callback);
  },

  getUsersEmail(email, callback) {
    get(`/api/users/email/${email}`, callback);
  },

  getUsersName(name, callback) {
    get(`/api/users/name/${name}`, callback);
  },

  updateUser(data, callback) {
    patch('/api/users', data, callback);
  },

  deleteUser(id, callback) {
    doDelete(`/api/users/${id}`, callback);
  },

  decodeToken(token, callback) {
    post('/api/users/decode', { token }, callback);
  },

  // scribbles
  getScribbles(callback) {
    get('/api/scribbles', callback);
  },

  getScribblesID(id, callback) {
    get(`/api/scribbles/id/${id}`, callback);
  },

  getScribblesOwnerID(id, callback) {
    get(`/api/scribbles/owner/${id}`, callback);
  },

  addScribble(data, callback) {
    post('/api/scribbles', data, callback);
  },

  updateScribble(data, callback) {
    patch('/api/scribbles', data, callback);
  },

  deleteScribble(id, callback) {
    doDelete(`/api/scribbles/${id}`, callback);
  },

};
