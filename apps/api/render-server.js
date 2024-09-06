const path = require('path');
const moduleAlias = require('module-alias');

// Add aliases for your shared packages
moduleAlias.addAliases({
    '@repo/utils': path.join(__dirname, '../../packages/utils'),
    // Add other shared packages as needed
});

// Import your bundled server
require('./dist/server.js');