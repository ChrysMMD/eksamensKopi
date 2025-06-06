/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  output: 'standalone',
  images: {
    domains: [
      "iip-thumb.smk.dk",     
      "www.smk.dk",           
      "api.smk.dk",           
      "iiif-snapshot.smk.dk"  
    ],
  },
};

module.exports = nextConfig;
