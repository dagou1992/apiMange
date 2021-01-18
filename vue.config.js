module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.3.110:7001',
        changeOrigin: true,
      },
    },
  },
};
