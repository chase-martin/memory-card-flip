module.exports = {
  cache: {
    cacheId: "memory-card-flip",
    runtimeCaching: [{
      handler: "fastest",
      urlPattern: "\/$"
    }],
    staticFileGlobs: ['dist/**/*']
  },
  manifest: {
    background: "#FFFFFF",
    title: "memory-card-flip",
    short_name: "PWA",
    theme_color: "#FFFFFF"
  }
};
