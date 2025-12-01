#!/usr/bin/env node

/**
 * AI 협업 템플릿 - 댕글링 참조 검증 스크립트
 * 
 * 이 스크립트는 문서 간 참조가 실제로 존재하는지 검증합니다.
 */

const fs = require('fs');
const path = require('path');

// 색상 출력
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    blue: '\x1b[34m',
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// 프로젝트 루트 찾기
const projectRoot = process.cwd();
const docsDir = path.join(projectRoot, 'docs');

const directoriesToValidate = ['docs', 'meta', 'examples'];
const rootFilesToValidate = ['AGENT.md', 'README.md', 'index.md'];

const optionalPaths = new Set([
    'frontend/AGENT.md',
    'frontend/docs/TECH_STACK.md',
    'frontend/docs/COMPONENTS.md',
    'frontend/docs/ROUTING.md',
    'frontend/docs/STATE_MANAGEMENT.md',
    'frontend/docs/CONVENTIONS.md',
    'AI_PROMPT_STRATEGY.md'
]);

function isInsideDir(filePath, dirPath) {
    const relative = path.relative(dirPath, filePath);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}

// 검증 결과
let errors = [];
let warnings = [];
let success = [];

/**
 * 파일 존재 여부 확인
 */
function fileExists(filePath) {
    return fs.existsSync(filePath);
}

/**
 * 마크다운 파일에서 파일 참조 추출
 */
function extractFileReferences(content) {
    const references = [];

    // 1. 마크다운 링크: [text](file:///path) 또는 [text](./path)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
        const link = match[2];
        if (link.startsWith('file://') || link.startsWith('./') || link.startsWith('../') || link.endsWith('.md')) {
            references.push({ type: 'file', value: link, context: match[0] });
        }
    }

    // 2. 백틱으로 감싼 파일 경로: `docs/API.md`
    const backtickRegex = /`([^`]*\.md)`/g;
    while ((match = backtickRegex.exec(content)) !== null) {
        references.push({ type: 'file', value: match[1], context: match[0] });
    }

    return references;
}

/**
 * API 엔드포인트 참조 추출
 */
function extractAPIReferences(content) {
    const references = [];

    // HTTP 메서드 + 경로: GET /users, POST /api/certifications
    const apiRegex = /(GET|POST|PUT|DELETE|PATCH)\s+(\/[^\s,\)]*)/g;
    let match;
    while ((match = apiRegex.exec(content)) !== null) {
        references.push({ type: 'api', method: match[1], path: match[2], context: match[0] });
    }

    return references;
}

/**
 * 테이블 참조 추출
 */
function extractTableReferences(content) {
    const references = [];

    // 테이블명 패턴: users, running_records 등 (snake_case 또는 camelCase)
    // 문맥: "테이블", "table", "FROM", "JOIN" 등과 함께 사용
    const tableRegex = /(?:테이블|table|FROM|JOIN|INTO|UPDATE)\s+`?([a-z_]+)`?/gi;
    let match;
    while ((match = tableRegex.exec(content)) !== null) {
        const tableName = match[1].toLowerCase();
        if (tableName.length > 2 && tableName !== 'fetch') { // 너무 짧은 단어 또는 JOIN FETCH 제외
            references.push({ type: 'table', value: tableName, context: match[0] });
        }
    }

    return references;
}

/**
 * API.md에서 정의된 모든 엔드포인트 추출
 */
function getDefinedAPIs() {
    const apiFile = path.join(docsDir, 'API.md');
    if (!fileExists(apiFile)) return [];

    const content = fs.readFileSync(apiFile, 'utf-8');
    const apis = new Set();

    const lines = content.split(/\r?\n/);
    let currentMethod = null;
    lines.forEach(line => {
        const methodMatch = line.match(/Method[^`]*`(GET|POST|PUT|DELETE|PATCH)`/i);
        if (methodMatch) {
            currentMethod = methodMatch[1].toUpperCase();
            return;
        }

        const pathMatch = line.match(/Path[^`]*`(\/[^`]+)`/i);
        if (pathMatch && currentMethod) {
            apis.add(`${currentMethod} ${pathMatch[1]}`);
            return;
        }
    });

    // 코드 블록 등에서 직접 표기한 GET /foo 패턴도 허용
    extractAPIReferences(content).forEach(api => {
        apis.add(`${api.method} ${api.path}`);
    });

    return Array.from(apis);
}

/**
 * DATABASE.md에서 정의된 모든 테이블 추출
 */
