const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')

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
  plugins: [
    new ForkTsCheckerWebpackPlugin({ eslint: true }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      include: /src/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
    }),
  ],
}
