# More FunOS｜隔離驗證與合拼協議

> 狀態：CURRENT／MANDATORY
> 更新：2026-07-29 21:10 HKT
> Parent Authority：`MOREFUNOS_MASTER_CONTROL_AUTHORITY.md`

## 1. 核心原則

任何未合格功能、修正、adapter、contract、UI flow、device integration 或 infrastructure change，必須先留在隔離分支，不得直接合拼入當前整合基準。

流程固定為：

`ISOLATE → ROOT_CAUSE → SPLIT → FIX → VERIFY → QUALIFY → MERGE`

## 2. 狀態標籤

- `UNQUALIFIED`：未完成驗證，不得合拼。
- `ROOT_CAUSE_IDENTIFIED`：根因已鎖定。
- `FIX_IN_PROGRESS`：修正中。
- `CODE_VERIFIED`：靜態／單元／contract已通過。
- `BROWSER_VERIFIED`：Browser gate已通過。
- `LIVE_VERIFIED`：真實 Firebase／API／裝置／打印已驗證。
- `QUALIFIED_FOR_INTEGRATION`：符合該功能所需全部 Gate，可準備合拼。
- `MERGED_TO_INTEGRATION_BASE`：已合拼並重新做整體回歸。
- `REJECTED／SUPERSEDED`：不採用或已被其他方案取代。

## 3. 每個問題必須記錄

1. 問題描述
2. 影響端口
3. 根因
4. 隔離分支
5. 修正範圍
6. 禁止連帶修改範圍
7. 驗證 Gate
8. 證據
9. 合拼目的地
10. 合拼後回歸結果

## 4. 合格規則

- Code存在不等於合格。
- Contract存在不等於通過。
- Browser PASS不等於Live PASS。
- 本機成功不等於Remote成功。
- Remote queued不等於Remote acknowledged。
- 單端成功不等於四端閉環。
- 未有對應證據，不得提升狀態。

## 5. 合拼規則

只可合拼 `QUALIFIED_FOR_INTEGRATION` 項目。

合拼前必須：

- fresh-read目標整合基準；
- 比較 contract／schema／runtime version；
- 檢查跨端依賴；
- 確認冇覆蓋其他已合格功能；
- 建立 rollback checkpoint。

合拼後必須重新執行整體 regression；若失敗，立即回退並將項目降回 `UNQUALIFIED`。

## 6. 當前主攻隔離項目

### G1 Confirmed Publish

- Repo：`Pantonyeung/morefunos-admin`
- Base：`feat/admin-p0-full-connect-v1`
- Branch：`g1-admin-confirmed-publish-v1`
- 狀態：`UNQUALIFIED／FIX_IN_PROGRESS`
- 目標：Firebase Published／Meta／Audit寫入後，必須讀回同一 remote receipt先回報發佈完成。
- 合格條件：Draft validation、remote acknowledgement、release receipt、failure truthfulness、contract evidence。

## 7. More FunOS進度規則

整體百分比只會因已完成並有證據嘅能力提升。建立分支、寫文件、開始修正、定位根因，本身唔自動增加百分比。
