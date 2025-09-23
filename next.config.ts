import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
       protocol: "https",
        hostname: "ecommerce.routemisr.com",
        port: "", // مفيش بورت هنا، سيبه فاضي
        pathname: "/**", // اسمح بكل الصور من السيرفر ده
      },
    ],
  },
};

export default nextConfig;
