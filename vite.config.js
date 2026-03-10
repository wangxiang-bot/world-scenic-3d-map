import { defineConfig } from 'vite';

function normalizeBase(basePath) {
  if (!basePath) return '/';

  const trimmed = String(basePath).trim();
  if (!trimmed || trimmed === '/') return '/';

  const withoutEdges = trimmed.replace(/^\/+|\/+$/g, '');
  return `/${withoutEdges}/`;
}

export default defineConfig(() => {
  const explicitBase = normalizeBase(process.env.VITE_BASE_PATH);

  if (explicitBase !== '/') {
    return {
      base: explicitBase,
    };
  }

  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
  const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const isUserSite = repoName.endsWith('.github.io');

  return {
    base: isGitHubActions && repoName && !isUserSite ? `/${repoName}/` : '/',
  };
});
