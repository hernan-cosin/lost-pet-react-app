const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
var liveServer = require("live-server");
const dev = process.env.NODE_ENV == "development";

if (dev) {
  var params = {
    file: "./index.html",
  };

  liveServer.start(params);
}

module.exports = {
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  mode: process.env.NODE_ENV,
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      // {
      //   test: /\.(js|jsx)$/,
      //   exclude: /node_modules/,
      //   use: ["babel-loader"],
      // },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".js", ".ts"],

    plugins: [
      new TsconfigPathsPlugin({
        /* options: see below */
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
