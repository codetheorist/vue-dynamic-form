const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

var commonConfig = {
  entry: path.resolve(__dirname + '/src/VueDynamicForm.vue'),
  output: {
    path: path.resolve(__dirname + '/dist/')
  },
  externals: {
    'vue-trumbowyg': 'vue-trumbowyg'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = [

  // Config 1: For browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-dynamic-form.min.js',
      libraryTarget: 'window',
      library: 'VueDynamicForm'
    }
  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/VueDynamicForm.vue'),
    output: {
      filename: 'vue-dynamic-form.js',
      libraryTarget: 'umd',
      library: 'vue-dynamic-form',
      umdNamedDefine: true
    }
  })
];
