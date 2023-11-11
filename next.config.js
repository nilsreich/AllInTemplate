const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  //disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/app",
  sw: "service-worker.js",
});
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
}
module.exports = withPWA({
  // Your Next.js config
  nextConfig,
});
