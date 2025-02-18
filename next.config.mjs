/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com"],
    },
    experimental: {
      runtime: "nodejs",
    },
  };
  
  export default nextConfig;
  

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//    images: {
//     domains: [
//         "res.cloudinary.com"
//     ]
//    }
// };

// export default nextConfig;
