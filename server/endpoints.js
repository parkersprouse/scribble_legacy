// eslint-disable-next-line
'use strict';

const router = require('express').Router();

const auth = require('./endpoints/auth');

// auth endpoints
router.post('/auth/login', auth.login);
router.post('/auth/register', auth.register);
router.post('/auth/verify_token', auth.verifyToken);

module.exports = router;
