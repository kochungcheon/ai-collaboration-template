#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const clipboardy = require('clipboardy');
const yaml = require('js-yaml');

const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    red: '\x1b[31m',
};

const MAX_SUGGESTIONS = 11;

function getPromptKey(prompt) {
    return prompt.id || prompt.name || prompt.file || JSON.stringify(prompt);
}

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

const prompts = [
    {
        id: 'backend-java',
        name: '백엔드 문서 생성 (Java/Spring Boot)',
        file: 'meta/BACKEND_GENERATOR.md',
        shortcut: 'backend',
        keywords: ['backend', 'java', 'spring', 'generate', '백엔드', '생성'],
        description: 'PRD를 기반으로 Java/Spring Boot 백엔드 문서 8개를 자동 생성합니다.',
    },
    {
        id: 'backend-python',
        name: '백엔드 문서 생성 (Python/FastAPI)',
        file: 'examples/python-django/BACKEND_GENERATOR.md',
        shortcut: 'fastapi',
        keywords: ['backend', 'python', 'fastapi', 'generate', '백엔드', '생성'],
        description: 'PRD를 기반으로 Python/FastAPI 백엔드 문서를 자동 생성합니다.',
    },
    {
        id: 'backend-nodejs',
        name: '백엔드 문서 생성 (Node.js/NestJS)',
        file: 'examples/nodejs-nestjs/BACKEND_GENERATOR.md',
        shortcut: 'nest',
        keywords: ['backend', 'nodejs', 'nestjs', 'typescript', 'generate', '백엔드', '생성'],
        description: 'PRD를 기반으로 Node.js/NestJS 백엔드 문서를 자동 생성합니다.',
    },
    {
        id: 'frontend',
        name: '프론트엔드 문서 생성',
        file: 'meta/FRONTEND_GENERATOR.md',
        shortcut: 'frontend',
        keywords: ['frontend', 'react', 'vue', 'generate', '프론트엔드', '생성'],
        description: 'PRD와 API를 기반으로 프론트엔드 문서 6개를 자동 생성합니다.',
    },
    {
        id: 'update-all',
        name: 'Documentation Update - All Docs',
        file: 'meta/UPDATE_PROMPT.md',
        section: '프롬프트 1',
        shortcut: 'update-all',
        keywords: ['documentation update', 'doc', 'update', 'prd', 'all', '업데이트', '전체', '수정'],
        description: 'PRD 수정 후 모든 문서를 재검토하고 업데이트합니다.',
    },
    {
        id: 'update-api',
        name: 'Documentation Update - API Only',
        file: 'meta/UPDATE_PROMPT.md',
        section: '프롬프트 2-A',
        shortcut: 'update-api',
        keywords: ['documentation update', 'doc', 'update', 'api', 'endpoint', '업데이트', 'API'],
        description: 'PRD 변경 사항을 API.md에만 반영합니다.',
    },
    {
        id: 'update-db',
        name: 'Documentation Update - DB Only',
        file: 'meta/UPDATE_PROMPT.md',
        section: '프롬프트 2-B',
        shortcut: 'update-db',
        keywords: ['documentation update', 'doc', 'update', 'database', 'db', 'schema', '업데이트', '데이터베이스'],
        description: 'PRD 변경 사항을 DATABASE.md에만 반영합니다.',
    },
    {
        id: 'verify',
        name: '문서 일관성 검증',
        file: 'meta/UPDATE_PROMPT.md',
        section: '프롬프트 3',
        shortcut: 'verify',
        keywords: ['verify', 'validate', 'consistency', '검증', '일관성', 'docs', 'documentation'],
        description: '모든 문서 간 일관성을 체크하고 댕글링 참조를 찾습니다.',
    },
    {
        id: 'review-commit',
        name: '커밋 코드 리뷰',
        file: 'meta/CODE_REVIEW.md',
        section: '프롬프트 1',
        shortcut: 'review-commit',
        keywords: ['review', 'commit', 'code', '리뷰', '커밋'],
        description: '최근 커밋의 코드를 리뷰합니다 (컨벤션, 보안, 성능).',
    },
    {
        id: 'review-file',
        name: '특정 파일 코드 리뷰',
        file: 'meta/CODE_REVIEW.md',
        section: '프롬프트 2',
        shortcut: 'review-file',
        keywords: ['review', 'file', 'code', '리뷰', '파일'],
        description: '특정 파일만 코드 리뷰합니다.',
    },
    {
        id: 'review-pr',
        name: 'Pull Request 리뷰',
        file: 'meta/CODE_REVIEW.md',
        section: '프롬프트 3',
        shortcut: 'review-pr',
        keywords: ['review', 'pr', 'pull request', '리뷰', 'PR'],
        description: 'Pull Request 전체를 리뷰합니다.',
    },
];

