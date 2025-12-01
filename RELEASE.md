# 배포 번들 가이드

이 저장소에서는 AI 문서 템플릿 묶음과 템플릿 검색 CLI를 **별도 폴더**로 내보내 `release/`에 보관합니다. README는 스크립트 번들과 함께 복제되어 CLI 사용법을 유지합니다.

## 생성 방법

```bash
npm run release
```

위 명령은 `release/` 아래에 다음 두 폴더를 만듭니다.

- `release/ai-md-templates`: `docs/`, `samples/`, `AGENT.md`, `index.md` 를 그대로 복사한 **문서 템플릿 패키지**입니다. 필요 시 이 폴더만 압축해 별도 저장소나 배포 경로에 업로드하면 됩니다.
- `release/prompt-cli`: `README.md`, `scripts/`, `meta/`, `examples/`, `tests/`, `__tests__/`, `package*.json`, `jest.config.js` 를 복사한 **CLI/검증 스크립트 패키지**입니다. README가 이미 CLI 사용법을 포함하고 있기 때문에 이 번들과 함께 배포됩니다.

각 번들은 완전한 폴더 구조를 유지하므로 그대로 압축하거나 새로운 Git 저장소의 루트로 사용할 수 있습니다. 생성된 항목 목록은 `release/manifest.json`에서 확인할 수 있습니다.

> 템플릿과 CLI를 동시에 업데이트한 경우, `npm run release`를 다시 실행하여 최신 파일을 복제한 뒤 업로드하세요.
