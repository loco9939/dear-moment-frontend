import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: {
    // 컴파일러 옵션들...
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": "/app", // app 디렉토리에 대한 절대 경로 설정
    };
    return config;
  },
};

export default nextConfig;
