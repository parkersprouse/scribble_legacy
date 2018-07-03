// eslint-disable-next-line
'use strict';

module.exports = {

  generateJwtPayload(data) {
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      pw_hash: data.pw_hash
    }
  }

};
