global.fetch = require('jest-fetch-mock');

window.fetch = global.fetch;

require('dotenv').config('../../.env');
