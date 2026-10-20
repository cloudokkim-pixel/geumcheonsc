# 문서 보관 규칙

작업 단위로 폴더를 만들고, 진행 상태에 따라 `active/` ↔ `completed/` 위치로 구분한다.

```
docs/
├─ active/      진행 중인 작업 (작업 단위 폴더)
├─ completed/   완료된 작업 (백업 보관, 수정하지 않음)
├─ reference/   작업과 무관하게 계속 참조하는 운영 문서
└─ _template/   새 작업 폴더 템플릿
```

## 작업 폴더 규칙

- 이름: `YYYY-MM_작업명` (시작 연월 + 영문 kebab-case). 예) `2026-10_design-renewal`
- 폴더마다 `README.md`를 두고 목적, 상태, 기간, 산출물 목록을 기록한다.
- 폴더 안 문서는 번호 접두어(`01_`, `02_` …)로 순서를 표시한다.
- 작업 단위 하나가 폴더 하나다. 산출물을 `docs/` 루트나 프로젝트 루트에 흩어 두지 않는다.

## 시작 / 완료 절차

1. **시작**: `_template/`를 `active/YYYY-MM_작업명/`으로 복사하고 README를 채운다.
2. **진행**: 산출물은 모두 해당 폴더 안에 둔다.
3. **완료**: README의 상태를 `완료`로 바꾸고 완료일·결과 요약을 적은 뒤 `completed/`로 옮긴다.
   ```bash
   git mv docs/active/2026-10_design-renewal docs/completed/
   ```
4. **보관 후**: `completed/` 문서는 수정하지 않는다. 후속 작업이 생기면 새 작업 폴더를 만든다.

## 주의

- **`public/` 아래에 문서를 두지 않는다.** 빌드 시 웹에 그대로 공개된다.
- **보안 점검 리포트(`SECURITY_REPORT.*`, `ISMS_SECURITY_REPORT.*`)와 생성 스크립트는 Git에서 제외**되어 있다(`.git/info/exclude`). 취약점 정보가 담겨 있으므로 이 패턴을 유지하고, 새 보안 문서도 같은 방식으로 제외한다.
- 문서에 비밀번호, API 키, 개인정보를 적지 않는다.

## 현재 목록

### active
| 폴더 | 내용 |
|---|---|
| `2026-10_design-renewal` | 디자인 리뉴얼 |

### completed
| 폴더 | 내용 |
|---|---|
| `2026-03_initial-build` | 1차 구축 기획·와이어프레임·카피·브랜드 문서, 개발 지시서 |
| `2026-04_user-manual` | 사용자 매뉴얼 pptx, 생성 스크립트, 스크린샷 |
| `2026-05_security-review` | OWASP/ISMS 보안 점검 리포트와 생성 스크립트 (Git 제외) |

### reference
| 문서 | 내용 |
|---|---|
| `gallery-db-setup.md` | 갤러리 Supabase DB 초기화 가이드 |
