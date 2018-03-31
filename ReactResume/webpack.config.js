const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports =  {
	entry:['babel-polyfill','react-hot-loader/patch','./src/app.js'],
	output:{
		path: path.resolve(__dirname,'dist'),
		filename:"main.js",
		publicPath:'/'
	},
	module:{
		rules:[
          {
             test:/\.css$/,
             use:['style-loader','css-loader','postcss-loader']
          },
          {
          	test:/\.(js|jsx)$/,
          	exclude:/node_modules/,
      	    use:['babel-loader']
          },
          {
          	test:/\.(jpe?g|png|gif|svg)$/,
          	use:['url-loader']
          },
          {
          	test:/\.(woff|woff2|eot|ttf|otf)$/,
          	use:['url-loader']
          },
          {
            test:/\.txt$/,
            use:['raw-loader']
          }
		]
	},
    optimization:{
      minimize:false,
      runtimeChunk:{
        name:'vendor'
      },
      splitChunks:{
        cacheGroups: {
            default: false,
            commons: {
              test: /node_modules/,
              name: "vendor",
              chunks: "initial",
              minSize: 1
            }
        }
      }
    },
	plugins:[
       new CleanWebpackPlugin(['build']),
       new webpack.HotModuleReplacementPlugin(),
       new HtmlWebpackPlugin({
       	    title:'react-project',
       	    favicon:path.resolve(__dirname,'public/favicon.ico'),
       	    template:path.resolve(__dirname,'src/index.html'),
       	    filename:'index.html',
       	    inject:'body',
       	    minify:{
       	    	collapseWhitespace:true,
       	    	removeComments:true,
       	    	removeAttributeQuotes:true
       	    }
       }),
	],
	resolve:{
			modules:['node_modules/'],
			extensions:['.js','jsx','.json']
	}
};	
