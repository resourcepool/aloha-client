const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');

const sourcePath = path.join(__dirname, 'src');
const staticSourcePath = path.join(__dirname, 'static');
const distPath = path.join(__dirname, 'dist');

module.exports = (params) => ({
  entry: {
    app: path.resolve(sourcePath, 'index.js')
  },
  // Destination directory
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },
  // External config (will not be bundled)
  externals: {
    [path.resolve(sourcePath, path.join('conf', 'conf.js'))]: 'Config'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader', 'eslint-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64]',
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: 'file-loader?name=assets/[name]-[hash].[ext]',
        include: staticSourcePath
      },
      {
        test: /\.(png|gif|jpg|svg)$/,
        use: [
          'url-loader?limit=20480&name=assets/[name]-[hash].[ext]'
        ],
        include: staticSourcePath
      }
    ]
  },
  plugins: [
    ...((params && params.analysis) ? [new BundleAnalyzerPlugin()] : []),
    new CopyWebpackPlugin(
      [
        { from: path.join(staticSourcePath, 'images'), to: path.join(distPath, 'images') },
        { from: path.join(staticSourcePath, 'robots.txt'), to: path.join(distPath) },
      ]
    ),
    // Copy html files and resources to destination, minify
    new HtmlWebPackPlugin({
      template: path.resolve(staticSourcePath, 'index.html'),
      filename: './index.html',
      favicon: path.resolve(staticSourcePath, 'favicon.ico'),
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: { test: /[\\/]node_modules[\\/]/, name: 'vendor', chunks: 'all' }
      }
    },
  }
});
