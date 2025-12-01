#!/usr/bin/env node

/**
 * 배포용 폴더를 자동으로 생성해 AI 템플릿과 스크립트를 분리합니다.
 */

const fs = require('fs');
const path = require('path');

const { promises: fsp } = fs;

const projectRoot = path.resolve(__dirname, '..');
const releaseRoot = path.join(projectRoot, 'release');

const packages = [
    {
        name: 'ai-md-templates',
        description: 'AI 문서 템플릿 모음 (docs, samples, 주요 안내문)',
        contents: [
            'docs',
            'samples',
            'AGENT.md',
            'index.md',
        ],
    },
    {
        name: 'prompt-cli',
        description: 'README + 템플릿 검색 CLI/테스트/프롬프트 메타',
        contents: [
            'README.md',
            'package.json',
            'package-lock.json',
            'jest.config.js',
            'scripts/prompt-cli.js',
            'scripts/validate-references.js',
            'meta',
            'examples',
            '__tests__',
            'tests',
        ],
    },
];

async function ensureDir(dirPath) {
    await fsp.mkdir(dirPath, { recursive: true });
}

async function removeDir(target) {
    await fsp.rm(target, { recursive: true, force: true });
}

async function copyRecursive(src, dest) {
    const stats = await fsp.stat(src);
    if (stats.isDirectory()) {
        await ensureDir(dest);
        const entries = await fsp.readdir(src);
        for (const entry of entries) {
            const childSrc = path.join(src, entry);
            const childDest = path.join(dest, entry);
            await copyRecursive(childSrc, childDest);
        }
        return;
    }

    await ensureDir(path.dirname(dest));
    await fsp.copyFile(src, dest);
}

async function buildPackage(definition) {
    const targetDir = path.join(releaseRoot, definition.name);
    await removeDir(targetDir);
    await ensureDir(targetDir);

    for (const relativePath of definition.contents) {
        const srcPath = path.join(projectRoot, relativePath);
        if (!fs.existsSync(srcPath)) {
            console.warn(`⚠️  ${relativePath} 파일(폴더)을 찾을 수 없어 건너뜁니다.`);
            continue;
        }
        const destPath = path.join(targetDir, relativePath);
        console.log(`→ ${definition.name}: ${relativePath}`);
        await copyRecursive(srcPath, destPath);
    }
}

async function writeManifest() {
    const manifest = {
        generatedAt: new Date().toISOString(),
        packages: packages.map(pkg => ({
            name: pkg.name,
            description: pkg.description,
            contents: pkg.contents,
        })),
    };
    await ensureDir(releaseRoot);
    await fsp.writeFile(path.join(releaseRoot, 'manifest.json'), JSON.stringify(manifest, null, 2), 'utf-8');
}

async function main() {
    await ensureDir(releaseRoot);
    for (const pkg of packages) {
        await buildPackage(pkg);
    }
    await writeManifest();
    console.log(`\n완료! release/ 폴더에 ${packages.length}개의 번들이 생성되었습니다.`);
}

main().catch(error => {
    console.error('배포 폴더 생성 중 오류 발생:', error);
    process.exit(1);
});