const metadataCache = new Map();

function searchPrompts(query) {
    if (!query) return prompts;
    const normalized = query.trim().toLowerCase();
    if (!normalized) return prompts;

    const promptInfos = prompts.map(prompt => {
        const keywords = Array.isArray(prompt.keywords) ? prompt.keywords : [];
        const normalizedKeywords = keywords.map(keyword => String(keyword).toLowerCase());
        const shortcuts = getShortcuts(prompt).map(shortcut => shortcut.toLowerCase());
        return {
            prompt,
            key: getPromptKey(prompt),
            name: (prompt.name || '').toLowerCase(),
            description: (prompt.description || '').toLowerCase(),
            id: (prompt.id || '').toLowerCase(),
            keywords: normalizedKeywords,
            shortcuts,
        };
    });

    const seen = new Set();
    const ordered = [];

    const addMatches = matcher => {
        promptInfos.forEach(info => {
            if (matcher(info) && !seen.has(info.key)) {
                seen.add(info.key);
                ordered.push(info.prompt);
            }
        });
    };

    addMatches(info => info.name.startsWith(normalized));
    addMatches(info => info.shortcuts.some(shortcut => shortcut.startsWith(normalized)));
    addMatches(info => info.id.startsWith(normalized));
    addMatches(info => info.keywords.some(keyword => keyword.startsWith(normalized)));
    addMatches(info => info.name.includes(normalized));
    addMatches(info => info.shortcuts.some(shortcut => shortcut.includes(normalized)));
    addMatches(info => info.id.includes(normalized));
    addMatches(info => info.keywords.some(keyword => keyword.includes(normalized)));
    addMatches(info => info.description.includes(normalized));

    return ordered;
}

