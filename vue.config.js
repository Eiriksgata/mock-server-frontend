module.exports = {
  publicPath:"./",
  pluginOptions: {
    i18n: {
      locale: 'zh_CH',
      fallbackLocale: 'zh_CH',
      localeDir: 'locales',
      enableInSFC: true
    }
  },
  devServer:{
    port: 8085,
    host: "localhost",
    open: true,
    proxy:{
      '/':{
        target: "http://localhost:7612",
        changOrigin:true,
        pathRewrite:{
          '^/api': ''
        }
      }
    }
  }
}
