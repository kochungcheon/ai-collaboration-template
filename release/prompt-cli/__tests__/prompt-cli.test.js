const { loadPromptFile, normalizeInputs, clearMetadataCache } = require('../scripts/prompt-cli');

describe('prompt-cli metadata utilities', () => {
    beforeEach(() => {
        clearMetadataCache();
    });

    test('loads YAML frontmatter for backend generator', () => {
        const prompt = { file: 'meta/BACKEND_GENERATOR.md' };
        const { metadata, body } = loadPromptFile(prompt);

        expect(metadata).toBeDefined();
        expect(metadata.prompt_id).toBe('backend-docs');
        expect(Array.isArray(metadata.outputs)).toBe(true);
        expect(metadata.outputs).toContain('docs/TECH_STACK.md');
        expect(body).toContain('Prompt Template');
    });

    test('normalizes input definitions consistently', () => {
        const normalized = normalizeInputs({
            project_name: { description: '프로젝트 이름' },
            prd_path: 'PRD 경로',
            notes: { description: '추가 메모', optional: true, default: 'none' },
        });

        expect(normalized).toEqual([
            expect.objectContaining({ key: 'project_name', description: '프로젝트 이름', optional: false }),
            expect.objectContaining({ key: 'prd_path', description: 'PRD 경로' }),
            expect.objectContaining({ key: 'notes', description: '추가 메모', optional: true, defaultValue: 'none' }),
        ]);
    });
});
