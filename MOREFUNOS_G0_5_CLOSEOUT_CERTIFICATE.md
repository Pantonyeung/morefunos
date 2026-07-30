# MoreFunOS｜G0.5 Closeout Certificate

狀態：CERTIFIED
時間：2026-07-30 18:09 HKT

## 結論

MoreFunOS G0.5 的 Branch／Workflow／Runtime Cost／Deployment Infrastructure Consolidation 已完成，現正式標記為：

`MOREFUNOS G0.5 CLOSEOUT CERTIFIED`

## 已完成證據

### GitHub

- 五個 Repository 的 default branch 已確認為 `main`。
- Authority Matrix 已建立並鎖定。
- Admin Active Authority workflows 已改為 `workflow_dispatch` only。
- SMT Main Candidate、Printer Module、Incoming Queue workflows 已改為 `workflow_dispatch` only。
- 已核對 workflows 權限均為 `contents: read`。
- 已移除 `push`、`pull_request`、`schedule/cron` 自動觸發。
- 已移除 bot writeback／self-trigger loop。
- 已核對 Rulesets：未配置。
- 已核對 Classic Branch Protection：未配置。
- 因此不存在舊 Required Status Check 卡住 merge 的情況。
- GitHub Actions 預設 workflow permission 為 read-only。
- GitHub Actions 不允許自動建立或批准 Pull Request。

### Cloudflare

- SMT production branch 已設定為 `main`。
- SMT preview branch automatic deployment 已停用。
- 舊 SMM Cloudflare Pages project 已 Disconnect Git repository。
- 舊 SMM 不再因 Git push 自動 build／deploy。
- 未發現 Firebase Hosting 與 Cloudflare 重複部署。

### Firebase

- Realtime Database 已啟用並使用 `asia-southeast1`。
- Authentication：Email／Password 已啟用。
- Firebase Hosting：未啟用。
- Firebase Functions：未部署。
- Cloud Firestore：未建立。
- Firebase Storage：未啟用。
- Firebase Extensions：未安裝。
- RTDB Rules V2 hardening 已發布。
- Service Account：`firebase-adminsdk-fbsvc@morefunposos.iam.gserviceaccount.com`。
- User-managed key 數量已確認只有 1 把。
- 未見重複 service account key。

## 已接受的限制

- Google Cloud Scheduler／Pub/Sub 深層控制台盤點因使用者無法提供，按指示跳過。
- 此限制不阻塞本次 G0.5 Branch／Workflow／Runtime Cost／Deployment Infrastructure closeout。
- Runtime functional verification（Login／Session／Bootstrap／Push／Pull／Heartbeat／Fallback）屬 G1 或後續功能驗收，不屬本證書的基礎設施收尾範圍。

## 下一階段

正式進入 G1：

- SMT／SMM／Admin／Customer 四端閉環整合
- Runtime Login／Session／Bootstrap 驗證
- Push／Pull／Heartbeat／Fallback 驗證
- Customer PR #21 reconciliation
- SMT Main Candidate integration

