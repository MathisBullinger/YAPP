const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
var GitRevisionPlugin = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
const WorkerPlugin = require('worker-plugin')
const pkg = require('./package.json')
const fs = require('fs')

module.exports = env => merge(baseConfig(env), require(`./webpack.${env}.js`))

const baseConfig = env => ({
  target: 'web',
  entry: {
    app: './src/index.ts',
    sw: './src/serviceWorker.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    globalObject: "(typeof self!='undefined'?self:global)",
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.scss'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(s*)css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: 'graphql-tag/loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin([
      { from: 'manifest.json', to: 'manifest.json' },
      { from: 'icons', to: 'icons' },
    ]),
    gitRevisionPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        COMMIT: JSON.stringify(gitRevisionPlugin.commithash()),
        BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
        VERSION: (() => {
          const version = pkg.version + (env === 'dev' ? '-dev' : '')
          fs.writeFileSync('.sentry-release', `yapp@${version}`, 'utf-8')
          return JSON.stringify(version)
        })(),
      },
    }),
    new WorkerPlugin(),
  ],
})
