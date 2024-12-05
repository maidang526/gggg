   /** @type {import('next').NextConfig} */
   const nextConfig = {
     images: {
       domains: ['images.unsplash.com'],
       remotePatterns: [
         {
           protocol: 'https',
           hostname: 'images.unsplash.com',
           port: '',
           pathname: '/**',
         },
       ],
     },
     eslint: {
       ignoreDuringBuilds: true,
     },
     typescript: {
       ignoreBuildErrors: true,
     }
   }

   module.exports = nextConfig
