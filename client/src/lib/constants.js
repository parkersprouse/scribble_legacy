export default {
  http_ok: 200,
  http_no_content: 204,
  http_bad_request: 400,
  http_unauthorized: 401,
  http_server_error: 500,
  server: process.env.VUE_APP_BACKEND_URL || '',
};
