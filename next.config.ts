import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  compiler: {
    // 컴파일러 옵션들...
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            dimensions: false,
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': '/app',
    };

    return config;
  },
};

export default nextConfig;
