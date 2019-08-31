const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    port: 1234,
    historyApiFallback: true,
    overlay: true,
  },
  plugins: [new ForkTsCheckerWebpackPlugin({ eslint: true })],
}
