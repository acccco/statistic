!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.zklog=t():e.zklog=t()}(window,function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0;var o,r=n(1),a=n(7),i=(o=a)&&o.__esModule?o:{default:o};var c={sid:"",appid:"{{appid}}",cid:"{{cid}}",cidSourceType:"{{cidSourceType}}",domList:"{{domlist}}",namespaces:"{{namespaces}}",varName:"{{var}}",pageAccessId:"",parentPageAccessId:"",rootUrl:window.location.href.replace(/([^#]*)(\S*)/,"$1"),pvStartTime:(new Date).valueOf(),version:"{{version}}",postUrl:"{{posturl}}"};console.log(c),c.sid=r.storage.getData(c.namespaces+"_sid_"+c.appid)||Math.round(new Date/1e3),r.storage.setData(c.namespaces+"_sid_"+c.appid,c.sid,!0),c.pageAccessId=(0,i.default)(c.appid+window.location.href);var s=r.storage.getData(c.namespaces+"_ppai_"+c.appid);s&&s!==c.pageAccessId&&(c.parentPageAccessId=s),c.domList&&(c.domList=c.domList.split(";")),1===Number(c.cidSourceType)&&(c.cid=r.storage.getData(c.namespaces+"_cid_"+c.appid)),r.storage.setData(c.namespaces+"_cid_"+c.appid,c.cid),t.config=c},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(e){return window.localStorage.getItem(e)},r=function(e,t){window.localStorage.setItem(e,t)},a=function(e){return window.sessionStorage.getItem(e)},i=function(e,t){window.sessionStorage.setItem(e,t)};t.storage={getData:function(e){return o(e)||a(e)},setData:function(e,t,n){n?i(e,t):r(e,t)},remove:function(e){window.localStorage.removeItem(e),window.sessionStorage.removeItem(e)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.event={create:function(e,t,n){e.attachEvent?e.attachEvent("on"+t,function(t){n.call(e,t)}):e.addEventListener&&e.addEventListener(t,n,!1)},preventDefault:function(e){e.preventDefault?e.preventDefault():e.returnValue=u}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.client=void 0;var o=n(2);function r(){var e=0;void 0!==window.orientation&&(e=window.orientation),screen&&screen.orientation&&void 0!==screen.orientation.angle&&(e=screen.orientation.angle),a.orientation=e}var a={isIE:/msie (\d+\.\d+)/i.test(navigator.userAgent),IEVersion:/msie (\d+\.\d+)/i.test(navigator.userAgent)?document.documentMode||0:void 0,cookieEnabled:navigator.cookieEnabled,javaEnabled:navigator.javaEnabled(),language:navigator.language||navigator.browserLanguage||navigator.systemLanguage||navigator.userLanguage||"",screenSize:(window.screen.width||0)+"x"+(window.screen.height||0),colorDepth:window.screen.colorDepth||0,orientation:0};r(),o.event.create(window,"orientationchange",r),t.client=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getBaseInfo=function(){return{rnd:Math.round(2147483647*Math.random()),ck:o.client.cookieEnabled?1:0,ja:o.client.javaEnabled?1:0,cl:o.client.colorDepth+"-bit",ds:o.client.screenSize,ln:String(o.client.language).toLowerCase(),cid:r.config.cid,sid:r.config.sid,appid:r.config.appid,v:r.config.version}};var o=n(3),r=n(0)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getPageInfo=function(){var e={pu:document.referrer,su:document.location.href,pai:o.config.pageAccessId,ppai:o.config.parentPageAccessId,tt:document.title,ct:1,pvc:0},t=r.storage.getData(o.config.namespaces+"_pvet_"+o.config.appid)||0;e.ct=function(e){if(!document.referrer)return o.config.pvStartTime-e>a?0:1;if(i(document.referrer)&&i(document.location.href))return o.config.pvStartTime-e>a?0:1;var t=u(document.referrer);return f(t,document.location.hostname)?o.config.pvStartTime-e>a?0:1:2}(t);var n=r.storage.getData(o.config.namespaces+"_pvlt_"+o.config.appid);n=n?n.split(","):[],e.pvc=n.length,n[n.length-1]!==o.config.pageAccessId&&n.push(o.config.pageAccessId);return r.storage.setData(o.config.namespaces+"_pvlt_"+o.config.appid,n.join(","),!0),r.storage.setData(o.config.namespaces+"_pvet_"+o.config.appid,o.config.pvStartTime,!0),e};var o=n(0),r=n(1),a=18e5;function i(e){for(var t=0;t<o.config.domList.length;t++)if(-1<o.config.domList[t].indexOf("/")){if(c(e,o.config.domList[t]))return!0}else{var n=s(e);if(n&&f(n,o.config.domList[t]))return!0}return!1}function c(e,t){return 0===(e=e.replace(/^https?:\/\//,"")).indexOf(t)}function s(e){return(e=u(e))?e.replace(/:\d+$/,""):e}function u(e){return(e=e.match(/^(https?:\/\/)?([^\/\?#]*)/))?e[2].replace(/.*@/,""):null}function f(e,t){e="."+e.replace(/:\d+/,""),t="."+t.replace(/:\d+/,"");var n=e.indexOf(t);return-1<n&&n+t.length===e.length}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.post=function(e,t,n,a){for(var i in e.et=t,n)""===n[i]&&delete n[i];e.ep=n;var c=[];for(var s in e){var u=e[s];if("ep"===s&&(u=JSON.stringify(e[s])),""===u)return;c.push(s+"="+encodeURIComponent(u))}var f=o.config.postUrl+"?"+c.join("&");console.log(f);var d=new Image,p="_post_log_"+Math.floor(2147483648*Math.random()).toString(36);window[p]=d,d.onload=d.onerror=d.onabort=function(){d.onload=d.onerror=d.onabort=null,d=window[p]=null;var e=r.storage.getData(o.config.namespaces+"_unset_"+o.config.appid);r.storage.setData(o.config.namespaces+"_unset_"+o.config.appid,e?e+"|"+c.join("&"):c.join("&")),a&&a(f)},d.src=f},t.postImg=function(e){e=o.config.postUrl+"?"+e;var t=new Image,n="_post_log_"+Math.floor(2147483648*Math.random()).toString(36);window[n]=t,t.onload=t.onerror=t.onabort=function(){t.onload=t.onerror=t.onabort=null,t=window[n]=null;var a=r.storage.getData(o.config.namespaces+"_unset_"+o.config.appid);r.storage.setData(o.config.namespaces+"_unset_"+o.config.appid,a+"|"+e),cb&&cb(e)},t.src=e};var o=n(0),r=n(1)},function(e,t,n){"use strict";var o;"function"==typeof Symbol&&Symbol.iterator;!function(r){function a(e,t){var n=(65535&e)+(65535&t);return(e>>16)+(t>>16)+(n>>16)<<16|65535&n}function i(e,t,n,o,r,i){return a((c=a(a(t,e),a(o,i)))<<(s=r)|c>>>32-s,n);var c,s}function c(e,t,n,o,r,a,c){return i(t&n|~t&o,e,t,r,a,c)}function s(e,t,n,o,r,a,c){return i(t&o|n&~o,e,t,r,a,c)}function u(e,t,n,o,r,a,c){return i(t^n^o,e,t,r,a,c)}function f(e,t,n,o,r,a,c){return i(n^(t|~o),e,t,r,a,c)}function d(e,t){var n,o,r,i,d;e[t>>5]|=128<<t%32,e[14+(t+64>>>9<<4)]=t;var p=1732584193,g=-271733879,l=-1732584194,v=271733878;for(n=0;n<e.length;n+=16)o=p,r=g,i=l,d=v,g=f(g=f(g=f(g=f(g=u(g=u(g=u(g=u(g=s(g=s(g=s(g=s(g=c(g=c(g=c(g=c(g,l=c(l,v=c(v,p=c(p,g,l,v,e[n],7,-680876936),g,l,e[n+1],12,-389564586),p,g,e[n+2],17,606105819),v,p,e[n+3],22,-1044525330),l=c(l,v=c(v,p=c(p,g,l,v,e[n+4],7,-176418897),g,l,e[n+5],12,1200080426),p,g,e[n+6],17,-1473231341),v,p,e[n+7],22,-45705983),l=c(l,v=c(v,p=c(p,g,l,v,e[n+8],7,1770035416),g,l,e[n+9],12,-1958414417),p,g,e[n+10],17,-42063),v,p,e[n+11],22,-1990404162),l=c(l,v=c(v,p=c(p,g,l,v,e[n+12],7,1804603682),g,l,e[n+13],12,-40341101),p,g,e[n+14],17,-1502002290),v,p,e[n+15],22,1236535329),l=s(l,v=s(v,p=s(p,g,l,v,e[n+1],5,-165796510),g,l,e[n+6],9,-1069501632),p,g,e[n+11],14,643717713),v,p,e[n],20,-373897302),l=s(l,v=s(v,p=s(p,g,l,v,e[n+5],5,-701558691),g,l,e[n+10],9,38016083),p,g,e[n+15],14,-660478335),v,p,e[n+4],20,-405537848),l=s(l,v=s(v,p=s(p,g,l,v,e[n+9],5,568446438),g,l,e[n+14],9,-1019803690),p,g,e[n+3],14,-187363961),v,p,e[n+8],20,1163531501),l=s(l,v=s(v,p=s(p,g,l,v,e[n+13],5,-1444681467),g,l,e[n+2],9,-51403784),p,g,e[n+7],14,1735328473),v,p,e[n+12],20,-1926607734),l=u(l,v=u(v,p=u(p,g,l,v,e[n+5],4,-378558),g,l,e[n+8],11,-2022574463),p,g,e[n+11],16,1839030562),v,p,e[n+14],23,-35309556),l=u(l,v=u(v,p=u(p,g,l,v,e[n+1],4,-1530992060),g,l,e[n+4],11,1272893353),p,g,e[n+7],16,-155497632),v,p,e[n+10],23,-1094730640),l=u(l,v=u(v,p=u(p,g,l,v,e[n+13],4,681279174),g,l,e[n],11,-358537222),p,g,e[n+3],16,-722521979),v,p,e[n+6],23,76029189),l=u(l,v=u(v,p=u(p,g,l,v,e[n+9],4,-640364487),g,l,e[n+12],11,-421815835),p,g,e[n+15],16,530742520),v,p,e[n+2],23,-995338651),l=f(l,v=f(v,p=f(p,g,l,v,e[n],6,-198630844),g,l,e[n+7],10,1126891415),p,g,e[n+14],15,-1416354905),v,p,e[n+5],21,-57434055),l=f(l,v=f(v,p=f(p,g,l,v,e[n+12],6,1700485571),g,l,e[n+3],10,-1894986606),p,g,e[n+10],15,-1051523),v,p,e[n+1],21,-2054922799),l=f(l,v=f(v,p=f(p,g,l,v,e[n+8],6,1873313359),g,l,e[n+15],10,-30611744),p,g,e[n+6],15,-1560198380),v,p,e[n+13],21,1309151649),l=f(l,v=f(v,p=f(p,g,l,v,e[n+4],6,-145523070),g,l,e[n+11],10,-1120210379),p,g,e[n+2],15,718787259),v,p,e[n+9],21,-343485551),p=a(p,o),g=a(g,r),l=a(l,i),v=a(v,d);return[p,g,l,v]}function p(e){var t,n="",o=32*e.length;for(t=0;t<o;t+=8)n+=String.fromCharCode(e[t>>5]>>>t%32&255);return n}function g(e){var t,n=[];for(n[(e.length>>2)-1]=void 0,t=0;t<n.length;t+=1)n[t]=0;var o=8*e.length;for(t=0;t<o;t+=8)n[t>>5]|=(255&e.charCodeAt(t/8))<<t%32;return n}function l(e){var t,n,o="";for(n=0;n<e.length;n+=1)t=e.charCodeAt(n),o+="0123456789abcdef".charAt(t>>>4&15)+"0123456789abcdef".charAt(15&t);return o}function v(e){return unescape(encodeURIComponent(e))}function m(e){return function(e){return p(d(g(e),8*e.length))}(v(e))}function w(e,t){return function(e,t){var n,o,r=g(e),a=[],i=[];for(a[15]=i[15]=void 0,r.length>16&&(r=d(r,8*e.length)),n=0;n<16;n+=1)a[n]=909522486^r[n],i[n]=1549556828^r[n];return o=d(a.concat(g(t)),512+8*t.length),p(d(i.concat(o),640))}(v(e),v(t))}function _(e,t,n){return t?n?w(t,e):l(w(t,e)):n?m(e):l(m(e))}void 0===(o=function(){return _}.call(t,n,t,e))||(e.exports=o)}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.atInit=function(){r.event.create(document,g.replace(/[vV]isibilityState/,"visibilitychange"),m),r.event.create(window,"pageshow",m),r.event.create(window,"pagehide",m),"object"===o(document.onfocusin)?(r.event.create(document,"focusin",function(){l=!0,m()}),r.event.create(document,"focusout",function(){l=!1,m()})):(r.event.create(window,"focus",function(){l=!0,m()}),r.event.create(window,"blur",function(){l=!1,m()}))},t.getActiveTime=function(){var e=(new Date).valueOf(),t=e-c-s;return{pai:a.config.pageAccessId,pvt:e-c,pft:t>0?t:0}},t.getUserActiveTime=function(){var e=(new Date).valueOf(),t=e-u-f,n={pai:a.config.pageAccessId,pvt:e-u,pft:t>0?t:0};return u=new Date,f=0,n};var r=n(2),a=n(0),i=new Date,c=new Date,s=0,u=new Date,f=0;function d(e){if(!(e in document))for(var t=["webkit","ms","moz","o"],n=0;n<t.length;n++){var o=t[n]+e.charAt(0).toUpperCase()+e.slice(1);if(o in document){e=o;break}}return e}var p=d("hidden"),g=d("visibilityState"),l=!0,v=null;function m(){clearTimeout(v);var e=!0;g?e="visible"===document[g]:p&&(e=!document[p]),e&&l?i=new Date:(s+=new Date-i,f+=new Date-i,i=new Date),v=setTimeout(m,100)}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.bInit=function(){o.event.create(document,"click",function(){r.ckc++,a.ckc++}),o.event.create(document,"keyup",function(){r.kc++,a.kc++}),o.event.create(document,"scroll",function(){r.sc++,a.sc++})},t.getBehavior=function(){return r},t.getUserBehavior=function(){var e={sc:a.sc,kc:a.kc,ckc:a.ckc};return a={sc:0,kc:0,ckc:0},e};var o=n(2),r={sc:0,kc:0,ckc:0},a={sc:0,kc:0,ckc:0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.timing=function(){var e={};if(window.performance&&performance.timing){var t=performance.timing;e={nat:t.requestStart-t.navigationStart,ndt:t.domainLookupStart-t.domainLookupEnd,ntt:t.connectStart-t.connectEnd,srt:t.responseStart-t.requestStart,dpt:t.domInteractive-t.fetchStart,wit:t.loadEventEnd-t.navigationStart}}return e}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pageStart=h,t.pageClose=b,t.postError=y,t.userEvent=S;var o=n(2),r=n(10),a=n(9),i=n(8),c=n(6),s=n(0),u=n(5),f=n(4),d=n(1);try{(0,i.atInit)(),(0,a.bInit)();for(var p=!0,g={_trackPageview:h,_closePageview:b,_trackEvent:S,_setAutoPageview:function(e){p=e[1]},_postError:y},l=window[s.config.varName]||[],v=0,m=l.length;v<m;v++)l[v]="string"==typeof l[v]?[l[v]]:l[v],g[l[v][0]](l[v]);var w=l.push;l.push=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];for(var o=0,r=t.length;o<r;o++)t[o]="string"==typeof t[o]?[t[o]]:t[o],g[t[o][0]](t[o]);w.apply(l,t)};var _=d.storage.getData(s.config.namespaces+"_unset_"+s.config.appid);for(_=_?_.split("|"):[],d.storage.remove(s.config.namespaces+"_unset");_[0];)(0,c.postImg)(_[0]),_.shift();o.event.create(window,"load",function(){p&&(0,c.post)((0,f.getBaseInfo)(),0,(0,u.getPageInfo)()),setTimeout(function(){(0,c.post)((0,f.getBaseInfo)(),1,(0,r.timing)())},5e3)}),o.event.create(window,"unload",function(){d.storage.setData(s.config.namespaces+"_ppai_"+s.config.appid,s.config.pageAccessId,!0),(0,c.post)((0,f.getBaseInfo)(),3,Object.assign({su:window.location.href,ot:new Date-s.config.pvStartTime},(0,a.getBehavior)(),(0,i.getActiveTime)()))})}catch(e){console.log(e),(0,c.post)((0,f.getBaseInfo)(),10,{rpu:document.referrer,errt:e.name,errm:e.message})}function h(){s.config.pageAccessId=new Date%63353,s.config.pageInTime=Math.round(new Date/1e3),s.config.pvStartTime=(new Date).valueOf(),(0,c.post)((0,f.getBaseInfo)(),0,(0,u.getPageInfo)())}function b(){d.storage.setData(s.config.namespaces+"_ppai_"+s.config.appid,s.config.pageAccessId,!0),s.config.parentPageAccessId=s.config.pageAccessId,(0,c.post)((0,f.getBaseInfo)(),3,Object.assign({su:window.location.href,ot:new Date-s.config.pvStartTime},(0,a.getUserBehavior)(),(0,i.getUserActiveTime)()))}function y(e){(0,c.post)({},10,{rpu:document.referrer,errt:e.name,errm:e.message})}function S(e){(0,c.post)((0,f.getBaseInfo)(),2,{ot:new Date-s.config.pvStartTime,pai:s.config.pageAccessId,cat:e[1],an:e[2],ola:e[3],ova:e[4]})}}])});
//# sourceMappingURL=zklog.js.map