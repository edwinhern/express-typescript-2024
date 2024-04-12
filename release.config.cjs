/**
 * @type {import('semantic-release').GlobalConfig}
 */
// eslint-disable-next-line no-undef
module.exports = {
  branches: ['master'],
  plugins: [
    '@semantic-release/commit-analyzer', // Analyzes your commit messages and determines the type of version bump
    '@semantic-release/release-notes-generator', // Generates release notes based on commit messages
    '@semantic-release/changelog', // Updates the CHANGELOG.md file
    '@semantic-release/npm', // If you're publishing to npm, this updates the version in package.json and publishes the package
    '@semantic-release/github', // Creates a GitHub release
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
        message: 'chore(release): :bookmark: bump version ${nextRelease.version}',
      },
    ],
  ],
};
