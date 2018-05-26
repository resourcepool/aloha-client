
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = (params) => {
  return merge(common(params), {
    devtool: 'source-map',
    plugins: [
      // Hashed module ids instead of names. Prod only
      new webpack.HashedModuleIdsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  });
};
