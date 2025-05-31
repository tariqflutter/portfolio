export default function imageLoader({ src, width, quality }) {
  // Handle absolute URLs
  if (src.startsWith("http")) {
    return src
  }

  // Handle relative URLs for GitHub Pages
  const isProd = process.env.NODE_ENV === "production"
  const isGithubPages = process.env.GITHUB_PAGES === "true" || process.env.GITHUB_ACTIONS
  const repoName = "portfolio" // Replace with your repo name

  if (isProd && isGithubPages) {
    return `/${repoName}${src}?w=${width}&q=${quality || 75}`
  }

  return `${src}?w=${width}&q=${quality || 75}`
}
