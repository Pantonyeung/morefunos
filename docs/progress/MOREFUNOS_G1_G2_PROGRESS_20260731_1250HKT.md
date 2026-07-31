# MoreFunOS｜G1／G2 進度文件｜2026-07-31 12:50 HKT

## 狀態摘要

- G1：`91%`
- G1 正確狀態：`SOURCE IMPLEMENTED / TARGETED EVIDENCE PARTIAL / DEPLOYMENT AND DEVICE ACCEPTANCE PENDING`
- G2：`REQUIREMENTS INTAKE / DESIGN REVIEW PENDING / IMPLEMENTATION NOT STARTED`

## Fresh-read Heads

| Repo | Branch | Head | PR |
|---|---|---|---|
| morefunos-admin | feat/admin-p0-full-connect-v1 | 3343a2cb2c283725d18aede33f89bdcfc288072e | #1 Draft |
| morefunos-smt | smt-main-candidate-v1 | 5e9d17509448661123bef1e446099e65dcfda1b0 | #34 Draft |
| morefun-ordering-web | feat/g1-customer-runtime-consumer-v1 | 14860c64492a3a2545454927e2dcb90ac5f7ea43 | #22 Draft |

## G1 已完成 Source

- Admin Worker Staff Login／Availability API；
- Firebase operational availability；
- Admin internal catalog與Customer public projection分離；
- Customer Public Runtime read path；
- SMT Register／SMM Mobile共用Supply Runtime；
- Customer soldout／paused 禁止下單語意；
- Customer latest-valid／previous-valid離線菜單；
- 15秒、online、foreground availability refresh。

## G1 尚未完成

- 三repo最新head full suites；
- Admin Worker／SMT Pages／Customer preview latest deployment；
- SMT→SMM→Customer跨端售罄閉環；
- token revoke、offline queue、HKT 05:00 staging；
- iPhone／Android／POS實機；
- Safari／PWA offline cold start；
- Production promotion。

## G2 新增範圍

### G2-A｜Catalog Assignment＋Permission Scope

- Admin指定SMT／SMM／Customer菜單；
- Admin授權SMT／SMM可寫產品／Domain Scope；
- 未授權產品寫入必須403；
- Channel projection不得洩露其他渠道資料。

### G2-B｜Store Hours／Pickup Runtime

- Admin／SMT／SMM共同控制；
- Worker server revision、idempotency、audit；
- Admin可鎖定或收回Runtime寫權；
- Customer只讀Effective Runtime並按有效時段驗證。

### G2-C｜Offline WhatsApp Order

- 最近有效菜單可繼續建立本機訂單；
- WhatsApp發送公司電話；
- 標記OFFLINE_UNCONFIRMED；
- 不得自動雙重提交；
- 待SMT／SMM確認後才成為正式Order。

### G2-D｜Payment Proof Review

- Customer受保護上傳；
- Private storage；
- SMT／SMM review queue；
- approve／reject／resubmit；
- Payment approval gate order acceptance；
- Admin audit／override。

## Verification 分層

| 層級 | G1 | G2 |
|---|---|---|
| Requirements | LOCKED | INTAKE LOCKED |
| Design | PARTIAL | PENDING REVIEW |
| Source | PARTIAL COMPLETE | NOT STARTED |
| Targeted Tests | PARTIAL PASS | NOT STARTED |
| Full Tests | PENDING | NOT STARTED |
| Deployment | PENDING | NOT STARTED |
| Browser | PENDING | NOT STARTED |
| Device | PENDING | NOT STARTED |
| Production | PENDING | NOT STARTED |

## 阻塞／決策

- 公司WhatsApp正式接單號碼未提供；
- 付款證明「真實」只可由Staff對實際收款記錄人工核對，圖片/OCR不可作唯一Authority；
- 中央AGENTS仍含淘汰Apps Script Authority，需在新Authority文件批准後正式改正。

## 下一步

1. 審核跨端Authority文件；
2. 確認WhatsApp號碼；
3. G2-A→B→C→D逐條寫Design Spec；
4. 每條Spec批准後先Implementation Plan；
5. G1 deployment／device gate與G2設計不可混報。
