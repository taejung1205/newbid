/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "netlify",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  ignoredRouteFiles: ["**/.*"],
  serverDependenciesToBundle: ["swiper", 'swiper/react','swiper/css', 'swiper/css/navigation', 'swiper/css/pagination', 'ssr-window', 'dom7']
  // appDirectory: "app", 
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: ".netlify/functions-internal/server.js",
  // publicPath: "/build/",
};
