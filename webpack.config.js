import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  context: path.resolve(__dirname, 'src', 'components'),

  entry: {
    main: './Index',
    time: './Time',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
    ],
  },

  optimization: {
    minimize: true,

    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
        },
      }),
    ],

    runtimeChunk: 'single',

    splitChunks: {
      cacheGroups: {
        reactVendor: {
          test: /[\\/]node_modules[\\/](lodash|moment)[\\/]/,
          name: 'shared',
          chunks: 'all',
        },
      },
    }
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'pages', 'time.html'),
      filename: 'time.html',
      chunks: ['time']
    }),

    new MiniCssExtractPlugin({
      filename: "[name]/style.[contenthash].css",
    }),
  ],
};

export default config;
