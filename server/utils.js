// eslint-disable-next-line
'use strict';

module.exports = {

  generateJwtPayload: function(data) {
    return {
      id: data.id,
      email: data.email,
      username: data.username,
      name: data.name,
      pw_hash: data.pw_hash
    }
  }

};
