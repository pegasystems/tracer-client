module.exports = {
  entry: {
    index: './src/index.js',
    indexmockserver: './tools/client-with-mock-servlet.js',
    module: './src/client.js'
  },
  output: {
    filename: 'dist/[name].bundle.js'
  }
}