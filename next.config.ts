import type { NextConfig } from 'next';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require('next-pwa')({
  dest: 'public',
});

const nextConfig: NextConfig = {
  compiler: {
    // 컴파일러 옵션들...
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.objectstorage.ap-chuncheon-1.oci.customer-oci.com',
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  // API 요청에 대한 프록시 설정 추가
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || 'https://dearmoment.o-r.kr'}/api/:path*`,
      },
    ];
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

module.exports = withPWA(nextConfig);
