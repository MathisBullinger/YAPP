const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  mode: 'production',
  context: __dirname,
  // devtool: 'source-map',
  optimization: {
    minimizer: [
      new TerserPlugin({
        // sourceMap: true,
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
  plugins: [new CompressionPlugin()],
}
