module.exports = {
  mode: 'development',
  entry: './app/assets/js/app.ts',
  devtool: 'inline-source-map', // helps debigging
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.app.json'
            }
          }
        ],
        exclude: /node-modules/
      }
    ]
  },
  output: {
    filename: 'bundle.js'
  }
}