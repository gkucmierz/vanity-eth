
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/vanity-eth/' : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Vanity ETH Address Generator',
    }
  },
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      })
    ],
    resolve: {
      extensions: ['.ts', '.js'],
      fallback: {
        'stream': require.resolve('stream-browserify'),
        'buffer': require.resolve('buffer')
      }
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: { loader: 'worker-loader' },
        },
      ],
    },
  }
});
