const { 
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addWebpackAlias
} = require('customize-cra');
const path = require('path');

module.exports = override(

    addDecoratorsLegacy(),

    disableEsLint(),

    addWebpackAlias({
        '@': path.resolve(__dirname, "src")
    }),
);