# More FunOS｜G1 Admin Firebase Publish 執行記錄

> 狀態：CURRENT / G1 ACTIVE
> 更新：2026-07-29 20:16 HKT
> Parent Authority：`MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`

## 1. 目標

完成 Admin Control Plane 真實 Firebase Publish 閉環：Auth、Role、Rules、Draft、Published、Runtime、Audit、Recovery、首次 Seed。

## 2. 影響端

- Admin：主修改端
- Customer：未來讀 Published／Runtime
- SMT Register／SMT Mobile：未來讀 Published／Runtime
- Android Host：間接受 Runtime／Order／Print Job影響

## 3. Current Development Authority

- Repo：`Pantonyeung/morefunos-admin`
- Active branch：`feat/admin-p0-full-connect-v1`
- PR：#1 Draft／Open
- 本輪開始 head：`ebcca40b8f9d59475438f2dd6959308aa73a9689`
- G1 checkpoint：`eb1552ea7719e7d897ed12bef48264690c938b82`
- CI修正 head：`7a9810a39ffacc63b835ab8d7dcbb805d57ebcac`

## 4. Fresh-read 發現

### Firebase adapter／config

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
- `firebase-runtime-config.js` 保持 `null`，未有 live project接線證據。

### Store／Publish／Recovery

`src/data/store.js` 已有：

- Draft／Published／Runtime／Meta／Audit本機持久化
- Draft validation
- Publish與release history
- Rollback
- Backup export／import
- Runtime conflict guard
- Catalog receipt tracking
- Remote hydrate
- Firebase hydrate前 recovery snapshot

`src/data/persistence-bootstrap.js` 已有：

- Firebase repository bootstrap
- 8秒 timeout
- connected／offline／error／fallback UI狀態
- remote hydrate

### Rules

`database.rules.json` 已定義：

- root deny-by-default
- Staging read需登入及 More Fun role
- Draft owner／manager可寫
- Published及Meta owner-only
- Runtime owner／manager／staff可寫
- Audit owner／manager可寫

## 5. 關鍵架構缺口

1. `queueRemoteWrite()`係非阻塞 Promise。
2. `publishDraft()`只確認本機 persist成功及 remote write已排隊。
3. 因此目前 `publishDraft().ok === true` 唔等於 Firebase Published已成功寫入。
4. 未有 remote acknowledgement／release receipt／revision confirmation。
5. 未有真實 Auth claim、Rules deployment、read/write、Publish、Audit、Recovery證據。

## 6. CI調查

### Run #507

- Head：`ebcca40b8f9d59475438f2dd6959308aa73a9689`
- Admin Validation：failure
- validate：failure
- browser：skipped
- GitHub job log下載返回 `BlobNotFound 404`。

### Run #509

- Head：`eb1552ea7719e7d897ed12bef48264690c938b82`
- 同樣 validate failure／browser skipped
- 新鮮 job log仍返回 `BlobNotFound 404`，確認係 log endpoint問題。

### 已定位 CI誤判

Workflow secret scan原本使用：

```text
firebaseConfig[[:space:]]*=
```

合法程式碼 `const firebaseConfig=...` 會被誤判成 production secret。

已修正：

- 移除普通變數名誤判。
- 保留 API key、private key、service account欄位掃描。
- 只針對實際 `__MORE_FUN_FIREBASE_CONFIG__={...apiKey...}` live config注入。
- 將 Firebase staging／rules contract正式加入 CI必跑項。

修正 commit：`7a9810a39ffacc63b835ab8d7dcbb805d57ebcac`

### Run #511

- 狀態：queued（記錄時）
- 必須等 validate及browser真實結果。

## 7. 踩坑

- GitHub workflow log endpoint對新舊 job均返回 `BlobNotFound 404`，不能依賴完整 log下載。
- Secret scan regex過闊，將合法 `firebaseConfig`變數名當 secret。
- Code存在容易令人誤以為 Firebase已接通；必須分開 Code／Contract／Live evidence。
- 本機 Publish成功容易被誤報成 remote Publish成功；目前未有 remote ack。

## 8. 成功方法

`Fresh-read現碼 → 分開本機能力同 remote證據 → 以 workflow定義靜態定位 false positive → 收窄 secret scan → 將 Firebase contract納入 CI → 重跑 Gate`

## 9. 證據層級

- Code exists：YES
- Static contract exists：YES
- Contract CI：Run #511待驗證
- Live Firebase connection：NO EVIDENCE
- Auth／Rules deployed：NO EVIDENCE
- Browser E2E：Run #511待驗證
- Device／Store acceptance：NO

## 10. 下一步

1. 讀 Run #511 validate／browser結果。
2. 如失敗，按可取得 step／現碼繼續定位並修正。
3. 建立不含秘密嘅 Firebase runtime deployment contract。
4. 確認 Owner account／Custom Claims／Rules deployment方式。
5. 先做 Staging真讀，再做 Draft write，再做 Runtime write，再做 Publish／Audit／Recovery。

未取得真實讀寫證據前，不得標記 G1 complete。
