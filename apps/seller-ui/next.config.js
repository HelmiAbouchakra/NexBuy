//@ts-check
const { composePlugins, withNx } = require("@nx/next");
const path = require("path");

/** @type {import('@nx/next/plugins/with-nx').WithNxOptions} **/
const nextConfig = {
  nx: {},

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@packages": path.resolve(__dirname, "../../packages"),
    };

    return config;
  },
};

module.exports = composePlugins(withNx)(nextConfig);
