// next.config.mjs
/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  experimental: { optimizePackageImports: ['react', 'react-dom'] },
};

// Turbopack warning fix: hanya aktifkan bundle-analyzer saat ANALYZE=true
// dan *bukan* sedang pakai Turbopack.
const usingTurbopack = !!process.env.TURBOPACK;

let config = baseConfig;

if (process.env.ANALYZE === 'true' && !usingTurbopack) {
  // top-level await valid di ESM .mjs
  const { default: bundleAnalyzer } = await import('@next/bundle-analyzer');
  const withBundleAnalyzer = bundleAnalyzer({ enabled: true });
  config = withBundleAnalyzer(config);
}

export default config;
