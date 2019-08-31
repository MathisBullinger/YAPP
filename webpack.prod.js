const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
  context: __dirname,
  devtool: 'source-map',
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
}
