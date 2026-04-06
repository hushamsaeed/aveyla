/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
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
