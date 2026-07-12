(function(root,factory){const value=factory();if(typeof module==='object'&&module.exports)module.exports=value;root.MoreFunSmtModel=value;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  let counter=0;
  const clone=v=>JSON.parse(JSON.stringify(v));
  const selectedOption=(line,groupId)=>line.selectedOptions[groupId]||null;
  const safeJson=(value,fallback={})=>{if(!value)return fallback;if(typeof value==='object')return value;try{return JSON.parse(value);}catch(_){return fallback;}};

  function createState(){return {cart:[],serviceType:'TAKEAWAY',source:'STORE_WALK_IN',paymentMethod:'PAY_ON_PICKUP',selectedLineId:null,tableRef:'',guestCount:1};}
  function addProduct(state,product){
    if(!isProductAvailable(product))throw new Error('product is sold out');
    const line={lineId:`line-${Date.now()}-${++counter}`,product:clone(product),quantity:1,selectedOptions:{}};
    state.cart.push(line);state.selectedLineId=line.lineId;return line;
  }
  function removeLine(state,lineId){state.cart=state.cart.filter(x=>x.lineId!==lineId);if(state.selectedLineId===lineId)state.selectedLineId=state.cart[0]?.lineId||null;}
  function changeQuantity(state,lineId,delta){const line=state.cart.find(x=>x.lineId===lineId);if(!line)return;if(line.quantity+delta<=0)return removeLine(state,lineId);line.quantity+=delta;}
  function setOption(state,lineId,groupId,optionId){
    const line=state.cart.find(x=>x.lineId===lineId);if(!line)throw new Error('line not found');
    const group=(line.product.optionGroups||[]).find(x=>x.id===groupId);if(!group)throw new Error('option group not found');
    const option=group.options.find(x=>x.id===optionId);if(!option)throw new Error('option not found');
    line.selectedOptions[groupId]=clone(option);
  }
  function setService(state,value){
    state.serviceType=value;
    if(value==='DINE_IN')state.source='DINE_IN';
    else {state.tableRef='';state.guestCount=1;if(state.source==='DINE_IN')state.source='STORE_WALK_IN';}
  }
  function setDineIn(state,tableRef,guestCount){state.tableRef=String(tableRef||'').trim();state.guestCount=Math.max(1,Number(guestCount)||1);}
  function setSource(state,value){state.source=value;}
  function setPayment(state,value){state.paymentMethod=value;}
  function lineTotalMinor(line){
    const delta=Object.values(line.selectedOptions).reduce((sum,x)=>sum+(x.deltaMinor||0),0);
    return (line.product.priceMinor+delta)*line.quantity;
  }
  function totalMinor(state){return state.cart.reduce((sum,line)=>sum+lineTotalMinor(line),0);}
  function missingGroups(line){return (line.product.optionGroups||[]).filter(g=>g.required&&!selectedOption(line,g.id));}
  function missingRequiredCount(state){return state.cart.reduce((sum,line)=>sum+missingGroups(line).length,0);}
  function buildCreateOrderIntent(state,businessDate,idempotencyKey){
    if(!state.cart.length)throw new Error('cart is empty');
    const missing=missingRequiredCount(state);if(missing)throw new Error(`missing required options: ${missing}`);
    if(state.serviceType==='DINE_IN'&&!String(state.tableRef||'').trim())throw new Error('table is required for dine in');
    if(state.serviceType==='DINE_IN'&&!(Number(state.guestCount)>0))throw new Error('guest count is required for dine in');
    const hasLabel=state.cart.some(x=>x.product.label);
    const printKinds=['RECEIPT','KITCHEN'];
    if(state.serviceType==='TAKEAWAY')printKinds.push('PACKING');
    if(hasLabel)printKinds.push('LABEL');
    const payload={
      idempotency_key:idempotencyKey,
      business_date:businessDate,
      source:state.serviceType==='DINE_IN'?'DINE_IN':state.source,
      service_type:state.serviceType,
      items:state.cart.map(line=>({
        product_id:line.product.id,
        display_name:line.product.name,
        quantity:line.quantity,
        unit_price_minor:line.product.priceMinor,
        options:Object.entries(line.selectedOptions).map(([groupId,option])=>({option_id:`${groupId}:${option.id}`,display_name:option.name,price_delta_minor:option.deltaMinor||0}))
      })),
      print_kinds:Array.from(new Set(printKinds))
    };
    if(state.serviceType==='DINE_IN'){payload.table_ref=String(state.tableRef).trim();payload.guest_count=Number(state.guestCount);}
    return {request_id:`req-${idempotencyKey}`,action:'CREATE_ORDER',payload};
  }
  function buildCloudIntent(action,payload={},requestId){return {request_id:requestId||`cloud-${Date.now()}-${++counter}`,action,payload};}
  function applyAvailability(products,rows){
    const map=new Map((rows||[]).map(row=>[String(row.product_id),row]));
    return products.map(product=>{
      const row=map.get(String(product.id));
      const status=String(row?.status||'AVAILABLE').toUpperCase();
      return {...clone(product),availability:{status:status==='SOLD_OUT'?'SOLD_OUT':'AVAILABLE',reason:row?.reason||'',permanentStop:Boolean(row?.permanent_stop),sourceVersion:Number(row?.source_version??row?.version_no??0)}};
    });
  }
  function isProductAvailable(product){return String(product?.availability?.status||'AVAILABLE').toUpperCase()!=='SOLD_OUT';}
  function applyBootstrapCatalog(baseProducts,bootstrap){
    const rows=bootstrap?.product_mirror||[];
    const byId=new Map(rows.map(row=>[String(row.product_id||''),row]));
    const byCode=new Map(rows.map(row=>[String(row.product_code||row.display_code||''),row]));
    const merged=baseProducts.map(product=>{
      const row=byId.get(String(product.id))||byCode.get(String(product.code));
      if(!row)return clone(product);
      const names=safeJson(row.name_json,{}),prices=safeJson(row.price_json,{});
      const name=names.zh_HK||names['zh-HK']||names.zh_TW||names['zh-TW']||names.name||row.product_name||row.display_name||product.name;
      const price=Number(prices.amount_minor??prices.minor??prices.price_minor??row.unit_price_minor??product.priceMinor);
      return {...clone(product),name,priceMinor:Number.isFinite(price)?price:product.priceMinor,mirrorStatus:row.status||'ACTIVE'};
    });
    const withAvailability=applyAvailability(merged,bootstrap?.availability_mirror||[]);
    return withAvailability.map(product=>product.mirrorStatus&&String(product.mirrorStatus).toUpperCase()!=='ACTIVE'?{...product,availability:{...(product.availability||{}),status:'SOLD_OUT',reason:'產品已停用'}}:product);
  }
  function allowedProductionTargets(status){
    return ({PENDING:['IN_PROGRESS','CANCELLED'],IN_PROGRESS:['READY','CANCELLED'],READY:['COMPLETED','CANCELLED'],COMPLETED:[],CANCELLED:[]})[status]||[];
  }
  return Object.freeze({createState,addProduct,removeLine,changeQuantity,setOption,setService,setDineIn,setSource,setPayment,lineTotalMinor,totalMinor,missingGroups,missingRequiredCount,buildCreateOrderIntent,buildCloudIntent,applyAvailability,isProductAvailable,applyBootstrapCatalog,allowedProductionTargets});
});
