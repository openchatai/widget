const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and in what order
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force Metro to resolve (sub)dependencies through the workspace directory
config.resolver.disableHierarchicalLookup = true;

// 4. Add additional Yarn workspace package roots to the module map
// This lets Metro know where to look for workspace packages
config.resolver.roots = [
    path.resolve(projectRoot, 'node_modules'),
    workspaceRoot,
];

// Add core directory to extraNodeModules
config.resolver.extraNodeModules = {
    '@core': path.resolve(workspaceRoot, 'core'),
};

module.exports = config; 