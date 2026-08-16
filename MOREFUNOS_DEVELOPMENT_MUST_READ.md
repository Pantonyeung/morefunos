# MoreFunOS｜每次開發必讀

> 狀態：ROUTING ONLY／歷史中央導航，不是工程 Authority
> 更新：2026-08-16 HKT
> 正式 Current Authority：`Pantonyeung/morefunos-v1`

## 1｜唯一現役 Repository Set
1. `Pantonyeung/morefunos-v1`
   - 唯一 Product／Source／Business／Development Authority。
   - Authority branch：`main`。
   - Fresh observed main head：`d7467418a7126f3f30d37080993b13d46b623f65`。
2. `Pantonyeung/morefunos-v1-builder`
   - verification／build／release relay only。
   - 永遠不是 Business／Runtime／Store／Native Bridge／Print Authority。

VNext／Greenfield／Platform-B／舊 P-Line／舊 SMT/SMM/Admin/Customer 皆為 SEALED DONOR／HISTORICAL；只可按 V1 Migration Ledger 精準抽取。Jade Note 依 V1 Owner Decision D-011 為 UNINSTALLED／FORBIDDEN，禁止讀、寫、引用、重連或作 mirror。

## 2｜V1 開工唯一閱讀順序
1. `AGENTS.md`
2. `docs/current/CURRENT_HANDOFF.md`
3. `docs/current/CURRENT_DEVELOPMENT_LOG.md`
4. `docs/current/CURRENT_OWNER_DECISIONS.md`
5. `docs/current/CURRENT_EXECUTION_PLAN.md`
6. relevant `docs/authority/*`

只有以上 V1 Authority 可定義 Current；本中央檔只負責路由，內容衝突時一律以 V1 Four-Pack／Authority 為準。

## 3｜Fresh Current Checkpoint
- G0-G5：CLOSED；G6：IN PROGRESS。
- B2-B3：CLOSED。
- B4-A：A1-A5 CLOSED。
- A6 Reporting Projection：**TYPECHECK REPAIR／NEW EXACT-HEAD VERIFY REQUIRED**。
- Active branch：`feat/b4-a6-reporting-projection`。
- Draft PR：#9 `feat(b4-a6): add Reporting Projection`。
- Fresh observed PR head：`ccb2bb76b304b64df0c8c3830961fb4b93ef8e41`；此只係 observed head，未完成 Four-Pack final sync／freeze 前不得當最終 Builder proof SHA。

### A6 first fatal evidence
- Failed source：`d2836afc7d1c8551b67d49fa6048ce38ce4e9600`
- Builder Run：`31917328968`
- Job：`95091315685`
- profile：`g5`
- `g5-smt-locked-install`／`g5-targeted`／`current-regression`：PASS
- `g5-typecheck`：FAIL
- SMT Web test/build：未執行
- Failure receipt：`docs/qa/B4_A6_EXACT_HEAD_G5_FAIL_TYPECHECK_2026-08-16.md`

Repair checkpoint：`6ff9c64682079b3ae9d79bd3033c503131d28ee2`。修正只涉及 `packages/reporting/source-evidence.ts` TypeScript 5.8.3 control-flow termination；Business semantics／error codes／Authority 無改。舊 failed SHA 禁止 rerun 作 repair proof。

## 4｜Physical Evidence Ceiling
Frozen SMT carrier `0.1.2-g6`：Build＋stable Signing＋private Artifact Delivery PASS。
Install／Device／Hardware／Operational／Production：**NOT ESTABLISHED**。Owner 目前明確 defer physical testing。

## 5｜Evidence Truth
`SOURCE → TEST → TYPECHECK → BUILD → INSTALL → DEVICE → HARDWARE → OPERATIONAL → PRODUCTION`

任何低層 PASS 不得用文字提升到高層。

## 6｜永久 Guard
- Authority-first／Fresh-read／first fatal evidence／minimal fix／same-gate new exact-head verification。
- 不可建立第二套 Business Truth／Store／State／Native Bridge／Print／OTA／Order／Pricing／Reporting Authority。
- CI／APK／OTA 係 evidence/release gate，不係 debugger。
- D-014/D-026：official/vendor/framework → maintained package/reference → mature SDK/OSS → thin MoreFun adapter → custom last。
- D-049：每次 code mutation 前必須 Context7。
- 每次 END 必須 Self-Invention Audit。
- Drive 只係 mirror/archive；不可反向覆蓋 GitHub V1。

## 7｜唯一下一步
1. 將 PR #9 feature Four-Pack 最終 byte-for-byte 對齊最新 `main` Four-Pack。
2. Read back PR #9 新 head，freeze 該 exact SHA。
3. 只更新 PR metadata／Drive mirror；freeze 後禁止再改 feature source。
4. NEW Builder `Owner Manual V1 Verify`，`verification_profile=g5`。

PASS → exact-head audit → Ready → expected-head guarded merge → A6 closure／A6-001 registry。
FAIL → 保存 exact SHA／Run／Job／failedStage，只修第一個 confirmed root cause。

## 8｜Pitfall／Proven Solution 索引
中央舊 Pitfall Mother 維持 `HISTORICAL／SUPERSEDED／REDIRECT ONLY`。現役工程失敗與解法以 V1 `docs/qa/*`、`docs/authority/*` 為準；今日 A6 TypeScript failure 已有 canonical QA receipt，禁止另造重複 Pitfall Authority。
