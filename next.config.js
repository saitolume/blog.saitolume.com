const withCSS = require('@zeit/next-css')
const withPreact = require('next-plugin-preact');
const path = require('path')

module.exports = withCSS(withPreact({
  experimental: {
    optimizeFonts: true,
  },
  webpack(config) {
    config.resolve.alias['~'] = path.resolve('src')
    config.module.rules.push({
      test: /\.(js|tsx)$/,
      use: [
        {
          loader: '@linaria/webpack-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          },
        },
      ],
    })
    return config
  }
}))
