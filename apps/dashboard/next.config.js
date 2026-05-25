const path = require("path");

/** @type {import("next").NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, "../.."),
  output: "standalone",
  transpilePackages: [
    "@reviewscope/security",
    "@reviewscope/llm-core",
    "@reviewscope/rules-engine",
    "@reviewscope/context-engine",
  ],
  typescript: {
    ignoreBuildErrors: false,
  },
  experimental: {
    cpus: 1,
  },
};

module.exports = nextConfig;
