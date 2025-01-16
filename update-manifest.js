/**
 * Add the commit hash to the version reporter / manifest
 */
const fs = require('fs');

const commitHash = process.argv[2];

if (!commitHash) {
  console.error('Missing args, expect 1 got', process.argv.length - 2);
  console.error('Example: node update-manifest.js commitHashId123');
  return;
}

const buildDate = new Date().toISOString();

const matchExists = (manifest, regex) => {
  if (!manifest.match(regex)) {
    console.error('Property', regex, 'missing from manifest');
    return;
  }
};

console.log('\n#########');
const manifestPath = `./manifest.json`;
console.log('Updating application manifest:', manifestPath);

let manifest = fs.readFileSync(manifestPath, 'utf-8');

const commitPattern = '"commitId": ""';
const buildPattern = '"buildDate": ""';
matchExists(commitPattern);
matchExists(buildPattern);

manifest = manifest.replace(new RegExp(commitPattern, 'ig'), `"commitId": "${commitHash}"`);
manifest = manifest.replace(new RegExp(buildPattern, 'ig'), `"buildDate": "${buildDate}"`);
fs.writeFileSync(manifestPath, manifest, 'utf-8');
console.log('Hashed with:', commitHash);
console.log('Build date:', buildDate);
console.log('#########\n');