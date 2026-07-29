# MoreFunOS｜低成本 CI 與問題拆分開發強制規則 V1.0

狀態：CURRENT／HARD RULE／MUST READ BEFORE DEVELOPMENT
生效：2026-07-30 HKT
適用：Customer、SMT、SMT Mobile、Admin、Backend、APK、Printing，以及所有 AI／Codex／ChatGPT 開發對話。

## 一、所有開發對話開工前必讀

1. 本文件。
2. 專案中央 Authority／Current Development Registry。
3. 對應 repo 的 `AGENTS.md`、Current Handoff、Change Impact／Pitfalls。
4. 對應 active branch、PR、最新 head SHA 與現行測試證據。

未讀完不得修改程式、建立新 CI 或合拼。

## 二、問題必須拆細

每條開發線只主攻一個明確問題或一個穩定 Contract 邊界。

固定流程：

```text
發現問題
→ 隔離 exact failing unit
→ 重現該單元
→ 定位根因
→ 只修根因
→ isolated verification
→ minimum affected regression
→ 合拼到 integration branch
→ 最後一次低成本整合驗證
```

禁止：
- 用完整 CI 反覆 debug 單一問題；
- 一個 branch 同時混入多個不相關問題；
- 為取得綠燈而重構無關模組；
- 以 patch／override／大量 `!important` 壓住根因；
- isolated branch 通過後直接跳過 integration regression。

## 三、CI 成本規則

### 開發／問題分支
- 預設不自動跑完整 CI。
- 優先使用本機、Cloud Shell 或 targeted script。
- 文件／紀錄更新不得觸發完整 CI。
- 單一問題只允許 targeted test 或 minimum affected regression。

### Integration branch
- 多個已 isolated PASS 的修改先整合。
- 合併後只跑一個整合 job，避免每項檢查拆成獨立 runner job。
- 同一 PR 連續更新必須使用 `concurrency`＋`cancel-in-progress: true`。
- Browser／Device／APK 重型驗證預設手動觸發，除非正式 Release Gate 要求。

### Final Gate
- 完整 CI 只在準備合拼正式基準／Release 前跑一次。
- 同一 commit 已有可重現 PASS 證據，不得無目的重跑。
- GitHub Actions 額度受限時，必須使用本機／Cloud Shell 取得等價可重現證據並記錄指令、commit、結果及環境。

## 四、最低成本 Workflow 標準

1. 優先單一 `validate` job，將 syntax、contracts、secret scan 串行執行。
2. 使用 `paths`／`paths-ignore`，排除 docs、圖片、備份及非程式資產。
3. 使用：

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

4. 開發分支優先 `workflow_dispatch`；PR 只跑輕量整合 gate。
5. E2E／Browser／APK Build／Production Signing 分開成手動或 Release Gate。
6. 禁止因每個小模組建立一個永久自動 workflow。

## 五、分支與合拼規則

- 問題分支：只包含一個問題、測試、紀錄。
- Integration branch：只整合已 isolated PASS 的問題分支。
- 正式 baseline：只接受 integration branch 的最終驗證結果。
- 未有 isolated evidence 不可合拼。
- 未有 integration evidence 不可標記完成。
- 自動測試 PASS 不等於實機／Production PASS。

## 六、每次工作必須留下紀錄

最少包含：
- Repo／branch／PR／head SHA；
- 單一問題定義；
- 根因；
- 修改範圍；
- targeted verification；
- minimum regression；
- CI 是否執行及成本；
- merge／rollback 點；
- 下一步唯一事項。

GitHub 為正式工程 Authority；Google Drive 為長期可讀鏡像；Jade Note 為 AI 接手索引。三邊重要規則必須同步。
