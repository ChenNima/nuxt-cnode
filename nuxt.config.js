module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-hello',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.cnpmjs.org/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
    '~/plugins/index'
  ],
  css: [
    '@/node_modules/vuetify/dist/vuetify.min.css',
    '@/assets/css/override.scss'
  ],
  build: {
    analyze: true,
    analyze: {
      analyzerMode: 'static'
    },
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      config.resolve.alias['lodash'] = 'lodash-es';
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
