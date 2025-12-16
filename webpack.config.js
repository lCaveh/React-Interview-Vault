const prod = process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    publicPath: prod ? '/React-Interview-Vault/' : '/',
    filename: prod ? '[name].[contenthash].js' : '[name].js',
    clean: true,
  },
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resourceQuery: { not: [/raw/] },
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.svg$/,
        use: ['svgr/webpack', 'url-loader'],
      },
      {
        test: /\.css$/,
        resourceQuery: { not: [/raw/] },
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        { from: './public/assets', to: 'assets' },
        { from: './public/404.html', to: '404.html' },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: false,
    liveReload: true,
    compress: true,
    port: 3000,
    https: true,
    historyApiFallback: true,
    host: 'localhost',
    client: {
      progress: true,
      overlay: false,
    },
    open: true,
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@configs': path.resolve(__dirname, 'src/configs'),
      '@hooks': path.resolve(__dirname, 'src/hooks')
    },
  },
};
