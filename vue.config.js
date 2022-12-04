module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/image-minify/'
    : '/',
  outputDir: 'image-minify',
  pwa: {
    name: 'Image Minify',
    themeColor: '#69A88D',
    manifestOptions: {
      start_url: '/image-minify',
    }
  }
}
