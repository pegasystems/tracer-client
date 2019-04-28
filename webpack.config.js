module.exports = {
  entry: {
    index: './src/index.js',
    indexmockserver: './tools/client-with-mock-servlet.js',
    module: './src/client.js'
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: '[name].bundle.js'
  }
}