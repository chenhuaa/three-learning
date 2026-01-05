const webpack = require('webpack');

module.exports = {
  transpileDependencies: [],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(vs|fs|gls)$/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        'window.THREE': 'three',
        THREE: 'three'
      })
    ]
  }
}


