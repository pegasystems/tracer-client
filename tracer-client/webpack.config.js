module.exports = {
  entry: {
    index: './src/index.ts',
    indexmockserver: '../tools/client-with-mock-servlet.ts',
    module: './src/client.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: '[name].bundle.js'
  },
  devtool: "source-map"
};