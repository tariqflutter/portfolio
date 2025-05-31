/** @type {import('next').NextConfig} */

// Get the repository name from the environment or set it manually
const isProd = process.env.NODE_ENV === 'production'
const isGithubPages = process.env.GITHUB_PAGES === 'true' || process.env.GITHUB_ACTIONS

// Replace 'portfolio' with your actual repository name
const repoName = 'portfolio'

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  
  // Only add basePath and assetPrefix for GitHub Pages deployment
  ...(isProd && isGithubPages && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js'
  },
  
  // Disable server-side features for static export
  experimental: {
    esmExternals: 'loose'
  }
}

export default nextConfig