function loadPromptFile(prompt) {
    if (metadataCache.has(prompt.file)) {
        return metadataCache.get(prompt.file);
    }

    const filePath = path.join(process.cwd(), prompt.file);
    if (!fs.existsSync(filePath)) {
        throw new Error(`파일을 찾을 수 없습니다: ${prompt.file}`);
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    let metadata = {};
    let body = raw;

    if (raw.startsWith('---')) {
        const endIndex = raw.indexOf('\n---', 3);
        if (endIndex !== -1) {
            const frontmatter = raw.substring(3, endIndex + 1);
            try {
                metadata = yaml.load(frontmatter) || {};
            } catch (error) {
                console.warn(`⚠️  frontmatter 파싱 실패 (${prompt.file}): ${error.message}`);
            }
            body = raw.substring(endIndex + 4).trim();
        }
    }

    const data = { metadata, body };
    metadataCache.set(prompt.file, data);
    return data;
}

function readPrompt(prompt) {
    const { body } = loadPromptFile(prompt);

    if (prompt.section) {
        const sectionRegex = new RegExp(`### ${prompt.section}[\\s\\S]*?\`\`\`([\\s\\S]*?)\`\`\``, 'i');
        const match = body.match(sectionRegex);
        if (match) {
            return match[1].trim();
        }
    }

    const codeBlockRegex = /```(?:markdown)?\n([\s\S]*?)\n```/;
    const match = body.match(codeBlockRegex);
    if (match) {
        return match[1].trim();
    }

    return body;
}

function getPromptMetadata(prompt) {
    const { metadata } = loadPromptFile(prompt);
    return metadata || {};
}

function getShortcuts(prompt) {
    const metadata = getPromptMetadata(prompt);
    const shortcuts = [];
    if (prompt.shortcut) shortcuts.push(String(prompt.shortcut).toLowerCase());
    if (metadata.prompt_id) shortcuts.push(String(metadata.prompt_id).toLowerCase());
    return shortcuts;
}

function copyToClipboard(text) {
    return clipboardy.write(text);
}

function displayPromptDetails(metadata = {}) {
    if (!metadata || Object.keys(metadata).length === 0) return;
    log('\n🧾 프롬프트 정보', 'bright');
    if (metadata.prompt_id) log(`- ID: ${metadata.prompt_id}`, 'reset');
    if (metadata.description) log(`- 설명: ${metadata.description}`, 'reset');
    if (metadata.outputs) {
        const outputs = Array.isArray(metadata.outputs) ? metadata.outputs : [];
        if (outputs.length > 0) log(`- 생성 문서: ${outputs.join(', ')}`, 'reset');
    }
    if (metadata.inputs) {
        log('- 입력값:', 'reset');
        const normalized = normalizeInputs(metadata.inputs);
        normalized.forEach(input => {
            const optionalMark = input.optional ? ' (optional)' : '';
            log(`  • ${input.key}${optionalMark}: ${input.description || ''}`, 'reset');
        });
    }
    log('', 'reset');
}

function normalizeInputs(inputs) {
    if (!inputs) return [];
    const list = [];
    if (Array.isArray(inputs)) {
        inputs.forEach(item => {
            if (typeof item === 'string') {
                list.push({ key: item, description: '' });
            } else if (item && typeof item === 'object') {
                const [key, value] = Object.entries(item)[0];
                list.push(formatInputDefinition(key, value));
            }
        });
    } else if (typeof inputs === 'object') {
        Object.entries(inputs).forEach(([key, value]) => {
            list.push(formatInputDefinition(key, value));
        });
    }
    return list;
}

function formatInputDefinition(key, value) {
    if (typeof value === 'string') {
        return { key, description: value };
    }
    if (value && typeof value === 'object') {
        return {
            key,
            description: value.description || '',
            optional: value.optional || value.required === false,
            defaultValue: value.default,
        };
    }
    return { key, description: '' };
}

async function question(rl, message) {
    return new Promise(resolve => {
        rl.question(`${colors.blue}❯${colors.reset} ${message}`, answer => {
            resolve(answer.trim());
        });
    });
}

async function maybeFillInputs(rl, metadata, promptText) {
    const inputs = normalizeInputs(metadata.inputs);
    if (inputs.length === 0) return promptText;

    const answer = await question(rl, '입력값을 채울까요? (Enter=Skip / y=Yes): ');
    if (answer.toLowerCase() !== 'y') return promptText;

    let updatedPrompt = promptText;
    for (const input of inputs) {
        const desc = input.description ? ` (${input.description})` : '';
        const defaultHint = input.defaultValue ? ` [기본값: ${input.defaultValue}]` : '';
        const response = await question(rl, `[${input.key}]${desc}${defaultHint}: `);
        const value = response || input.defaultValue;
        if (value) {
            const regex = new RegExp(`{{\s*${escapeRegExp(input.key)}\s*}}`, 'g');
            updatedPrompt = updatedPrompt.replace(regex, value);
        }
    }

    return updatedPrompt;
}

function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function displayPrompts(list, query, offset = 0) {
    if (query) {
        log(`🔍 검색: "${query}"`, 'yellow');
        log('', 'reset');
    }
    if (list.length === 0) {
        log('❌ 검색 결과가 없습니다.', 'yellow');
        log('', 'reset');
        return;
    }
    list.forEach((prompt, index) => {
        const metadata = getPromptMetadata(prompt);
        const title = metadata.name || prompt.name;
        const desc = metadata.description || prompt.description || '';
        const shortcuts = getShortcuts(prompt);
        const shortcutText = shortcuts.length > 0 ? ` [${shortcuts.join(', ')}]` : '';
        log(`${colors.bright}${offset + index + 1}.${colors.reset} ${colors.green}${title}${colors.reset}${shortcutText}`);
        if (desc) {
            log(`   ${desc}`, 'reset');
        }
        log('', 'reset');
    });
}

function getPromptDisplayInfo(prompt) {
    const metadata = getPromptMetadata(prompt);
    return {
        title: metadata.name || prompt.name,
        description: metadata.description || prompt.description || '',
        shortcuts: getShortcuts(prompt),
    };
}

function renderSuggestionList(list, selectedIndex) {
    list.forEach((prompt, index) => {
        const { title, description, shortcuts } = getPromptDisplayInfo(prompt);
        const isSelected = index === selectedIndex;
        const pointer = isSelected ? `${colors.cyan}▌${colors.reset}` : ' ';
        const titleColor = isSelected ? 'bright' : 'green';
        const shortcutText = shortcuts.length > 0 ? ` [${shortcuts.join(', ')}]` : '';
        log(`${pointer} ${colors[titleColor]}${title}${colors.reset}${shortcutText}`);
        if (description) {
            log(`   ${description}`, 'reset');
        }
        log('', 'reset');
    });
}

async function runPromptWorkflow(selected) {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    try {
        log(`\n📋 프롬프트를 읽는 중...`, 'yellow');
        const promptText = readPrompt(selected);
        const metadata = getPromptMetadata(selected);
        displayPromptDetails(metadata);
        const finalPrompt = await maybeFillInputs(rl, metadata, promptText);
        log(`📋 클립보드에 복사 중...`, 'yellow');
        await copyToClipboard(finalPrompt);
        const promptName = metadata.name || selected.name;
        log(`\n✅ "${promptName}" 프롬프트가 클립보드에 복사되었습니다!`, 'green');
        log(`\n💡 이제 AI 챗봇에 붙여넣기(Cmd+V 또는 Ctrl+V)하세요.\n`, 'cyan');
        log('─────────────────────────────────────────────────────────────────', 'cyan');
        log('프롬프트 미리보기 (처음 5줄):', 'bright');
        const preview = finalPrompt.split('\n').slice(0, 5).join('\n');
        log(preview, 'reset');
        log('...', 'reset');
        log('─────────────────────────────────────────────────────────────────\n', 'cyan');
        await question(rl, '계속하려면 Enter를 누르세요...');
    } catch (error) {
        log(`\n❌ 오류: ${error.message}\n`, 'red');
        await question(rl, '계속하려면 Enter를 누르세요...');
    } finally {
        rl.close();
    }
}

async function promptUserSelection() {
    if (!process.stdin.isTTY || typeof process.stdin.setRawMode !== 'function') {
        return promptUserSelectionFallback();
    }

    return new Promise(resolve => {
        readline.emitKeypressEvents(process.stdin);
        const state = {
            query: '',
            candidates: [],
            selectedIndex: -1,
            showingAll: false,
        };

        const wasRaw = !!process.stdin.isRaw;
        if (!wasRaw) {
            process.stdin.setRawMode(true);
        }
        process.stdin.resume();

        const cleanup = () => {
            process.stdin.removeListener('keypress', onKeypress);
            if (!wasRaw) {
                process.stdin.setRawMode(false);
            }
            process.stdin.pause();
        };

        const exitSelector = () => {
            cleanup();
            console.clear();
            resolve(null);
        };

        const commitSelection = prompt => {
            if (!prompt) return;
            cleanup();
            console.clear();
            resolve(prompt);
        };

        const normalizeQuery = raw => {
            const trimmed = raw.trim();
            if (!trimmed) return { trimmed, normalized: '', showingAll: false };
            if (trimmed === '/') {
                return { trimmed, normalized: '', showingAll: true };
            }
            if (trimmed.startsWith('/')) {
                return { trimmed, normalized: trimmed.slice(1), showingAll: false };
            }
            return { trimmed, normalized: trimmed, showingAll: false };
        };

        const updateCandidates = () => {
            const { trimmed, normalized, showingAll } = normalizeQuery(state.query);
            state.showingAll = showingAll;
            if (!trimmed) {
                state.candidates = [];
                state.selectedIndex = -1;
                return;
            }
            const query = showingAll ? '' : normalized;
            state.candidates = showingAll ? prompts : searchPrompts(query);
            const visibleCount = Math.min(state.candidates.length, MAX_SUGGESTIONS);
            if (visibleCount === 0) {
                state.selectedIndex = -1;
                return;
            }
            if (state.selectedIndex < 0) {
                state.selectedIndex = 0;
            } else if (state.selectedIndex >= visibleCount) {
                state.selectedIndex = visibleCount - 1;
            }
        };

        const render = () => {
            console.clear();
            log('╔════════════════════════════════════════════════════════════════╗', 'cyan');
            log('║          AI 협업 템플릿 - 프롬프트 선택기                      ║', 'cyan');
            log('╚════════════════════════════════════════════════════════════════╝', 'cyan');
            log('', 'reset');
            log('실시간 검색: 키워드를 입력하고 추천 목록을 화살표로 이동하세요.', 'reset');
            log('↑/↓: 이동   Enter: 실행   Tab: 상단 실행   Esc: 종료', 'yellow');
            log('', 'reset');
            const inputDisplay = state.query.length > 0 ? state.query : '(입력 없음)';
            log(`입력: ${colors.bright}${inputDisplay}${colors.reset}`, 'reset');
            log('', 'reset');

            const trimmed = state.query.trim();
            if (!trimmed) {
                log('검색어를 입력하면 추천이 표시됩니다. "/"를 입력하면 전체 목록을 볼 수 있습니다.', 'yellow');
                return;
            }

            if (state.showingAll) {
                log('모든 프롬프트를 표시 중입니다.', 'blue');
                log('', 'reset');
            }

            const visible = state.candidates.slice(0, MAX_SUGGESTIONS);
            if (visible.length === 0) {
                log('❌ 검색 결과가 없습니다.', 'red');
                return;
            }

            renderSuggestionList(visible, state.selectedIndex);
            if (state.candidates.length > visible.length) {
                log(`...외 ${state.candidates.length - visible.length}개 결과`, 'cyan');
            }
        };

        const moveSelection = direction => {
            const visibleCount = Math.min(state.candidates.length, MAX_SUGGESTIONS);
            if (visibleCount === 0) return;
            if (direction === 'down') {
                state.selectedIndex = (state.selectedIndex + 1) % visibleCount;
            } else {
                state.selectedIndex = state.selectedIndex <= 0 ? visibleCount - 1 : state.selectedIndex - 1;
            }
            render();
        };

        const onKeypress = (str, key = {}) => {
            if (key.sequence === '\u0003' || (key.ctrl && key.name === 'c')) {
                cleanup();
                console.clear();
                process.exit(0);
                return;
            }

            if (key.name === 'escape') {
                exitSelector();
                return;
            }

            if (key.name === 'return' || key.name === 'enter') {
                if (state.candidates.length === 0) return;
                const visibleIndex = state.selectedIndex >= 0 ? state.selectedIndex : 0;
                commitSelection(state.candidates[visibleIndex]);
                return;
            }

            if (key.name === 'tab') {
                if (state.candidates.length === 0) return;
                commitSelection(state.candidates[0]);
                return;
            }

            if (key.name === 'down') {
                moveSelection('down');
                return;
            }

            if (key.name === 'up') {
                moveSelection('up');
                return;
            }

            if (key.name === 'backspace') {
                if (state.query.length === 0) return;
                state.query = state.query.slice(0, -1);
                updateCandidates();
                render();
                return;
            }

            if (key.ctrl && key.name === 'u') {
                if (state.query.length === 0) return;
                state.query = '';
                updateCandidates();
                render();
                return;
            }

            if (!key.ctrl && !key.meta && str) {
                state.query += str;
                updateCandidates();
                render();
            }
        };

        updateCandidates();
        render();
        process.stdin.on('keypress', onKeypress);
    });
}

async function promptUserSelectionFallback() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    try {
        while (true) {
            console.clear();
            log('╔════════════════════════════════════════════════════════════════╗', 'cyan');
            log('║          AI 협업 템플릿 - 프롬프트 선택기                      ║', 'cyan');
            log('╚════════════════════════════════════════════════════════════════╝', 'cyan');
            log('', 'reset');
            displayPrompts(prompts, '', 0);
            const answer = await question(rl, `사용할 프롬프트 번호를 입력하세요 (1-${prompts.length}, q=종료): `);
            const trimmed = answer.trim().toLowerCase();
            if (['q', 'quit', 'exit'].includes(trimmed)) {
                return null;
            }
            const index = parseInt(trimmed, 10);
            if (!Number.isNaN(index) && index >= 1 && index <= prompts.length) {
                return prompts[index - 1];
            }
            log('\n❌ 유효한 번호를 입력하세요. Enter를 눌러 계속합니다.', 'red');
            await question(rl, '');
        }
    } finally {
        rl.close();
    }
}

async function main() {
    while (true) {
        const selected = await promptUserSelection();
        if (!selected) break;
        await runPromptWorkflow(selected);
    }
}

function clearMetadataCache() {
    metadataCache.clear();
}

if (require.main === module) {
    main().catch(error => {
        console.error('오류:', error);
        process.exit(1);
    });
}

module.exports = {
    loadPromptFile,
    normalizeInputs,
    clearMetadataCache,
};
