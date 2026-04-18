import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Strongly-typed Link/useRouter for our routes.
  typedRoutes: true,

  // Compress by default (ok to leave on the platform as well).
  compress: true,

  // Image config — allow same-origin by default; extend per-deployment.
  images: {
    remotePatterns: [],
  },

  // Canonicalise the internal design-reference URL.
  // `/_design` is reserved for design-system examples; the actual folder on
  // disk is `src/app/design/` (Next treats `_`-prefixed folders as private).
  async rewrites() {
    return [
      { source: "/_design", destination: "/design" },
      { source: "/_design/:path*", destination: "/design/:path*" },
    ];
  },

  // Safer default headers.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
