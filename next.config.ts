import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "*",
        port: "",
        pathname: "/**"
      },
    ],
  },
  env: {
    name: "Bl3",
    description: "hello everybody",
    api_url: "http://localhost:4000/",
    // api_url: "http://localhost:4000/",
    ftp_url: "https://image.buoncf.jp/webThree/",

  }
};

export default nextConfig;
