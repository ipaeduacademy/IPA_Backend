// utils/apiHandler.js
const axios = require('axios');

async function apiRequest(url, { method = "GET", headers = {}, body = null } = {}) {
  try {
    const response = await axios({
      url,
      method,
      headers,
      data: body,
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      responseType: 'json',
      validateStatus: (status) => true, // we'll handle errors manually
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Request failed: ${response.status} ${JSON.stringify(response.data)}`);
    }
  } catch (error) {
    if (error.response) {
      const errData = typeof error.response.data === 'object' ? JSON.stringify(error.response.data) : error.response.data;
      throw new Error(`Request failed: ${error.response.status} ${errData}`);
    }
    throw new Error(`Request error: ${error.message}`);
  }
}

module.exports = { apiRequest };
