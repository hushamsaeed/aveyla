/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/experiences", destination: "/activities", permanent: true },
      { source: "/scuba-diving", destination: "/activities/scuba-diving", permanent: true },
      { source: "/excursions", destination: "/activities/snorkelling", permanent: true },
      { source: "/copy-of-manta-madness-1", destination: "/packages/dive-dive-dive", permanent: true },
      { source: "/copy-of-dive-dive-dive-1", destination: "/packages/manta-madness", permanent: true },
      { source: "/copy-of-dive-hanifaru", destination: "/packages/dive-hanifaru", permanent: true },
    ];
  },
};

export default nextConfig;
