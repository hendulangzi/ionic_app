
/**
 * [queryParams description]
 * @param { Object } options 不支持嵌套对象
 */
export function queryParams(options) {
  let ret = [];
  for (let key in options) {
    let temp = '';
    let value;
    value = options[key];
    value = value !== undefined ? value : '';
    ret.push((temp += key + '=' + value));
  }

  return '?' + ret.join('&');
}

/**
 * 对一个对象浅层对象字面量进行form-urlencode格式编码
 * @param {Object} options 需要编码的对象
 */
export function formEncode(options) {
  let ret = [];
  for (let key in options) {
    let temp = '';
    let value;
    value = options[key];
    value = value !== undefined ? value : '';
    ret.push((temp += key + '=' + value));
  }
  return ret.join('&');
}

export const isArray = Array.isArray;
const arrPro = Array.prototype;

export const arraySlice   = arrPro.slice;
export const arraySplice  = arrPro.splice;
export const arrayPush    = arrPro.push;
export const arrayPop     = arrPro.pop;
export const arrayUnshift = arrPro.unshift;
export const arrayShift   = arrPro.shift;
export const arrayForEach = arrPro.forEach;
export const arrayEvery   = arrPro.every;
export const arrayFill    = arrPro.fill;
export const arrayFilter  = arrPro.filter;
export const arrayFind    = arrPro.find;
export const arraySome    = arrPro.some;
export const arrayMap     = arrPro.map;

/*
 * 复制对象
 */
export function copyObj(origin: Object) {
  return JSON.parse(JSON.stringify(origin));
}

/**
 * @param  y  years
 * @param  m  months
 * @param  w  weeks
 * @param  d  days
 */
export function calcTimestamp(y = 0, m = 0, w = 0, d = 0) {
  const MSECS_PER_DAY = 86400000;
  const NOW = (new Date()).getTime();
  return NOW + MSECS_PER_DAY * (y * 365  + m * 30 + w * 7 + d);
}

/**
 * 将日期转化为特定格式的字符窜
 * @param  {Date}   date 日期对象
 * @param  {string} sp   格式分割符
 * @return {string}      YYYYspMMspDD 如：1970-01-01
 */
export function getDateString(date: Date, sp: string = '-'): string {
  if (!(date instanceof Date)) return;
  var ret = [];
  var yearStr = date.getFullYear().toString();
  var month = date.getMonth() + 1;
  var monthStr = month.toString();
  var day = date.getDate();
  var dayStr = day.toString();

  if (month >= 1 && month <= 9) {
    monthStr = '0' + month;
  }
  if (day >= 0 && day <= 9) {
    dayStr = '0' + day; 
  }
  arrayPush.call(ret, yearStr, monthStr, dayStr);

  return ret.join(sp);
}

// export function isArray(arr) {
//   return Object.prototype.toString.apply(arr) === '[object Array]';
// }

 /*base64解码 */
 export function Base64Decode(str){
   var base64DecodeChars = new Array(  
　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
　　-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
　　52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
　　-1,　0,　1,　2,　3,  4,　5,　6,　7,　8,　9, 10, 11, 12, 13, 14,
　　15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
　　-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
　　41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
     var c1, c2, c3, c4;
　　var i, len, out;
　　len = str.length;
　　i = 0;
　　out = "";
　　while(i < len) {
 /* c1 */
 do {
　　 c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
 } while(i < len && c1 == -1);
 if(c1 == -1)
　　 break;
 /* c2 */
 do {
　　 c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
 } while(i < len && c2 == -1);
 if(c2 == -1)
　　 break;
 out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
 /* c3 */
 do {
　　 c3 = str.charCodeAt(i++) & 0xff;
　　 if(c3 == 61)
　return out;
　　 c3 = base64DecodeChars[c3];
 } while(i < len && c3 == -1);
 if(c3 == -1)
　　 break;
 out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
 /* c4 */
 do {
　　 c4 = str.charCodeAt(i++) & 0xff;
　　 if(c4 == 61)
　return out;
　　 c4 = base64DecodeChars[c4];
 } while(i < len && c4 == -1);
 if(c4 == -1)
　　 break;
 out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
　　}
　　return out;
  }
export function isWeChat(){
  var agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf('micromessenger') >= 0) {
    return true;
  } else {
    return false;
  }
}
