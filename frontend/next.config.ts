import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only. Next blocks cross-origin requests to dev assets by default, which
  // silently starves a phone on the LAN of its JS chunks — the page renders but
  // nothing is interactive. The wildcard survives a DHCP lease change.
  allowedDevOrigins: ["192.168.1.143", "192.168.1.*"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
