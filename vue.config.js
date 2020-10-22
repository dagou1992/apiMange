module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7002',
        changeOrigin: true,
      },
    },
  },
};
