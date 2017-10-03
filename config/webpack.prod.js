const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootDir = path.resolve(__dirname, '..')
const srcDir = path.resolve(rootDir, 'src')
const distDir = path.resolve(rootDir, 'dist')
const {NODE_ENV = 'production'} = process.env

module.exports = {
  // Where to fine the source code
  context: srcDir,

  // No source map for production build
  devtool: 'source-map',

  entry: ['./index.js'],

  output: {
    // The destination file name concatenated with hash (generated whenever you change your code).
    // The hash is really useful to let the browser knows when it should get a new bundle
    // or use the one in cache
    filename: 'main.[hash:8].js',

    // The destination folder where to put the output bundle
    path: distDir,

    // Wherever resource (css, js, img) you call <script src="..."></script>,
    // or css, or img use this path as the root
    publicPath: '/',

    // At some point you'll have to debug your code, that's why I'm giving you
    // for free a source map file to make your life easier
    sourceMapFilename: 'main.[hash:8].map',
  },

  module: {
    rules: [
      {
        // Webpack, when walking down the tree, whenever you see `.js` file use babel to transpile
        // the code to ES5. I don't want you to look into the node_modules folder.
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        include: srcDir,
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                modules: true,
                sourceMap: true,
                localIdentName: '[name]-[local]_[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('autoprefixer')({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(eot?.+|svg?.+|ttf?.+|otf?.+|woff?.+|woff2?.+)$/,
        use: 'file-loader?name=assets/[name].[hash:8].[ext]',
      },
      {
        test: /\.(jpg|jpeg|png|gif|ico|svg)$/,
        use: [
          // if less than 10Kb, bundle the asset inline, if greater, copy it to the dist/assets
          // folder using file-loader
          'url-loader?limit=10240&name=assets/[name].[hash:8].[ext]',
        ],
        include: path.resolve(srcDir, 'assets'),
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // where to find the html template
      template: path.join(srcDir, 'index.html'),

      // where to put the generated file
      path: distDir,

      // the output file name
      filename: 'index.html',
    }),

    // environment globals added must be added to .eslintrc.json
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      NODE_ENV: NODE_ENV,
      __DEV__: NODE_ENV === 'development',
      __PROD__: NODE_ENV === 'production',
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        conditionals: true,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
    }),

    // Put all css code in this file
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
    }),

    new CopyWebpackPlugin([
      {from: `${srcDir}/images`, to: `${distDir}/images`},
      {from: `${srcDir}/manifest.json`},
      {
        from: `${rootDir}/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.0.2-rc1-2.0.2-rc1.0.js`,
      },
      {
        from: `${rootDir}/node_modules/workbox-sw/build/importScripts/workbox-sw.prod.v2.0.2-rc1-2.0.2-rc1.0.js.map`,
      },
    ]),

    new WorkboxPlugin({
      globDirectory: distDir,
      globPatterns: ['**/*.{html,js,css}'],
      globIgnores: ['workbox-sw.prod.*.js'],
      swSrc: path.join(srcDir, 'sw.js'),
      swDest: path.join(distDir, 'sw.js'),
    }),
  ],
}
