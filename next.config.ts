import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['cdn.domain.com', 'images.unsplash.com', 'cdn.aboutstatic.com', 'upload.wikimedia.org',
      'en.wikipedia.org',
    ], // például
  },
};
export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: [
//       'cdn.domain.com',
//       'images.unsplash.com',
//       'cdn.aboutstatic.com',
//       'upload.wikimedia.org',
//       'en.wikipedia.org',
//     ],
//   },
//   experimental: {
//     appDir: true,
//   },
// };

// export default nextConfig;
