// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    host: 'localhost',
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, '../public'),
    },
  },
};
