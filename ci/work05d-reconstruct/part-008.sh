#!/usr/bin/env bash
set -euo pipefail
ROOT="${1:-project}"
mkdir -p "$ROOT/app/src/main/assets/smt"
cat > "$ROOT/app/src/main/assets/smt/app.js" <<'__MF_008_EOF__'
(function(){
  'use strict';
  const Model=window.MoreFunSmtModel, Catalog=window.MoreFunCatalog;
  const state=Model.createState();
  let activeCategory='all', search='', runtime=null, recentOrders=[], currentView='order';
  let products=Model.applyAvailability(Catalog.PRODUCTS,[]), availabilityRows=[], bootstrapData=null, cloudSession=null;
  const cloudPending=new Map();
  const $=id=>document.getElementById(id);
  const money=minor=>`$${(minor/100).toFixed(minor%100?2:0)}`;
  const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
  const token=()=>`${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
  const safeJson=(value,fallback=null)=>{if(value===null||value===undefined)return fallback;if(typeof value==='object')return value;try{return JSON.parse(value);}catch(_){return fallback;}};
  const messageOf=result=>result?.error?.message||result?.message||result?.code||result?.error?.code||'操作失敗';
  const statusText={PENDING:'待製作',IN_PROGRESS:'製作中',READY:'可取餐',COMPLETED:'已完成',CANCELLED:'已取消',UNPAID:'待付款',PARTIAL:'部分付款',PAID:'已付款',DUE:'待補收',REFUND_DUE:'待退款'};
  const actionText={IN_PROGRESS:'開始製作',READY:'完成製作',COMPLETED:'已交餐',CANCELLED:'取消'};

  const native=window.MoreFunNative?{
    formal:true,
    local:intent=>JSON.parse(window.MoreFunNative.submitIntent(JSON.stringify(intent))),
    async:intent=>JSON.parse(window.MoreFunNative.submitAsyncIntent(JSON.stringify(intent)))
  }:{
    formal:false,
    local:intent=>{
      if(intent.action==='GET_RUNTIME_STATUS')return {ok:true,release:'browser-preview',authority:'PREVIEW_ONLY',database:'DEMO_MEMORY',network:'PREVIEW',recoverable_print_jobs:0,pending_outbox_events:0,open_system_events:0,formal_order_writes:false};
      if(intent.action==='LIST_ORDERS')return {ok:true,orders:[]};
      if(intent.action==='LIST_AVAILABILITY')return {ok:true,availability:[]};
      return {ok:false,code:'PREVIEW_ONLY',message:'瀏覽器預覽不會建立正式資料'};
    },
    async:()=>({ok:false,error:{code:'PREVIEW_ONLY',message:'瀏覽器預覽沒有 Staff Cloud'}})
  };
  const localIntent=(action,payload={})=>native.local({request_id:`req-${token()}`,action,payload});
  function asyncIntent(action,payload={}){
    const request=Model.buildCloudIntent(action,payload,`cloud-${token()}`);
    return new Promise(resolve=>{
      const timer=setTimeout(()=>{cloudPending.delete(request.request_id);resolve({ok:false,error:{code:'CLOUD_TIMEOUT',message:'雲端回應逾時'}});},25000);
      cloudPending.set(request.request_id,{resolve,timer});
__MF_008_EOF__
