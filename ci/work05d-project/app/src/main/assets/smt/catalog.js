(function(root,factory){const value=factory();if(typeof module==='object'&&module.exports)module.exports=value;root.MoreFunCatalog=value;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const DRINKS=[
    {id:'taiwan_milk_tea',name:'台式奶茶',deltaMinor:0},
    {id:'cold_tea',name:'冷泡茶',deltaMinor:600},
    {id:'lemon_tea',name:'手打檸檬茶',deltaMinor:1000},
    {id:'no_drink',name:'無需飲品',deltaMinor:-100}
  ];
  const RICE_BASES=[
    {id:'braised',name:'肉燥飯',deltaMinor:0},
    {id:'curry',name:'咖喱飯',deltaMinor:200},
    {id:'vegetable',name:'菜飯',deltaMinor:0}
  ];
  const PRODUCTS=[
    {id:'f4',code:'F4',name:'紫米招牌飯團餐',category:'combo',priceMinor:6000,badge:'人氣',label:true,optionGroups:[{id:'drink',name:'飲品',required:true,options:DRINKS}]},
    {id:'f2',code:'F2',name:'台式肉鬆飯團餐',category:'combo',priceMinor:5700,label:true,optionGroups:[{id:'drink',name:'飲品',required:true,options:DRINKS}]},
    {id:'f6',code:'F6',name:'泡菜豬肉飯團餐',category:'combo',priceMinor:6200,label:true,optionGroups:[{id:'drink',name:'飲品',required:true,options:DRINKS}]},
    {id:'bento_braised',code:'12',name:'肉燥便當',category:'bento',priceMinor:5800,badge:'熱賣',optionGroups:[{id:'rice_base',name:'飯底',required:true,options:RICE_BASES},{id:'rice_amount',name:'飯量',required:false,options:[{id:'normal',name:'正常',deltaMinor:0},{id:'less',name:'少飯',deltaMinor:0},{id:'half',name:'半飯',deltaMinor:0},{id:'more',name:'多飯',deltaMinor:300}]}]},
    {id:'bento_curry',code:'C12',name:'咖喱便當',category:'bento',priceMinor:6000,optionGroups:[{id:'rice_base',name:'飯底',required:true,options:RICE_BASES}]},
    {id:'bento_veg',code:'V12',name:'菜飯便當',category:'bento',priceMinor:5600,optionGroups:[{id:'rice_base',name:'飯底',required:true,options:RICE_BASES}]},
    {id:'onigiri_f4',code:'R4',name:'招牌紫米飯團',category:'riceball',priceMinor:4500,label:true,optionGroups:[]},
    {id:'onigiri_tuna',code:'R2',name:'吞拿魚紫米飯團',category:'riceball',priceMinor:4300,label:true,optionGroups:[]},
    {id:'salad_chicken',code:'S4',name:'紫米雞肉沙律',category:'salad',priceMinor:5900,optionGroups:[{id:'sauce',name:'醬汁',required:true,options:[{id:'none',name:'不需要',deltaMinor:0},{id:'honey_mustard',name:'蜜糖芥末',deltaMinor:0},{id:'sesame',name:'芝麻醬',deltaMinor:0}]},{id:'drink',name:'飲品',required:true,options:DRINKS}]},
    {id:'snack_wedges',code:'A1',name:'香脆薯角',category:'snack',priceMinor:2600,optionGroups:[]},
    {id:'snack_chicken',code:'A3',name:'台式鹽酥雞',category:'snack',priceMinor:3200,optionGroups:[]},
    {id:'drink_lemon_tea',code:'D8',name:'手打檸檬茶',category:'drink',priceMinor:2600,optionGroups:[{id:'ice',name:'冰量',required:false,options:[{id:'normal',name:'正常冰',deltaMinor:0},{id:'less',name:'少冰',deltaMinor:0},{id:'none',name:'走冰',deltaMinor:0}]}]},
    {id:'drink_milk_tea',code:'D1',name:'台式奶茶',category:'drink',priceMinor:2200,optionGroups:[]}
  ];
  const CATEGORIES=[
    {id:'all',name:'全部'},{id:'combo',name:'飯團餐'},{id:'bento',name:'便當'},{id:'riceball',name:'飯團'},{id:'salad',name:'沙律'},{id:'snack',name:'小食'},{id:'drink',name:'飲品'}
  ];
  return Object.freeze({PRODUCTS,CATEGORIES});
});