function getDefinedTables() {
    const dbFile = path.join(docsDir, 'DATABASE.md');
    if (!fileExists(dbFile)) return [];

    const content = fs.readFileSync(dbFile, 'utf-8');
    const tables = new Set();

    // 테이블 정의 패턴: ## 테이블명, CREATE TABLE 테이블명
    const tableDefRegex = /(?:##\s+|CREATE TABLE\s+)`?([a-z_]+)`?/gi;
    let match;
    while ((match = tableDefRegex.exec(content)) !== null) {
        tables.add(match[1].toLowerCase());
    }

    return Array.from(tables);
}

/**
 * 파일 참조 검증
 */
function validateFileReferences(filePath, references) {
    const fileDir = path.dirname(filePath);

    references.forEach(ref => {
        let targetPath = ref.value;

        // file:// 프로토콜 제거
        if (targetPath.startsWith('file://')) {
            targetPath = targetPath.replace('file://', '');
        }

        // 상대 경로 처리
        if (targetPath.startsWith('./') || targetPath.startsWith('../')) {
            targetPath = path.resolve(fileDir, targetPath);
        } else if (!path.isAbsolute(targetPath)) {
            targetPath = path.join(projectRoot, targetPath);
        }

        const relativeTarget = path.relative(projectRoot, targetPath);
        if (relativeTarget.includes('*')) {
            return;
        }

        if (optionalPaths.has(relativeTarget)) {
            return;
        }

        if (!fileExists(targetPath)) {
            if (!ref.value.startsWith('.') && !ref.value.startsWith('/') && !path.isAbsolute(ref.value)) {
                const docsCandidate = path.join(docsDir, ref.value);
                if (fileExists(docsCandidate)) {
                    success.push({
                        file: path.relative(projectRoot, filePath),
                        type: 'file',
                        reference: path.relative(projectRoot, docsCandidate),
                    });
                    return;
                }
            }

            errors.push({
                file: path.relative(projectRoot, filePath),
                type: 'file',
                message: `파일 참조 오류: ${ref.value}`,
                context: ref.context,
            });
        } else {
            success.push({
                file: path.relative(projectRoot, filePath),
                type: 'file',
                reference: ref.value,
            });
        }
    });
}

/**
 * API 참조 검증
 */
function validateAPIReferences(filePath, references, definedAPIs) {
    references.forEach(ref => {
        const apiSignature = `${ref.method} ${ref.path}`;
        if (!definedAPIs.includes(apiSignature)) {
            warnings.push({
                file: path.relative(projectRoot, filePath),
                type: 'api',
                message: `API 엔드포인트가 API.md에 정의되지 않음: ${apiSignature}`,
                context: ref.context,
            });
        }
    });
}

/**
 * 테이블 참조 검증
 */
function validateTableReferences(filePath, references, definedTables) {
    references.forEach(ref => {
        if (!definedTables.includes(ref.value)) {
            warnings.push({
                file: path.relative(projectRoot, filePath),
                type: 'table',
                message: `테이블이 DATABASE.md에 정의되지 않음: ${ref.value}`,
                context: ref.context,
            });
        }
    });
}

/**
 * 마크다운 파일 검증
 */
function validateMarkdownFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const isDocsFile = isInsideDir(filePath, docsDir);

    // 1. 파일 참조 검증
    const fileRefs = extractFileReferences(content);
    validateFileReferences(filePath, fileRefs);

    // 2. API 참조 검증 (docs/ 하위 파일만)
    if (isDocsFile && !filePath.endsWith('API.md')) {
        const apiRefs = extractAPIReferences(content);
        const definedAPIs = getDefinedAPIs();
        validateAPIReferences(filePath, apiRefs, definedAPIs);
    }

    // 3. 테이블 참조 검증 (docs/ 하위 파일만)
    if (isDocsFile && !filePath.endsWith('DATABASE.md')) {
        const tableRefs = extractTableReferences(content);
        const definedTables = getDefinedTables();
        validateTableReferences(filePath, tableRefs, definedTables);
    }
}

/**
 * 디렉토리 내 모든 마크다운 파일 검증
 */
function validateDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            validateDirectory(filePath);
        } else if (file.endsWith('.md')) {
            validateMarkdownFile(filePath);
        }
    });
}

/**
 * 메인 실행
 */
function main() {
    log('\n🔍 댕글링 참조 검증 시작...\n', 'blue');

    directoriesToValidate.forEach(dirName => {
        const dirPath = path.join(projectRoot, dirName);
        if (fileExists(dirPath)) {
            log(`📂 ${dirName}/ 폴더 검증 중...`, 'blue');
            validateDirectory(dirPath);
        }
    });

    rootFilesToValidate.forEach(file => {
        const filePath = path.join(projectRoot, file);
        if (fileExists(filePath)) {
            validateMarkdownFile(filePath);
        }
    });

    // 결과 출력
    log('\n📊 검증 결과:\n', 'blue');

    if (errors.length > 0) {
        log(`🔴 오류 (${errors.length}개):`, 'red');
        errors.forEach(err => {
            log(`  - [${err.file}] ${err.message}`, 'red');
            log(`    컨텍스트: ${err.context}`, 'yellow');
        });
        log('');
    }

    if (warnings.length > 0) {
        log(`⚠️  경고 (${warnings.length}개):`, 'yellow');
        warnings.forEach(warn => {
            log(`  - [${warn.file}] ${warn.message}`, 'yellow');
        });
        log('');
    }

    log(`✅ 성공 (${success.length}개 참조 검증 완료)`, 'green');

    // 종료 코드
    if (errors.length > 0) {
        log('\n❌ 검증 실패: 댕글링 참조가 발견되었습니다.', 'red');
        process.exit(1);
    } else if (warnings.length > 0) {
        log('\n⚠️  검증 완료: 경고가 있지만 치명적이지 않습니다.', 'yellow');
        process.exit(0);
    } else {
        log('\n✅ 검증 성공: 모든 참조가 유효합니다!', 'green');
        process.exit(0);
    }
}

main();
