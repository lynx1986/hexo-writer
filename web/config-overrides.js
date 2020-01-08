const { 
    override,
    addDecoratorsLegacy,
    disableEsLint,
    addWebpackAlias
} = require('customize-cra');
const path = require('path');

const paths = require('react-scripts/config/paths');
paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');

module.exports = override(

    addDecoratorsLegacy(),

    disableEsLint(),

    addWebpackAlias({
        '@': path.resolve(__dirname, "src")
    }),
);