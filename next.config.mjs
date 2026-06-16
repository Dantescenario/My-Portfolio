/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "img-src 'self' https://cdn.jsdelivr.net https://cdn.simpleicons.org data:",
              "media-src 'self' https://res.cloudinary.com",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "connect-src 'self' https://res.cloudinary.com https://cdn.jsdelivr.net",
            ].join('; '),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
