/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/mhrima" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    dirs: ["app", "components"],
  },
  // Disable .nojekyll file creation - we'll add it manually
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
