module.exports = {
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
    }
  }
}


