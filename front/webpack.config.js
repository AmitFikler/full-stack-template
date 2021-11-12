const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./app/main.js",
  mode: "development",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "./",
    assetModuleFilename: "images/[name][ext][query]",
  },
  devServer: {
    static: path.resolve(__dirname, "app"),
    hot: true,
    compress: true,
    port: 3001,
    host: "127.0.0.1",
    open: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./app/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), "src"),
        enforce: "pre",
        options: {
          fix: true,
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
  },
};
