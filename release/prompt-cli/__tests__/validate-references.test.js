const path = require('path');
const { spawnSync } = require('child_process');

const scriptPath = path.resolve(__dirname, '../scripts/validate-references.js');

function runValidate(fixtureName) {
    const cwd = path.resolve(__dirname, '../tests/fixtures', fixtureName);
    const result = spawnSync('node', [scriptPath], { cwd, encoding: 'utf-8' });
    return result;
}

describe('validate-references script', () => {
    test('passes on valid template fixture', () => {
        const result = runValidate('valid-template');
        expect(result.status).toBe(0);
        expect(result.stdout).toContain('✅ 검증 성공');
    });

    test('fails on broken template fixture', () => {
        const result = runValidate('broken-template');
        expect(result.status).not.toBe(0);
        expect(result.stdout).toContain('파일 참조 오류');
    });
});
