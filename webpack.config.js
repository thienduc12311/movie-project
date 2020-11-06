const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const HtmlWebpackPlugin = require('html-webpack-plugin');

dotenv.config();

const config = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.scss$/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/assets/img/logo.jpg',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        APP_ROOT_PORT: JSON.stringify(process.env.APP_ROOT_PORT),
        APP_ROOT_URL: JSON.stringify(process.env.APP_ROOT_URL),
        API_ROOT_URL: JSON.stringify(process.env.API_ROOT_URL),
      },
    }),
  ],
  devServer: {
    contentBase: './build',
    port: process.env.APP_ROOT_PORT || 3000,
    historyApiFallback: true,
  },
};

module.exports = config;
