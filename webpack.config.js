/* eslint-env node */
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const path = require('path')
const resolve = file => path.resolve(__dirname, file)

const development = process.env.NODE_ENV !== 'production'

const config = {
  entry: {
    app: './src/index.js',
  },
  output: {
    publicPath: '/',
    filename: development ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: development ? '[name].js' : '[name].[chunkhash].js',
    path: path.join(__dirname, 'dist'),
  },
  mode: development ? 'development' : 'production',
  devtool: development ? 'inline-source-map' : false,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': resolve('./src'),
    },
  },
  module: {
    rules: [
      // {
      // 	enforce: 'pre',
      // 	test: /\.(js|jsx)$/,
      // 	exclude: /node_modules/,
      // 	loader: 'eslint-loader',
      // 	options: {
      // 		fix: true
      // 	}
      // },
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: false,
            },
          },
          // {
          // 	loader: 'eslint-loader',
          // 	options: {
          // 		fix: true
          // 	}
          // }
        ],
      },
      {
        test: /\.css$/,
        use: [
          // MiniCssExtractPlugin.loader
          'style-loader',
          'css-loader',
        ],
      },
      // {
      //   test: /\.scss$/,
      //   use: [
      //     MiniCssExtractPlugin.loader, // 'style-loader',
      //     'css-loader',
      //     'sass-loader',
      //   ],
      // },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: development ? '[name].[ext]' : '[contenthash].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: development ? '[name].css' : '[name].[contenthash].css',
    //   chunkFilename: development ? '[id].css' : '[id].[contenthash].css',
    // }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
    }),
  ],
}

const dev = {
  devServer: {
    open: true, //'Google Chrome',
    stats: { children: false },
    contentBase: '/dist',
    // historyApiFallback: true
    historyApiFallback: {
      // index: 'index.html'
      rewrites: [{ from: /^\//, to: '/index.html' }],
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
}

const pro = {}

module.exports = merge(config, development ? dev : pro)
