import type { NextConfig } from "next";

/* 
0
: 
"i.imgur.com"
1
: 
"placehold.co"
2
: 
"api.escuelajs.co"
3
: 
"reqres.in"
4
: 
"pravatar.cc"
5
: 
"placeimg.com"
6
: 
"cdn-imgix.headout.com"
7
: 
"www.davis-barber.com"
*/

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "placeimg.com",
      },
      {
        protocol: "https",
        hostname: "api.escuelajs.co",
      },
      {
        protocol: "https",
        hostname: "reqres.in",
      },
      {
        protocol: "https",
        hostname: "pravatar.cc",
      },
      {
        protocol: "http",
        hostname: "smith.info",
      },
      {
        protocol: "https",
        hostname: "cdn-imgix.headout.com",
      },
      {
        protocol: "https",
        hostname: "www.davis-barber.com",
      },
    ],
  },
};

export default nextConfig;
