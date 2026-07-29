# More FunOS｜G1 Admin Firebase Publish 執行記錄

> 狀態：CURRENT / G1 ACTIVE
> 更新：2026-07-29 19:55 HKT
> Parent Authority：`MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`

## 1. 目標

完成 Admin Control Plane 真實 Firebase Publish 閉環：Auth、Role、Rules、Draft、Published、Runtime、Audit、Recovery、首次 Seed。

## 2. 影響端

- Admin：主修改端
- Customer：未來讀 Published／Runtime
- SMT Register／SMT Mobile：未來讀 Published／Runtime
- Android Host：間接受 Runtime／Order／Print Job 影響

## 3. Fresh-read 發現

### 已存在

- `src/data/firebase-config.js`
  - Firebase SDK 12.16.0
  - Staging root `morefun/admin/staging/v1`
  - Runtime config validation
  - authMode existing／anonymous
- `src/data/firebase-staging.js`
  - Firebase modular SDK dynamic import
  - Auth＋Realtime Database
  - `.info/connected`
  - `readSnapshot()`
  - `writeLayers()`
  - status subscription
- `tests/firebase-staging-contract.test.mjs`
- `tests/firebase-rules-contract.test.mjs`
- `database.rules.json` contract target

### 仍未證明

- 真實 Firebase runtime config 已注入
- 真實 project連線成功
- Owner／Manager／Staff帳號及 Custom Claims 已建立
- Rules 已部署到目標 project
- Draft／Published／Runtime真實讀寫
- Publish atomicity／revision／audit
- Recovery真實驗證
- 首次 Published Seed

## 4. 重要澄清

`src/integrations/connectors.js` 係一般 HTTP endpoint abstraction，唔係 Firebase Authority；真正 Firebase adapter 位於 `src/data/firebase-staging.js`。

Repo 內 `firebase-runtime-config.js` 故意保持 null，避免提交 live project config／privileged credentials。呢個係安全邊界，但亦代表目前未有 production/staging真連線證據。

## 5. 證據層級

- Code exists：YES
- Static contract exists：YES
- Contract PASS：尚需讀最新 CI／本次未執行
- Live Firebase connection：NO EVIDENCE
- Auth／Rules deployed：NO EVIDENCE
- Browser E2E：NO EVIDENCE
- Store acceptance：NO

## 6. 下一步

1. Fresh-read `database.rules.json`、store、persistence bootstrap、publish flow、audit/recovery。
2. 讀取 Admin branch最新 workflow／CI evidence。
3. 建立不含秘密嘅 Firebase runtime deployment contract。
4. 確認 Owner account／Custom Claims／Rules deployment方式。
5. 先做 Staging真讀，再做 Draft write，再做 Runtime write，再做 Publish／Audit／Recovery。

未取得真實讀寫證據前，不得標記 G1 complete。
