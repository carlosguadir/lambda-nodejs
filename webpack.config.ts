import { join } from 'path'
import { lib } from 'serverless-webpack'

export default {
  mode: 'production',
  entry: lib.entries,
  externals: [
    { 'aws-sdk': 'commonjs aws-sdk' },
    { 'aws-lambda': 'commonjs aws-lambda' }
  ],
  resolve: {
    extensions: [ '.js', '.ts' ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: join( __dirname, '.webpack' ),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}
