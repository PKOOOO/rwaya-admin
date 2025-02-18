/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com"],
    },
    experimental: {
        serverActions: true, // If you're using Server Actions, keep this
      },
      output: "standalone", // Ensures a full Node.js environment
      runtime: "nodejs", // Enforces Node.js runtime
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
