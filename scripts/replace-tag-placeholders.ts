#!/usr/bin/env node
import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const PLACEHOLDER = '{{LATEST_TAG}}';

function getLatestTag(): string {
  try {
    const tag = execSync('git tag --sort=-v:refname | head -1', {
      cwd: rootDir,
      encoding: 'utf-8',
    }).trim();

    if (!tag) {
      throw new Error('No git tags found');
    }

    return tag;
  } catch (error) {
    console.error('Failed to get latest git tag:', error);
    throw error;
  }
}

function processDirectory(dirPath: string, latestTag: string): number {
  let filesProcessed = 0;
  const entries = readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      filesProcessed += processDirectory(fullPath, latestTag);
    } else if (entry.endsWith('.md')) {
      const content = readFileSync(fullPath, 'utf-8');

      if (content.includes(PLACEHOLDER)) {
        const updatedContent = content.replaceAll(PLACEHOLDER, latestTag);
        writeFileSync(fullPath, updatedContent, 'utf-8');
        filesProcessed++;
      }
    }
  }

  return filesProcessed;
}

function main() {
  const latestTag = getLatestTag();
  const docsDir = join(rootDir, 'docs');
  processDirectory(docsDir, latestTag);
}

main();
