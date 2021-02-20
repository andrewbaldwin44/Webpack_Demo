const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const PROFILER = process.env.PROFILER === "true";
const PRODUCTION = process.env.PRODUCTION === "true";

const plugins = [
  new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  new HtmlWebpackPlugin()
];

if (PROFILER) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: true,
      generateStatsFile: true,
      defaultSizes: "gzip",
      statsOptions: { source: false },
      reportFilename: path.join(__dirname, "profiler/report.html")
    })
  );
}

if (PRODUCTION) {
  plugins.push(
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    })
  );
}

module.exports = {
  mode: "development",

  entry: "./src/index.js",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: ""
  },

  devtool: "inline-source-map",

  plugins,

  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: PRODUCTION ? MiniCssExtractPlugin.loader : "style-loader"
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource"
      }
    ]
  },

  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  devServer: {
    contentBase: "./dist"
  }
};
