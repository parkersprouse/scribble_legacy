// eslint-disable-next-line
'use strict';

const router = require('express').Router();

const auth = require('./endpoints/auth');
const scribbles = require('./endpoints/scribbles');
const users = require('./endpoints/users');

// auth endpoints
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.post('/auth/verify_token', auth.verifyToken);

// user endpoints
router.get('/users', users.getAll);
router.get('/users/id/:id', users.getID);
router.get('/users/email/:email', users.getEmail);
router.get('/users/name/:name', users.getName);
router.patch('/users', users.update);
router.delete('/users/:id', users.delete);

// scribble endpoints
router.get('/scribbles', scribbles.getAll);
router.get('/scribbles/id/:id', scribbles.getID);
router.get('/scribbles/owner/:owner_id', scribbles.getOwnerID);
router.post('/scribbles', scribbles.add);
router.patch('/scribbles', scribbles.update);
router.delete('/scribbles/:id', scribbles.delete);

module.exports = router;
