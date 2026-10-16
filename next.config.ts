import type { NextConfig } from "next";

/* 




4
: 
"kommodo.ai"
5
: 
"i.pravatar.cc"
6
: 
"th.bing.com"

8
: 
"cdn-icons-png.flaticon.com"
9
: 
"drive.google.com"
10
: 
"api.lorem.space"
11
: 
"www.google.com"
12
: 
"jennings.biz"
13
: 
"lh3.googleusercontent.com"
14
: 
"images.unsplash.com"
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
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placeimg.com" },
      { protocol: "https", hostname: "api.escuelajs.co" },
      { protocol: "https", hostname: "reqres.in" },
      { protocol: "https", hostname: "pravatar.cc" },
      { protocol: "http", hostname: "smith.info" },
      { protocol: "https", hostname: "cdn-imgix.headout.com" },
      { protocol: "https", hostname: "www.davis-barber.com" },
      { protocol: "https", hostname: "example.com" },
      { protocol: "https", hostname: "www.ebay.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "http", hostname: "nichols-sandoval.com" },
      { protocol: "http", hostname: "lopez.com" },
      { protocol: "https", hostname: "jimenez.biz" },
      { protocol: "http", hostname: "www.smith.info" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "http", hostname: "pruitt-harrell.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      // User avatar hostnames
      { protocol: "https", hostname: "kommodo.ai" },
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "th.bing.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "api.lorem.space" },
      { protocol: "https", hostname: "www.google.com" },
      { protocol: "https", hostname: "jennings.biz" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
