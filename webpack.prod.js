const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  mode: 'production',
  context: __dirname,
  devtool: false,
  resolve: {
    alias: {
      // ! preact x currenly not working with react router
      // react: 'preact/compat',
      // 'react-dom/test-utils': 'preact/test-utils',
      // 'react-dom': 'preact/compat',
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
  plugins: [
    new CompressionPlugin({
      algorithm: 'gzip',
      filename: ({ path }) => `gz/${path}`,
    }),
    new CompressionPlugin({
      algorithm: 'brotliCompress',
      filename: ({ path }) => `br/${path}`,
    }),
  ],
}
