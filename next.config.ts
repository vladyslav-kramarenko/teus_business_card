import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["cms.teus-group.com"], // Add your Strapi domain to allow loading images
    },
    // Add other config options if needed
};

export default nextConfig;
