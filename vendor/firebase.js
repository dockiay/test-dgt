var io=()=>{};var oo=function(n){let e=[],t=0;for(let r=0;r<n.length;r++){let i=n.charCodeAt(r);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},lu=function(n){let e=[],t=0,r=0;for(;t<n.length;){let i=n[t++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){let s=n[t++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){let s=n[t++],o=n[t++],a=n[t++],c=((i&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{let s=n[t++],o=n[t++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},ao={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();let t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<n.length;i+=3){let s=n[i],o=i+1<n.length,a=o?n[i+1]:0,c=i+2<n.length,d=c?n[i+2]:0,_=s>>2,I=(s&3)<<4|a>>4,w=(a&15)<<2|d>>6,k=d&63;c||(k=64,o||(w=64)),r.push(t[_],t[I],t[w],t[k])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(oo(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):lu(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();let t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<n.length;){let s=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;let d=i<n.length?t[n.charAt(i)]:64;++i;let I=i<n.length?t[n.charAt(i)]:64;if(++i,s==null||a==null||d==null||I==null)throw new ni;let w=s<<2|a>>4;if(r.push(w),d!==64){let k=a<<4&240|d>>2;if(r.push(k),I!==64){let A=d<<6&192|I;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}},ni=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},hu=function(n){let e=oo(n);return ao.encodeByteArray(e,!0)},Ot=function(n){return hu(n).replace(/\./g,"")},Rn=function(n){try{return ao.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function du(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var fu=()=>du().__FIREBASE_DEFAULTS__,pu=()=>{if(typeof process>"u"||typeof process.env>"u")return;let n=process.env.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},mu=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=n&&Rn(n[1]);return e&&JSON.parse(e)},ii=()=>{try{return io()||fu()||pu()||mu()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},si=n=>ii()?.emulatorHosts?.[n],co=n=>{let e=si(n);if(!e)return;let t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},oi=()=>ii()?.config,ai=n=>ii()?.[`_${n}`];var nt=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}};function uo(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let t={alg:"none",type:"JWT"},r=e||"demo-project",i=n.iat||0,s=n.sub||n.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Ot(JSON.stringify(t)),Ot(JSON.stringify(o)),""].join(".")}function W(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(W())}function ho(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function fo(){let n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function po(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function mo(){let n=W();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function go(){try{return typeof indexedDB=="object"}catch{return!1}}function _o(){return new Promise((n,e)=>{try{let t=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{e(i.error?.message||"")}}catch(t){e(t)}})}var gu="FirebaseError",K=class n extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=gu,Object.setPrototypeOf(this,n.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,pe.prototype.create)}},pe=class{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){let r=t[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?_u(s,r):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new K(i,a,r)}};function _u(n,e){try{let t=0,r="";for(;t<n.length;){let i=n.indexOf("{$",t);if(i===-1){r+=n.substring(t);break}let s=n.indexOf("}",i+2);if(s===-1){r+=n.substring(t);break}let o=n.substring(i+2,s),a=e[o];r+=n.substring(t,i)+(a!=null?String(a):`<${o}?>`),t=s+1}return r}catch{return n}}function yo(n){for(let e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function ne(n,e){if(n===e)return!0;let t=Object.keys(n),r=Object.keys(e);for(let i of t){if(!r.includes(i))return!1;let s=n[i],o=e[i];if(so(s)&&so(o)){if(!ne(s,o))return!1}else if(s!==o)return!1}for(let i of r)if(!t.includes(i))return!1;return!0}function so(n){return n!==null&&typeof n=="object"}function rt(n){let e=[];for(let[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function it(n){let e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){let[i,s]=r.split("=");e[decodeURIComponent(i)]=decodeURIComponent(s)}}),e}function st(n){let e=n.indexOf("?");if(!e)return"";let t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Io(n,e){let t=new ri(n,e);return t.subscribe.bind(t)}var ri=class{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let i;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");yu(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:r},i.next===void 0&&(i.next=ti),i.error===void 0&&(i.error=ti),i.complete===void 0&&(i.complete=ti);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function yu(n,e){if(typeof n!="object"||n===null)return!1;for(let t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ti(){}var Qd=4*60*60*1e3;function C(n){return n&&n._delegate?n._delegate:n}function xe(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Nn(n){return(await fetch(n,{credentials:"include"})).ok}var X=class{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var Me="[DEFAULT]";var ci=class{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){let r=new nt;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:t});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){let t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Eu(e))try{this.getOrInitializeService({instanceIdentifier:Me})}catch{}for(let[t,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(t);try{let s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Me){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){let e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Me){return this.instances.has(e)}getOptions(e=Me){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:t});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);r===a&&o.resolve(i)}return i}onInit(e,t){let r=this.normalizeInstanceIdentifier(t),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);let s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,t){let r=this.onInitCallbacks.get(t);if(r)for(let i of r)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Iu(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Me){return this.component?this.component.multipleInstances?e:Me:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Iu(n){return n===Me?void 0:n}function Eu(n){return n.instantiationMode==="EAGER"}var Pn=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let t=new ci(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}};var wu=[],v;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(v||(v={}));var Tu={debug:v.DEBUG,verbose:v.VERBOSE,info:v.INFO,warn:v.WARN,error:v.ERROR,silent:v.SILENT},bu=v.INFO,vu={[v.DEBUG]:"log",[v.VERBOSE]:"log",[v.INFO]:"info",[v.WARN]:"warn",[v.ERROR]:"error"},Au=(n,e,...t)=>{if(e<n.logLevel)return;let r=new Date().toISOString(),i=vu[e];if(i)console[i](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},ve=class{constructor(e){this.name=e,this._logLevel=bu,this._logHandler=Au,this._userLogHandler=null,wu.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in v))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Tu[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,v.DEBUG,...e),this._logHandler(this,v.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,v.VERBOSE,...e),this._logHandler(this,v.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,v.INFO,...e),this._logHandler(this,v.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,v.WARN,...e),this._logHandler(this,v.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,v.ERROR,...e),this._logHandler(this,v.ERROR,...e)}};var Su=(n,e)=>e.some(t=>n instanceof t),Eo,wo;function Ru(){return Eo||(Eo=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Nu(){return wo||(wo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var To=new WeakMap,li=new WeakMap,bo=new WeakMap,ui=new WeakMap,di=new WeakMap;function Pu(n){let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("success",s),n.removeEventListener("error",o)},s=()=>{t(ae(n.result)),i()},o=()=>{r(n.error),i()};n.addEventListener("success",s),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&To.set(t,n)}).catch(()=>{}),di.set(e,n),e}function ku(n){if(li.has(n))return;let e=new Promise((t,r)=>{let i=()=>{n.removeEventListener("complete",s),n.removeEventListener("error",o),n.removeEventListener("abort",o)},s=()=>{t(),i()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",s),n.addEventListener("error",o),n.addEventListener("abort",o)});li.set(n,e)}var hi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return li.get(n);if(e==="objectStoreNames")return n.objectStoreNames||bo.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ae(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function vo(n){hi=n(hi)}function Du(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){let r=n.call(kn(this),e,...t);return bo.set(r,e.sort?e.sort():[e]),ae(r)}:Nu().includes(n)?function(...e){return n.apply(kn(this),e),ae(To.get(this))}:function(...e){return ae(n.apply(kn(this),e))}}function Cu(n){return typeof n=="function"?Du(n):(n instanceof IDBTransaction&&ku(n),Su(n,Ru())?new Proxy(n,hi):n)}function ae(n){if(n instanceof IDBRequest)return Pu(n);if(ui.has(n))return ui.get(n);let e=Cu(n);return e!==n&&(ui.set(n,e),di.set(e,n)),e}var kn=n=>di.get(n);function So(n,e,{blocked:t,upgrade:r,blocking:i,terminated:s}={}){let o=indexedDB.open(n,e),a=ae(o);return r&&o.addEventListener("upgradeneeded",c=>{r(ae(o.result),c.oldVersion,c.newVersion,ae(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),i&&c.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),a}var Ou=["get","getKey","getAll","getAllKeys","count"],Vu=["put","add","delete","clear"],fi=new Map;function Ao(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(fi.get(e))return fi.get(e);let t=e.replace(/FromIndex$/,""),r=e!==t,i=Vu.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Ou.includes(t)))return;let s=async function(o,...a){let c=this.transaction(o,i?"readwrite":"readonly"),d=c.store;return r&&(d=d.index(a.shift())),(await Promise.all([d[t](...a),i&&c.done]))[0]};return fi.set(e,s),s}vo(n=>({...n,get:(e,t,r)=>Ao(e,t)||n.get(e,t,r),has:(e,t)=>!!Ao(e,t)||n.has(e,t)}));var mi=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Lu(t)){let r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}};function Lu(n){return n.getComponent()?.type==="VERSION"}var gi="@firebase/app",Ro="0.16.5";var ge=new ve("@firebase/app"),xu="@firebase/app-compat",Mu="@firebase/analytics-compat",Uu="@firebase/analytics",Fu="@firebase/app-check-compat",ju="@firebase/app-check",Bu="@firebase/auth",qu="@firebase/auth-compat",$u="@firebase/crashlytics",Wu="@firebase/database",Hu="@firebase/data-connect",zu="@firebase/database-compat",Gu="@firebase/functions",Ku="@firebase/functions-compat",Yu="@firebase/installations",Ju="@firebase/installations-compat",Qu="@firebase/messaging",Xu="@firebase/messaging-compat",Zu="@firebase/performance",el="@firebase/performance-compat",tl="@firebase/remote-config",nl="@firebase/remote-config-compat",rl="@firebase/storage",il="@firebase/storage-compat",sl="@firebase/firestore",ol="@firebase/ai",al="@firebase/firestore-compat",cl="firebase",ul="13.2.0";var _i="[DEFAULT]",ll={[gi]:"fire-core",[xu]:"fire-core-compat",[Uu]:"fire-analytics",[Mu]:"fire-analytics-compat",[ju]:"fire-app-check",[Fu]:"fire-app-check-compat",[Bu]:"fire-auth",[qu]:"fire-auth-compat",[$u]:"fire-cls",[Wu]:"fire-rtdb",[Hu]:"fire-data-connect",[zu]:"fire-rtdb-compat",[Gu]:"fire-fn",[Ku]:"fire-fn-compat",[Yu]:"fire-iid",[Ju]:"fire-iid-compat",[Qu]:"fire-fcm",[Xu]:"fire-fcm-compat",[Zu]:"fire-perf",[el]:"fire-perf-compat",[tl]:"fire-rc",[nl]:"fire-rc-compat",[rl]:"fire-gcs",[il]:"fire-gcs-compat",[sl]:"fire-fst",[al]:"fire-fst-compat",[ol]:"fire-vertex","fire-js":"fire-js",[cl]:"fire-js-all"};var Dn=new Map,hl=new Map,yi=new Map;function No(n,e){try{n.container.addComponent(e)}catch(t){ge.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Ae(n){let e=n.name;if(yi.has(e))return ge.debug(`There were multiple attempts to register component ${e}.`),!1;yi.set(e,n);for(let t of Dn.values())No(t,n);for(let t of hl.values())No(t,n);return!0}function Lt(n,e){let t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function G(n){return n==null?!1:n.settings!==void 0}var dl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},me=new pe("app","Firebase",dl);var Ii=class{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new X("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw me.create("app-deleted",{appName:this._name})}};var Se=ul;function Co(n,e={}){let t=n;typeof e!="object"&&(e={name:e});let r={name:_i,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw me.create("bad-app-name",{appName:String(i)});if(t||(t=oi()),!t)throw me.create("no-options");let s=Dn.get(i);if(s)if(ne(t,s.options)){if(ne(r,s.config))return s;throw me.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(s.config),newValue:JSON.stringify(r)})}else throw me.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(s.options),newValue:JSON.stringify(t)});let o=new Pn(i);for(let c of yi.values())o.addComponent(c);let a=new Ii(t,r,o);return Dn.set(i,a),a}function Cn(n=_i){let e=Dn.get(n);if(!e&&n===_i&&oi())return Co();if(!e)throw me.create("no-app",{appName:n});return e}function re(n,e,t){let r=ll[n]??n;t&&(r+=`-${t}`);let i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){let o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),ge.warn(o.join(" "));return}Ae(new X(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var fl="firebase-heartbeat-database",pl=1,Vt="firebase-heartbeat-store",pi=null;function Oo(){return pi||(pi=So(fl,pl,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Vt)}catch(t){console.warn(t)}}}}).catch(n=>{throw me.create("idb-open",{originalErrorMessage:n.message})})),pi}async function ml(n){try{let t=(await Oo()).transaction(Vt),r=await t.objectStore(Vt).get(Vo(n));return await t.done,r}catch(e){if(e instanceof K)ge.warn(e.message);else{let t=me.create("idb-get",{originalErrorMessage:e?.message});ge.warn(t.message)}}}async function Po(n,e){try{let r=(await Oo()).transaction(Vt,"readwrite");await r.objectStore(Vt).put(e,Vo(n)),await r.done}catch(t){if(t instanceof K)ge.warn(t.message);else{let r=me.create("idb-set",{originalErrorMessage:t?.message});ge.warn(r.message)}}}function Vo(n){return`${n.name}!${n.options.appId}`}var gl=1024,_l=30,Ei=class{constructor(e){this.container=e,this._heartbeatsCache=null;let t=this.container.getProvider("app").getImmediate();this._storage=new wi(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{let t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=ko();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(i=>i.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>_l){let i=Il(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){ge.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";let e=ko(),{heartbeatsToSend:t,unsentEntries:r}=yl(this._heartbeatsCache.heartbeats),i=Ot(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(e){return ge.warn(e),""}}};function ko(){return new Date().toISOString().substring(0,10)}function yl(n,e=gl){let t=[],r=n.slice();for(let i of n){let s=t.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Do(t)>e){s.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),Do(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}var wi=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return go()?_o().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let t=await ml(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return Po(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){let r=await this.read();return Po(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}};function Do(n){return Ot(JSON.stringify({version:2,heartbeats:n})).length}function Il(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}function El(n){Ae(new X("platform-logger",e=>new mi(e),"PRIVATE")),Ae(new X("heartbeat",e=>new Ei(e),"PRIVATE")),re(gi,Ro,n),re(gi,Ro,"esm2020"),re("fire-js","")}El("");var wl="firebase",Tl="13.2.0";re(wl,Tl,"app");function ea(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var ta=ea,na=new pe("auth","Firebase",ea());var jn=new ve("@firebase/auth");function Vn(n,...e){jn.logLevel<=v.WARN&&jn.warn(`Auth (${Se}): ${n}`,...e)}function Ln(n,...e){jn.logLevel<=v.ERROR&&jn.error(`Auth (${Se}): ${n}`,...e)}function Z(n,...e){throw Wi(n,...e)}function ie(n,...e){return Wi(n,...e)}function ur(n,e,t){let r={...ta(),[e]:t};return new pe("auth","Firebase",r).create(e,{appName:n.name})}function Pe(n){return ur(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ra(n,e,t){let r=t;if(!(e instanceof r))throw r.name!==e.constructor.name&&Z(n,"argument-error"),ur(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Wi(n,...e){if(typeof n!="string"){let t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return na.create(n,...e)}function T(n,e,...t){if(!n)throw Wi(e,...t)}function ce(n){let e="INTERNAL ASSERTION FAILED: "+n;throw Ln(e),new Error(e)}function ye(n,e){n||ce(e)}function Ri(){return typeof self<"u"&&self.location?.href||""}function bl(){return Lo()==="http:"||Lo()==="https:"}function Lo(){return typeof self<"u"&&self.location?.protocol||null}function vl(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bl()||fo()||"connection"in navigator)?navigator.onLine:!0}function Al(){if(typeof navigator>"u")return null;let n=navigator;return n.languages&&n.languages[0]||n.language||null}var Ue=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,ye(t>e,"Short delay should be less than long delay!"),this.isMobile=lo()||po()}get(){return vl()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Hi(n,e){ye(n.emulator,"Emulator should always be set here");let{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}var Bn=class{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ce("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ce("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ce("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}};var Sl={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};var Rl=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Nl=new Ue(3e4,6e4);function U(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function H(n,e,t,r,i={}){return ia(n,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});let a=rt({...o,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);let d={method:e,headers:c,...s};return ho()||(d.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&xe(n.emulatorConfig.host)&&(d.credentials="include"),Bn.fetch()(await sa(n,n.config.apiHost,t,a),d)})}async function ia(n,e,t){n._canInitEmulator=!1;let r={...Sl,...e};try{let i=new Ni(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();let o=await s.json();if("needConfirmation"in o)throw Mt(n,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{let a=s.ok?o.errorMessage:o.error.message,[c,d]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mt(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Mt(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Mt(n,"user-disabled",o);let _=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw ur(n,_,d);Z(n,_)}}catch(i){if(i instanceof K)throw i;Z(n,"network-request-failed",{message:String(i)})}}async function $e(n,e,t,r,i={}){let s=await H(n,e,t,r,i);return"mfaPendingCredential"in s&&Z(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function sa(n,e,t,r){let i=`${e}${t}?${r}`,s=n,o=s.config.emulator?Hi(n.config,i):`${n.config.apiScheme}://${i}`;return Rl.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}function Pl(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}var Ni=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ie(this.auth,"network-request-failed")),Nl.get())})}};function Mt(n,e,t){let r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);let i=ie(n,e,r);return i.customData._tokenResponse=t,i}function xo(n){return n!==void 0&&n.enterprise!==void 0}var qn=class{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return Pl(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}};async function oa(n,e){return H(n,"GET","/v2/recaptchaConfig",U(n,e))}async function kl(n,e){return H(n,"POST","/v1/accounts:delete",e)}async function $n(n,e){return H(n,"POST","/v1/accounts:lookup",e)}function Ut(n){if(n)try{let e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function aa(n,e=!1){let t=C(n),r=await t.getIdToken(e),i=zi(r);T(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");let s=typeof i.firebase=="object"?i.firebase:void 0,o=s?.sign_in_provider;return{claims:i,token:r,authTime:Ut(Ti(i.auth_time)),issuedAtTime:Ut(Ti(i.iat)),expirationTime:Ut(Ti(i.exp)),signInProvider:o||null,signInSecondFactor:s?.sign_in_second_factor||null}}function Ti(n){return Number(n)*1e3}function zi(n){let[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Ln("JWT malformed, contained fewer than 3 sections"),null;try{let i=Rn(t);return i?JSON.parse(i):(Ln("Failed to decode base64 JWT payload"),null)}catch(i){return Ln("Caught error parsing JWT payload as JSON",i?.toString()),null}}function Mo(n){let e=zi(n);return T(e,"internal-error"),T(typeof e.exp<"u","internal-error"),T(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}async function $t(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw ca(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function ca(n){return n instanceof K?n.code==="auth/user-disabled"||n.code==="auth/user-token-expired":!1}var Pi=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;let r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}};var Wt=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ut(this.lastLoginAt),this.creationTime=Ut(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function Wn(n){let e=n.auth,t=await n.getIdToken(),r=await $t(n,$n(e,{idToken:t}));T(r?.users.length,e,"internal-error");let i=r.users[0];n._notifyReloadListener(i);let s=i.providerUserInfo?.length?la(i.providerUserInfo):[],o=Dl(n.providerData,s),a=n.isAnonymous,c=!(n.email&&i.passwordHash)&&!o?.length,d=a?c:!1,_={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new Wt(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(n,_)}async function ua(n){let e=C(n);await Wn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Dl(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function la(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function Cl(n,e){let t=await ia(n,{},async()=>{let r=rt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,o=await sa(n,i,"/v1/token",`key=${s}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";let c={method:"POST",headers:a,body:r};return n.emulatorConfig&&xe(n.emulatorConfig.host)&&(c.credentials="include"),Bn.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function Ol(n,e){return H(n,"POST","/v2/accounts:revokeToken",U(n,e))}var Ft=class n{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e5}updateFromServerResponse(e){T(e.idToken,"internal-error"),T(typeof e.idToken<"u","internal-error"),T(typeof e.refreshToken<"u","internal-error");let t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Mo(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){T(e.length!==0,"internal-error");let t=Mo(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(T(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:r,refreshToken:i,expiresIn:s}=await Cl(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){let{refreshToken:r,accessToken:i,expirationTime:s}=t,o=new n;return r&&(T(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(T(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(T(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new n,this.toJSON())}_performRefresh(){return ce("not implemented")}};function Re(n,e){T(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}var Ne=class n{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Pi(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Wt(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){let t=await $t(this,this.stsTokenManager.getToken(this.auth,e));return T(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return aa(this,e)}reload(){return ua(this)}_assign(e){this!==e&&(T(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){let t=new n({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){T(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await Wn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(G(this.auth.app))return Promise.reject(Pe(this.auth));let e=await this.getIdToken();return await $t(this,kl(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){let r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,d=t.createdAt??void 0,_=t.lastLoginAt??void 0,{uid:I,emailVerified:w,isAnonymous:k,providerData:A,stsTokenManager:D}=t;T(I&&D,e,"internal-error");let S=Ft.fromJSON(this.name,D);T(typeof I=="string",e,"internal-error"),Re(r,e.name),Re(i,e.name),T(typeof w=="boolean",e,"internal-error"),T(typeof k=="boolean",e,"internal-error"),Re(s,e.name),Re(o,e.name),Re(a,e.name),Re(c,e.name),Re(d,e.name),Re(_,e.name);let be=new n({uid:I,auth:e,email:i,emailVerified:w,displayName:r,isAnonymous:k,photoURL:o,phoneNumber:s,tenantId:a,stsTokenManager:S,createdAt:d,lastLoginAt:_});return A&&Array.isArray(A)&&(be.providerData=A.map(et=>({...et}))),c&&(be._redirectEventId=c),be}static async _fromIdTokenResponse(e,t,r=!1){let i=new Ft;i.updateFromServerResponse(t);let s=new n({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Wn(s),s}static async _fromGetAccountInfoResponse(e,t,r){let i=t.users[0];T(i.localId!==void 0,"internal-error");let s=i.providerUserInfo!==void 0?la(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!s?.length,a=new Ft;a.updateFromIdToken(r);let c=new n({uid:i.localId,auth:e,stsTokenManager:a,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new Wt(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!s?.length};return Object.assign(c,d),c}};var Uo=new Map;function _e(n){ye(n instanceof Function,"Expected a class definition");let e=Uo.get(n);return e?(ye(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Uo.set(n,e),e)}var Hn=class{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};Hn.type="NONE";var ki=Hn;function xn(n,e,t){return`firebase:${n}:${e}:${t}`}var jt=class n{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;let{config:i,name:s}=this.auth;this.fullUserKey=xn(this.userKey,i.apiKey,s),this.fullPersistenceKey=xn("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){let t=await $n(this.auth,{idToken:e}).catch(()=>{});return t?Ne._fromGetAccountInfoResponse(this.auth,t,e):null}return Ne._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,r="authUser"){if(!t.length)return new n(_e(ki),e,r);let i=(await Promise.all(t.map(async d=>{try{if(await d._isAvailable())return d}catch{return}}))).filter(d=>d),s=i[0]||_e(ki),o=xn(r,e.config.apiKey,e.name),a=null;for(let d of t)try{let _=await d._get(o);if(_){let I;if(typeof _=="string"){let w=await $n(e,{idToken:_}).catch(()=>{});if(!w)break;I=await Ne._fromGetAccountInfoResponse(e,w,_)}else I=Ne._fromJSON(e,_);d!==s&&(a=I),s=d;break}}catch{}let c=i.filter(d=>d._shouldAllowMigration);return!s._shouldAllowMigration||!c.length?new n(s,e,r):(s=c[0],a&&await s._set(o,a.toJSON()),await Promise.all(t.map(async d=>{if(d!==s)try{await d._remove(o)}catch{}})),new n(s,e,r))}};function Fo(n){let e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(pa(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ha(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ga(e))return"Blackberry";if(_a(e))return"Webos";if(da(e))return"Safari";if((e.includes("chrome/")||fa(e))&&!e.includes("edge/"))return"Chrome";if(ma(e))return"Android";{let t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function ha(n=W()){return/firefox\//i.test(n)}function da(n=W()){let e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function fa(n=W()){return/crios\//i.test(n)}function pa(n=W()){return/iemobile/i.test(n)}function ma(n=W()){return/android/i.test(n)}function ga(n=W()){return/blackberry/i.test(n)}function _a(n=W()){return/webos/i.test(n)}function Gi(n=W()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function Vl(n=W()){return Gi(n)&&!!window.navigator?.standalone}function Ll(){return mo()&&document.documentMode===10}function ya(n=W()){return Gi(n)||ma(n)||_a(n)||ga(n)||/windows phone/i.test(n)||pa(n)}function Ia(n,e=[]){let t;switch(n){case"Browser":t=Fo(W());break;case"Worker":t=`${Fo(W())}-${n}`;break;default:t=n}let r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Se}/${r}`}var Di=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let r=s=>new Promise((o,a)=>{try{let c=e(s);o(c)}catch(c){a(c)}});r.onAbort=t,this.queue.push(r);let i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(let i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}};async function xl(n,e={}){return H(n,"GET","/v2/passwordPolicy",U(n,e))}var Ml=6,Ci=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Ml,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){let r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}};var Oi=class{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zn(this),this.idTokenSubscription=new zn(this),this.beforeStateQueue=new Di(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=na,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=_e(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted){try{this.persistenceManager=await jt.create(this,e)}catch(r){Vn(`Failed to initialize persistence: ${r}`),this.persistenceManager=await jt.create(this,[])}finally{this._resolvePersistenceManagerAvailable?.()}if(!this._deleted){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(r){Vn(`Failed to initialize current user: ${r}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await $n(this,{idToken:e}),r=await Ne._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(G(this.app)){let s=this.app.settings.authIdToken;return s?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(s).then(o,o))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let s=this.redirectUser?._redirectEventId,o=r?._redirectEventId,a=await this.tryRedirectSignIn(e);(!s||s===o)&&a?.user&&(r=a.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(s){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(s))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return T(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await Wn(e)}catch(t){if(ca(t))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Al()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(G(this.app))return Promise.reject(Pe(this));let t=e?C(e):null;return t&&T(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&T(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return G(this.app)?Promise.reject(Pe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return G(this.app)?Promise.reject(Pe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(_e(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=await xl(this),t=new Ci(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new pe("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ol(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&_e(e)||this._popupRedirectResolver;T(t,this,"argument-error"),this.redirectPersistenceManager=await jt.create(this,[_e(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};let s=typeof t=="function"?t:t.next.bind(t),o=!1,a=this._isInitialized?Promise.resolve():this._initializationPromise;if(T(a,this,"internal-error"),a.then(()=>{o||s(this.currentUser)}).catch(c=>{if(!o)if(typeof t!="function"&&t.error)t.error(c);else if(r)r(c);else throw c}),typeof t=="function"){let c=e.addObserver(t,r,i);return()=>{o=!0,c()}}else{let c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){let r=t?.message||String(t),i=ur(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw i.customData={originalError:t},i}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return T(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ia(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);let r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(G(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Vn(`Error while retrieving App Check token: ${e.error}`),e?.token}};function Ie(n){return C(n)}var zn=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=Io(t=>this.observer=t)}get next(){return T(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}};var lr={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Ul(n){lr=n}function Ea(n){return lr.loadJS(n)}function Fl(){return lr.recaptchaEnterpriseScript}function jl(){return lr.gapiScript}function wa(n){return`__${n}${Math.floor(Math.random()*1e6)}`}var Vi=class{constructor(){this.enterprise=new Li}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}},Li=class{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}};var Bl="recaptcha-enterprise",Bt="NO_RECAPTCHA",jo="onFirebaseAuthREInstanceReady",Ht=class n{constructor(e){this.type=Bl,this.auth=Ie(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(o,a)=>{oa(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{let d=new qn(c);return s.tenantId==null?s._agentRecaptchaConfig=d:s._tenantRecaptchaConfigs[s.tenantId]=d,o(d.siteKey)}}).catch(c=>{a(c)})})}function i(s,o,a){let c=window.grecaptcha;xo(c)?c.enterprise.ready(()=>{c.enterprise.execute(s,{action:e}).then(d=>{o(d)}).catch(()=>{o(Bt)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Vi().execute("siteKey",{action:"verify"}):new Promise((s,o)=>{r(this.auth).then(async a=>{if(!t&&xo(window.grecaptcha)&&n.scriptInjectionDeferred)await n.scriptInjectionDeferred.promise,i(a,s,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=Fl();c.length!==0&&(c+=a+`&onload=${jo}`),n.scriptInjectionDeferred=new nt,window[jo]=()=>{n.scriptInjectionDeferred?.resolve()},Ea(c).then(()=>n.scriptInjectionDeferred?.promise).then(()=>{i(a,s,o)}).catch(d=>{o(d)})}}).catch(a=>{o(a)})})}};Ht.scriptInjectionDeferred=null;async function xt(n,e,t,r=!1,i=!1){let s=new Ht(n),o;if(i)o=Bt;else try{o=await s.verify(t)}catch{o=await s.verify(t,!0)}let a={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){let c=a.phoneEnrollmentInfo.phoneNumber,d=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:d,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){let c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return r?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function qt(n,e,t,r,i){if(i==="EMAIL_PASSWORD_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){let s=await xt(n,e,t,t==="getOobCode");return r(n,s)}else return r(n,e).catch(async s=>{if(s.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);let o=await xt(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(s)});else if(i==="PHONE_PROVIDER")if(n._getRecaptchaConfig()?.isProviderEnabled("PHONE_PROVIDER")){let s=await xt(n,e,t);return r(n,s).catch(async o=>{if(n._getRecaptchaConfig()?.getProviderEnforcementState("PHONE_PROVIDER")==="AUDIT"&&(o.code==="auth/missing-recaptcha-token"||o.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);let a=await xt(n,e,t,!1,!0);return r(n,a)}return Promise.reject(o)})}else{let s=await xt(n,e,t,!1,!0);return r(n,s)}else return Promise.reject(i+" provider is not supported.")}async function ql(n){let e=Ie(n),t=await oa(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),r=new qn(t);e.tenantId==null?e._agentRecaptchaConfig=r:e._tenantRecaptchaConfigs[e.tenantId]=r,r.isAnyProviderEnabled()&&new Ht(e).verify().catch(()=>{})}function Ta(n,e){let t=Lt(n,"auth");if(t.isInitialized()){let i=t.getImmediate(),s=t.getOptions();if(ne(s,e??{}))return i;Z(i,"already-initialized")}return t.initialize({options:e})}function $l(n,e){let t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(_e);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function Ki(n,e,t){let r=Ie(n);T(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");let i=!!t?.disableWarnings,s=ba(e),{host:o,port:a}=Wl(e),c=a===null?"":`:${a}`,d={url:`${s}//${o}${c}/`},_=Object.freeze({host:o,port:a,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){T(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),T(ne(d,r.config.emulator)&&ne(_,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=_,r.settings.appVerificationDisabledForTesting=!0,xe(o)?Nn(`${s}//${o}${c}`):i||Hl()}function ba(n){let e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Wl(n){let e=ba(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};let r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let s=i[1];return{host:s,port:Bo(r.substr(s.length+1))}}else{let[s,o]=r.split(":");return{host:s,port:Bo(o)}}}function Bo(n){if(!n)return null;let e=Number(n);return isNaN(e)?null:e}function Hl(){function n(){let e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}var Fe=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return ce("not implemented")}_getIdTokenResponse(e){return ce("not implemented")}_linkToIdToken(e,t){return ce("not implemented")}_getReauthenticationResolver(e){return ce("not implemented")}};async function zl(n,e){return H(n,"POST","/v1/accounts:signUp",e)}async function Gl(n,e){return $e(n,"POST","/v1/accounts:signInWithPassword",U(n,e))}async function Kl(n,e){return $e(n,"POST","/v1/accounts:signInWithEmailLink",U(n,e))}async function Yl(n,e){return $e(n,"POST","/v1/accounts:signInWithEmailLink",U(n,e))}var zt=class n extends Fe{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new n(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new n(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":let t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qt(e,t,"signInWithPassword",Gl,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Kl(e,{email:this._email,oobCode:this._password});default:Z(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":let r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return qt(e,r,"signUpPassword",zl,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Yl(e,{idToken:t,email:this._email,oobCode:this._password});default:Z(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function ot(n,e){return $e(n,"POST","/v1/accounts:signInWithIdp",U(n,e))}var Jl="http://localhost",je=class n extends Fe{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){let t=new n(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Z("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){let t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;let o=new n(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){let t=this.buildRequest();return ot(e,t)}_linkToIdToken(e,t){let r=this.buildRequest();return r.idToken=t,ot(e,r)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,ot(e,t)}buildRequest(){let e={requestUri:Jl,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=rt(t)}return e}};async function qo(n,e){return H(n,"POST","/v1/accounts:sendVerificationCode",U(n,e))}async function Ql(n,e){return $e(n,"POST","/v1/accounts:signInWithPhoneNumber",U(n,e))}async function Xl(n,e){let t=await $e(n,"POST","/v1/accounts:signInWithPhoneNumber",U(n,e));if(t.temporaryProof)throw Mt(n,"account-exists-with-different-credential",t);return t}var Zl={USER_NOT_FOUND:"user-not-found"};async function eh(n,e){let t={...e,operation:"REAUTH"};return $e(n,"POST","/v1/accounts:signInWithPhoneNumber",U(n,t),Zl)}var Gt=class n extends Fe{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new n({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new n({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Ql(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Xl(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return eh(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:r,verificationCode:i}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:r,code:i}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));let{verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s}=e;return!r&&!t&&!i&&!s?null:new n({verificationId:t,verificationCode:r,phoneNumber:i,temporaryProof:s})}};function th(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function nh(n){let e=it(st(n)).link,t=e?it(st(e)).deep_link_id:null,r=it(st(n)).deep_link_id;return(r?it(st(r)).link:null)||r||t||e||n}var Gn=class n{constructor(e){let t=it(st(e)),r=t.apiKey??null,i=t.oobCode??null,s=th(t.mode??null);T(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){let t=nh(e);try{return new n(t)}catch{return null}}};var at=class n{constructor(){this.providerId=n.PROVIDER_ID}static credential(e,t){return zt._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let r=Gn.parseLink(t);return T(r,"argument-error"),zt._fromEmailAndCode(e,r.code,r.tenantId)}};at.PROVIDER_ID="password";at.EMAIL_PASSWORD_SIGN_IN_METHOD="password";at.EMAIL_LINK_SIGN_IN_METHOD="emailLink";var ct=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}};var Be=class extends ct{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}};var Kt=class n extends Be{constructor(){super("facebook.com")}static credential(e){return je._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Kt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Kt.PROVIDER_ID="facebook.com";var ut=class n extends Be{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return je._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return n.credential(t,r)}catch{return null}}};ut.GOOGLE_SIGN_IN_METHOD="google.com";ut.PROVIDER_ID="google.com";var Yt=class n extends Be{constructor(){super("github.com")}static credential(e){return je._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return n.credential(e.oauthAccessToken)}catch{return null}}};Yt.GITHUB_SIGN_IN_METHOD="github.com";Yt.PROVIDER_ID="github.com";var Jt=class n extends Be{constructor(){super("twitter.com")}static credential(e,t){return je._fromParams({providerId:n.PROVIDER_ID,signInMethod:n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return n.credentialFromTaggedObject(e)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return n.credential(t,r)}catch{return null}}};Jt.TWITTER_SIGN_IN_METHOD="twitter.com";Jt.PROVIDER_ID="twitter.com";var Qt=class n{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){let s=await Ne._fromIdTokenResponse(e,r,i),o=$o(r);return new n({user:s,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);let i=$o(r);return new n({user:e,providerId:i,_tokenResponse:r,operationType:t})}};function $o(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}var xi=class n extends K{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,n.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new n(e,t,r,i)}};function va(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?xi._fromErrorAndOperation(n,s,e,r):s})}async function rh(n,e,t=!1){let r=await $t(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Qt._forOperation(n,"link",r)}async function ih(n,e,t=!1){let{auth:r}=n;if(G(r.app))return Promise.reject(Pe(r));let i="reauthenticate";try{let s=await $t(n,va(r,i,e,n),t);T(s.idToken,r,"internal-error");let o=zi(s.idToken);T(o,r,"internal-error");let{sub:a}=o;return T(n.uid===a,r,"user-mismatch"),Qt._forOperation(n,i,s)}catch(s){throw s?.code==="auth/user-not-found"&&Z(r,"user-mismatch"),s}}async function sh(n,e,t=!1){if(G(n.app))return Promise.reject(Pe(n));let r="signIn",i=await va(n,r,e),s=await Qt._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}function Aa(n,e,t,r){return C(n).onIdTokenChanged(e,t,r)}function Sa(n,e,t){return C(n).beforeAuthStateChanged(e,t)}function Ra(n,e,t,r){return C(n).onAuthStateChanged(e,t,r)}function Na(n){return C(n).signOut()}function Wo(n,e){return H(n,"POST","/v2/accounts/mfaEnrollment:start",U(n,e))}function oh(n,e){return H(n,"POST","/v2/accounts/mfaEnrollment:finalize",U(n,e))}function ah(n,e){return H(n,"POST","/v2/accounts/mfaEnrollment:start",U(n,e))}function ch(n,e){return H(n,"POST","/v2/accounts/mfaEnrollment:finalize",U(n,e))}var Kn="__sak";var Yn=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Kn,"1"),this.storage.removeItem(Kn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}};var uh=1e3,lh=10,Jn=class extends Yn{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=ya(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}let r=e.key;t?this.detachListener():this.stopPolling();let i=()=>{let o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);Ll()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,lh):i()}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},uh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};Jn.type="LOCAL";var Pa=Jn;var hh=1e3;function bi(n){let e=n.replace(/[\\^$.*+?()[\]{}|]/g,"\\$&"),t=RegExp(`${e}=([^;]+)`);return document.cookie.match(t)?.[1]??null}function vi(n){return`${window.location.protocol==="http:"?"__dev_":"__HOST-"}FIREBASE_${n.split(":")[3]}`}var Mi=class{constructor(){this.type="COOKIE",this.listenerUnsubscribes=new Map}_getFinalTarget(e){if(typeof window===void 0)return e;let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set("finalTarget",e),t}async _isAvailable(){return typeof isSecureContext=="boolean"&&!isSecureContext||typeof navigator>"u"||typeof document>"u"?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=vi(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:bi(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let r=vi(e);document.cookie=`${r}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch("/__cookies__",{method:"DELETE"}).catch(()=>{})}_addListener(e,t){if(!this._isAvailable())return;let r=vi(e);if(window.cookieStore){let a=d=>{let _=d.changed.find(w=>w.name===r);_&&t(_.value),d.deleted.find(w=>w.name===r)&&t(null)},c=()=>window.cookieStore.removeEventListener("change",a);return this.listenerUnsubscribes.set(t,c),window.cookieStore.addEventListener("change",a)}let i=bi(r),s=setInterval(()=>{let a=bi(r);a!==i&&(t(a),i=a)},hh),o=()=>clearInterval(s);this.listenerUnsubscribes.set(t,o)}_removeListener(e,t){let r=this.listenerUnsubscribes.get(t);r&&(r(),this.listenerUnsubscribes.delete(t))}};Mi.type="COOKIE";var Qn=class extends Yn{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}};Qn.type="SESSION";var Yi=Qn;function dh(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}var Xn=class n{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){let t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;let r=new n(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:r,eventType:i,data:s}=t.data,o=this.handlersMap[i];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});let a=Array.from(o).map(async d=>d(t.origin,s)),c=await dh(a);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}};Xn.receivers=[];function Ji(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}var Ui=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){let i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((a,c)=>{let d=Ji("",20);i.port1.start();let _=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(I){let w=I;if(w.data.eventId===d)switch(w.data.status){case"ack":clearTimeout(_),s=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),a(w.data.response);break;default:clearTimeout(_),clearTimeout(s),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}};function ue(){return window}function fh(n){ue().location.href=n}function ka(){return typeof ue().WorkerGlobalScope<"u"&&typeof ue().importScripts=="function"}async function ph(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function mh(){return navigator?.serviceWorker?.controller||null}function gh(){return ka()?self:null}var Da="firebaseLocalStorageDb",_h=1,Zn="firebaseLocalStorage",Ca="fbase_key",qe=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}};function hr(n,e){return n.transaction([Zn],e?"readwrite":"readonly").objectStore(Zn)}function yh(){let n=indexedDB.deleteDatabase(Da);return new qe(n).toPromise()}function Oa(){let n=indexedDB.open(Da,_h);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{let r=n.result;try{r.createObjectStore(Zn,{keyPath:Ca})}catch(i){t(i)}}),n.addEventListener("success",async()=>{let r=n.result;r.objectStoreNames.contains(Zn)?e(r):(r.close(),await yh(),e(await Oa()))})})}async function Ho(n,e,t){let r=hr(n,!0).put({[Ca]:e,value:t});return new qe(r).toPromise()}async function Ih(n,e){let t=hr(n,!1).get(e),r=await new qe(t).toPromise();return r===void 0?null:r.value}function zo(n,e){let t=hr(n,!0).delete(e);return new qe(t).toPromise()}var Eh=800,wh=3,er=class{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=Oa(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{let r=await this._openDb();return await e(r)}catch(r){if(t++>wh)throw r;if(this.dbPromise){let i=this.dbPromise;this.dbPromise=null;try{(await i).close()}catch{}}}}async initializeServiceWorkerMessaging(){return ka()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xn._getInstance(gh()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await ph(),!this.activeServiceWorker)return;this.sender=new Ui(this.activeServiceWorker);let e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||mh()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Ho(e,Kn,"1"),await zo(e,Kn)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Ho(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(r=>Ih(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>zo(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{let e=await this._withRetries(i=>{let s=hr(i,!1).getAll();return new qe(s).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];let t=[],r=new Set;if(e.length!==0)for(let{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(let i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}catch(e){return this.isClosing||Vn(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;let r=this.listeners[e];if(r)for(let i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Eh)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e).catch(()=>{})),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}};er.type="LOCAL";var Va=er;function Go(n,e){return H(n,"POST","/v2/accounts/mfaSignIn:start",U(n,e))}function Th(n,e){return H(n,"POST","/v2/accounts/mfaSignIn:finalize",U(n,e))}function bh(n,e){return H(n,"POST","/v2/accounts/mfaSignIn:finalize",U(n,e))}var vf=wa("rcb"),Af=new Ue(3e4,6e4);var Mn="recaptcha";async function vh(n,e,t){if(!n._getRecaptchaConfig())try{await ql(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let r;if(typeof e=="string"?r={phoneNumber:e}:r=e,"session"in r){let i=r.session;if("phoneNumber"in r){T(i.type==="enroll",n,"internal-error");let s={idToken:i.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await qt(n,s,"mfaSmsEnrollment",async(d,_)=>{if(_.phoneEnrollmentInfo.captchaResponse===Bt){T(t?.type===Mn,d,"argument-error");let I=await Ai(d,_,t);return Wo(d,I)}return Wo(d,_)},"PHONE_PROVIDER").catch(d=>Promise.reject(d))).phoneSessionInfo.sessionInfo}else{T(i.type==="signin",n,"internal-error");let s=r.multiFactorHint?.uid||r.multiFactorUid;T(s,n,"missing-multi-factor-info");let o={mfaPendingCredential:i.credential,mfaEnrollmentId:s,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await qt(n,o,"mfaSmsSignIn",async(_,I)=>{if(I.phoneSignInInfo.captchaResponse===Bt){T(t?.type===Mn,_,"argument-error");let w=await Ai(_,I,t);return Go(_,w)}return Go(_,I)},"PHONE_PROVIDER").catch(_=>Promise.reject(_))).phoneResponseInfo.sessionInfo}}else{let i={phoneNumber:r.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await qt(n,i,"sendVerificationCode",async(c,d)=>{if(d.captchaResponse===Bt){T(t?.type===Mn,c,"argument-error");let _=await Ai(c,d,t);return qo(c,_)}return qo(c,d)},"PHONE_PROVIDER").catch(c=>Promise.reject(c))).sessionInfo}}finally{t?._reset()}}async function Ai(n,e,t){T(t.type===Mn,n,"argument-error");let r=await t.verify();T(typeof r=="string",n,"argument-error");let i={...e};if("phoneEnrollmentInfo"in i){let s=i.phoneEnrollmentInfo.phoneNumber,o=i.phoneEnrollmentInfo.captchaResponse,a=i.phoneEnrollmentInfo.clientType,c=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:s,recaptchaToken:r,captchaResponse:o,clientType:a,recaptchaVersion:c}}),i}else if("phoneSignInInfo"in i){let s=i.phoneSignInInfo.captchaResponse,o=i.phoneSignInInfo.clientType,a=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:s,clientType:o,recaptchaVersion:a}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var Xt=class n{constructor(e){this.providerId=n.PROVIDER_ID,this.auth=Ie(e)}verifyPhoneNumber(e,t){return vh(this.auth,e,C(t))}static credential(e,t){return Gt._fromVerification(e,t)}static credentialFromResult(e){let t=e;return n.credentialFromTaggedObject(t)}static credentialFromError(e){return n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:r}=e;return t&&r?Gt._fromTokenResponse(t,r):null}};Xt.PROVIDER_ID="phone";Xt.PHONE_SIGN_IN_METHOD="phone";function Qi(n,e){return e?_e(e):(T(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}var Zt=class extends Fe{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return ot(e,this._buildIdpRequest())}_linkToIdToken(e,t){return ot(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return ot(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Ah(n){return sh(n.auth,new Zt(n),n.bypassAuthState)}function Sh(n){let{auth:e,user:t}=n;return T(t,e,"internal-error"),ih(t,new Zt(n),n.bypassAuthState)}async function Rh(n){let{auth:e,user:t}=n;return T(t,e,"internal-error"),rh(t,new Zt(n),n.bypassAuthState)}var tr=class{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{if(this.eventManager=await this.resolver._initialize(this.auth),!this.pendingPromise||(await this.onExecution(),!this.pendingPromise))return;this.eventManager.registerConsumer(this)}catch(r){this.pendingPromise&&this.reject(r)}})}async onAuthEvent(e){if(!this.pendingPromise)return;let{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:o,type:a}=e;if(o){this.reject(o);return}let c={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Ah;case"linkViaPopup":case"linkViaRedirect":return Rh;case"reauthViaPopup":case"reauthViaRedirect":return Sh;default:Z(this.auth,"internal-error")}}resolve(e){ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}};var Nh=new Ue(2e3,1e4);async function La(n,e,t){if(G(n.app))return Promise.reject(ie(n,"operation-not-supported-in-this-environment"));let r=Ie(n);ra(n,e,ct);let i=Qi(r,t);return new nr(r,"signInViaPopup",e,i).executeNotNull()}var nr=class n extends tr{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,n.currentPopupAction&&n.currentPopupAction.cancel(),n.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return T(e,this.auth,"internal-error"),e}async onExecution(){ye(this.filter.length===1,"Popup operations only handle one event");let e=Ji();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ie(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(ie(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,n.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ie(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Nh.get())};e()}};nr.currentPopupAction=null;var Ph="pendingRedirect",Un=new Map,Fi=class extends tr{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=Un.get(this.auth._key());if(!e){try{let r=await kh(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}Un.set(this.auth._key(),e)}return this.bypassAuthState||Un.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function kh(n,e){let t=Ma(e),r=xa(n);if(!await r._isAvailable())return!1;let i=await r._get(t)==="true";return await r._remove(t),i}async function Dh(n,e){return xa(n)._set(Ma(e),"true")}function Ch(n,e){Un.set(n._key(),e)}function xa(n){return _e(n._redirectPersistence)}function Ma(n){return xn(Ph,n.config.apiKey,n.name)}function Ua(n,e,t){return Oh(n,e,t)}async function Oh(n,e,t){if(G(n.app))return Promise.reject(Pe(n));let r=Ie(n);ra(n,e,ct),await r._initializationPromise;let i=Qi(r,t);return await Dh(i,r),i._openRedirect(r,e,"signInViaRedirect")}async function Fa(n,e){return await Ie(n)._initializationPromise,ja(n,e,!1)}async function ja(n,e,t=!1){if(G(n.app))return Promise.reject(Pe(n));let r=Ie(n),i=Qi(r,e),o=await new Fi(r,i,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}var Vh=10*60*1e3,ji=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Lh(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Ba(e)){let r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(ie(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Vh&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ko(e))}saveEventToCache(e){this.cachedEventUids.add(Ko(e)),this.lastProcessedEventTime=Date.now()}};function Ko(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ba({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Lh(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ba(n);default:return!1}}async function xh(n,e={}){return H(n,"GET","/v1/projects",e)}var Mh=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Uh=/^https?/;async function Fh(n){if(n.config.emulator)return;let{authorizedDomains:e}=await xh(n);for(let t of e)try{if(jh(t))return}catch{}Z(n,"unauthorized-domain")}function jh(n){let e=Ri(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){let o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!Uh.test(t))return!1;if(Mh.test(n))return r===n;let i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}var Bh=new Ue(3e4,6e4);function Yo(){let n=ue().___jsl;if(n?.H){for(let e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function qh(n){return new Promise((e,t)=>{function r(){Yo(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Yo(),t(ie(n,"network-request-failed"))},timeout:Bh.get()})}if(ue().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(ue().gapi?.load)r();else{let i=wa("iframefcb");return ue()[i]=()=>{gapi.load?r():t(ie(n,"network-request-failed"))},Ea(`${jl()}?onload=${i}`).catch(s=>t(s))}}).catch(e=>{throw Fn=null,e})}var Fn=null;function $h(n){return Fn=Fn||qh(n),Fn}var Wh=new Ue(5e3,15e3),Hh="__/auth/iframe",zh="emulator/auth/iframe",Gh={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Kh=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Yh(n){let e=n.config;T(e.authDomain,n,"auth-domain-config-required");let t=e.emulator?Hi(e,zh):`https://${n.config.authDomain}/${Hh}`,r={apiKey:e.apiKey,appName:n.name,v:Se},i=Kh.get(n.config.apiHost);i&&(r.eid=i);let s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${rt(r).slice(1)}`}async function Jh(n){let e=await $h(n),t=ue().gapi;return T(t,n,"internal-error"),e.open({where:document.body,url:Yh(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Gh,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});let o=ie(n,"network-request-failed"),a=ue().setTimeout(()=>{s(o)},Wh.get());function c(){ue().clearTimeout(a),i(r)}r.ping(c).then(c,()=>{s(o)})}))}var Qh={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Xh=500,Zh=600,ed="_blank",td="http://localhost",rr=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function nd(n,e,t,r=Xh,i=Zh){let s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),a="",c={...Qh,width:r.toString(),height:i.toString(),top:s,left:o},d=W().toLowerCase();t&&(a=fa(d)?ed:t),ha(d)&&(e=e||td,c.scrollbars="yes");let _=Object.entries(c).reduce((w,[k,A])=>`${w}${k}=${A},`,"");if(Vl(d)&&a!=="_self")return rd(e||"",a),new rr(null);let I=window.open(e||"",a,_);T(I,n,"popup-blocked");try{I.focus()}catch{}return new rr(I)}function rd(n,e){let t=document.createElement("a");t.href=n,t.target=e;let r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}var id="__/auth/handler",sd="emulator/auth/handler",od=encodeURIComponent("fac");async function Jo(n,e,t,r,i,s){T(n.config.authDomain,n,"auth-domain-config-required"),T(n.config.apiKey,n,"invalid-api-key");let o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Se,eventId:i};if(e instanceof ct){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",yo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(let[_,I]of Object.entries(s||{}))o[_]=I}if(e instanceof Be){let _=e.getScopes().filter(I=>I!=="");_.length>0&&(o.scopes=_.join(","))}n.tenantId&&(o.tid=n.tenantId);let a=o;for(let _ of Object.keys(a))a[_]===void 0&&delete a[_];let c=await n._getAppCheckToken(),d=c?`#${od}=${encodeURIComponent(c)}`:"";return`${ad(n)}?${rt(a).slice(1)}${d}`}function ad({config:n}){return n.emulator?Hi(n,sd):`https://${n.authDomain}/${id}`}var Si="webStorageSupport",Bi=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Yi,this._completeRedirectFn=ja,this._overrideRedirectResult=Ch}async _openPopup(e,t,r,i){ye(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");let s=await Jo(e,t,r,Ri(),i);return nd(e,s,Ji())}async _openRedirect(e,t,r,i){await this._originValidation(e);let s=await Jo(e,t,r,Ri(),i);return fh(s),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(ye(s,"If manager is not set, promise should be"),s)}let r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){let t=await Jh(e),r=new ji(e);return t.register("authEvent",i=>(T(i?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Si,{type:Si},i=>{let s=i?.[0]?.[Si];s!==void 0&&t(!!s),Z(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Fh(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return ya()||da()||Gi()}},qa=Bi,ir=class{constructor(e){this.factorId=e}_process(e,t,r){switch(t.type){case"enroll":return this._finalizeEnroll(e,t.credential,r);case"signin":return this._finalizeSignIn(e,t.credential);default:return ce("unexpected MultiFactorSessionType")}}},qi=class n extends ir{constructor(e){super("phone"),this.credential=e}static _fromCredential(e){return new n(e)}_finalizeEnroll(e,t,r){return oh(e,{idToken:t,displayName:r,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Th(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},sr=class{constructor(){}static assertion(e){return qi._fromCredential(e)}};sr.FACTOR_ID="phone";var or=class{static assertionForEnrollment(e,t){return ar._fromSecret(e,t)}static assertionForSignIn(e,t){return ar._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;T(typeof t.user?.auth<"u","internal-error");let r=await ah(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return cr._fromStartTotpMfaEnrollmentResponse(r,t.user.auth)}};or.FACTOR_ID="totp";var ar=class n extends ir{constructor(e,t,r){super("totp"),this.otp=e,this.enrollmentId=t,this.secret=r}static _fromSecret(e,t){return new n(t,void 0,e)}static _fromEnrollmentId(e,t){return new n(t,e)}async _finalizeEnroll(e,t,r){return T(typeof this.secret<"u",e,"argument-error"),ch(e,{idToken:t,displayName:r,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){T(this.enrollmentId!==void 0&&this.otp!==void 0,e,"argument-error");let r={verificationCode:this.otp};return bh(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:r})}},cr=class n{constructor(e,t,r,i,s,o,a){this.sessionInfo=o,this.auth=a,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=r,this.codeIntervalSeconds=i,this.enrollmentCompletionDeadline=s}static _fromStartTotpMfaEnrollmentResponse(e,t){return new n(e.totpSessionInfo.sharedSecretKey,e.totpSessionInfo.hashingAlgorithm,e.totpSessionInfo.verificationCodeLength,e.totpSessionInfo.periodSec,new Date(e.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),e.totpSessionInfo.sessionInfo,t)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let r=!1;return(On(e)||On(t))&&(r=!0),r&&(On(e)&&(e=this.auth.currentUser?.email||"unknownuser"),On(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function On(n){return typeof n>"u"||n?.length===0}var Qo="@firebase/auth",Xo="1.13.9";var $i=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){T(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function cd(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function ud(n){Ae(new X("auth",(e,{options:t})=>{let r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=r.options;T(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});let c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ia(n)},d=new Oi(r,i,s,c);return $l(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Ae(new X("auth-internal",e=>{let t=Ie(e.getProvider("auth").getImmediate());return(r=>new $i(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),re(Qo,Xo,cd(n)),re(Qo,Xo,"esm2020")}var ld=5*60,hd=ai("authIdTokenMaxAge")||ld,Zo=null,dd=n=>async e=>{let t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>hd)return;let i=t?.token;Zo!==i&&(Zo=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function $a(n=Cn()){let e=Lt(n,"auth");if(e.isInitialized())return e.getImmediate();let t=Ta(n,{popupRedirectResolver:qa,persistence:[Va,Pa,Yi]}),r=ai("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){let s=new URL(r,location.origin);if(location.origin===s.origin){let o=dd(s.toString());Sa(t,o,()=>o(t.currentUser)),Aa(t,a=>o(a))}}let i=si("auth");return i&&Ki(t,`http://${i}`),t}function fd(){return document.getElementsByTagName("head")?.[0]??document}Ul({loadJS(n){return new Promise((e,t)=>{let r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{let s=ie("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",fd().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});ud("Browser");var Wa=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Ha={};var Xi,pd;(function(){var n;function e(f,u){function h(){}h.prototype=u.prototype,f.F=u.prototype,f.prototype=new h,f.prototype.constructor=f,f.D=function(m,p,g){for(var l=Array(arguments.length-2),Le=2;Le<arguments.length;Le++)l[Le-2]=arguments[Le];return u.prototype[p].apply(m,l)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(f,u,h){h||(h=0);let m=Array(16);if(typeof u=="string")for(var p=0;p<16;++p)m[p]=u.charCodeAt(h++)|u.charCodeAt(h++)<<8|u.charCodeAt(h++)<<16|u.charCodeAt(h++)<<24;else for(p=0;p<16;++p)m[p]=u[h++]|u[h++]<<8|u[h++]<<16|u[h++]<<24;u=f.g[0],h=f.g[1],p=f.g[2];let g=f.g[3],l;l=u+(g^h&(p^g))+m[0]+3614090360&4294967295,u=h+(l<<7&4294967295|l>>>25),l=g+(p^u&(h^p))+m[1]+3905402710&4294967295,g=u+(l<<12&4294967295|l>>>20),l=p+(h^g&(u^h))+m[2]+606105819&4294967295,p=g+(l<<17&4294967295|l>>>15),l=h+(u^p&(g^u))+m[3]+3250441966&4294967295,h=p+(l<<22&4294967295|l>>>10),l=u+(g^h&(p^g))+m[4]+4118548399&4294967295,u=h+(l<<7&4294967295|l>>>25),l=g+(p^u&(h^p))+m[5]+1200080426&4294967295,g=u+(l<<12&4294967295|l>>>20),l=p+(h^g&(u^h))+m[6]+2821735955&4294967295,p=g+(l<<17&4294967295|l>>>15),l=h+(u^p&(g^u))+m[7]+4249261313&4294967295,h=p+(l<<22&4294967295|l>>>10),l=u+(g^h&(p^g))+m[8]+1770035416&4294967295,u=h+(l<<7&4294967295|l>>>25),l=g+(p^u&(h^p))+m[9]+2336552879&4294967295,g=u+(l<<12&4294967295|l>>>20),l=p+(h^g&(u^h))+m[10]+4294925233&4294967295,p=g+(l<<17&4294967295|l>>>15),l=h+(u^p&(g^u))+m[11]+2304563134&4294967295,h=p+(l<<22&4294967295|l>>>10),l=u+(g^h&(p^g))+m[12]+1804603682&4294967295,u=h+(l<<7&4294967295|l>>>25),l=g+(p^u&(h^p))+m[13]+4254626195&4294967295,g=u+(l<<12&4294967295|l>>>20),l=p+(h^g&(u^h))+m[14]+2792965006&4294967295,p=g+(l<<17&4294967295|l>>>15),l=h+(u^p&(g^u))+m[15]+1236535329&4294967295,h=p+(l<<22&4294967295|l>>>10),l=u+(p^g&(h^p))+m[1]+4129170786&4294967295,u=h+(l<<5&4294967295|l>>>27),l=g+(h^p&(u^h))+m[6]+3225465664&4294967295,g=u+(l<<9&4294967295|l>>>23),l=p+(u^h&(g^u))+m[11]+643717713&4294967295,p=g+(l<<14&4294967295|l>>>18),l=h+(g^u&(p^g))+m[0]+3921069994&4294967295,h=p+(l<<20&4294967295|l>>>12),l=u+(p^g&(h^p))+m[5]+3593408605&4294967295,u=h+(l<<5&4294967295|l>>>27),l=g+(h^p&(u^h))+m[10]+38016083&4294967295,g=u+(l<<9&4294967295|l>>>23),l=p+(u^h&(g^u))+m[15]+3634488961&4294967295,p=g+(l<<14&4294967295|l>>>18),l=h+(g^u&(p^g))+m[4]+3889429448&4294967295,h=p+(l<<20&4294967295|l>>>12),l=u+(p^g&(h^p))+m[9]+568446438&4294967295,u=h+(l<<5&4294967295|l>>>27),l=g+(h^p&(u^h))+m[14]+3275163606&4294967295,g=u+(l<<9&4294967295|l>>>23),l=p+(u^h&(g^u))+m[3]+4107603335&4294967295,p=g+(l<<14&4294967295|l>>>18),l=h+(g^u&(p^g))+m[8]+1163531501&4294967295,h=p+(l<<20&4294967295|l>>>12),l=u+(p^g&(h^p))+m[13]+2850285829&4294967295,u=h+(l<<5&4294967295|l>>>27),l=g+(h^p&(u^h))+m[2]+4243563512&4294967295,g=u+(l<<9&4294967295|l>>>23),l=p+(u^h&(g^u))+m[7]+1735328473&4294967295,p=g+(l<<14&4294967295|l>>>18),l=h+(g^u&(p^g))+m[12]+2368359562&4294967295,h=p+(l<<20&4294967295|l>>>12),l=u+(h^p^g)+m[5]+4294588738&4294967295,u=h+(l<<4&4294967295|l>>>28),l=g+(u^h^p)+m[8]+2272392833&4294967295,g=u+(l<<11&4294967295|l>>>21),l=p+(g^u^h)+m[11]+1839030562&4294967295,p=g+(l<<16&4294967295|l>>>16),l=h+(p^g^u)+m[14]+4259657740&4294967295,h=p+(l<<23&4294967295|l>>>9),l=u+(h^p^g)+m[1]+2763975236&4294967295,u=h+(l<<4&4294967295|l>>>28),l=g+(u^h^p)+m[4]+1272893353&4294967295,g=u+(l<<11&4294967295|l>>>21),l=p+(g^u^h)+m[7]+4139469664&4294967295,p=g+(l<<16&4294967295|l>>>16),l=h+(p^g^u)+m[10]+3200236656&4294967295,h=p+(l<<23&4294967295|l>>>9),l=u+(h^p^g)+m[13]+681279174&4294967295,u=h+(l<<4&4294967295|l>>>28),l=g+(u^h^p)+m[0]+3936430074&4294967295,g=u+(l<<11&4294967295|l>>>21),l=p+(g^u^h)+m[3]+3572445317&4294967295,p=g+(l<<16&4294967295|l>>>16),l=h+(p^g^u)+m[6]+76029189&4294967295,h=p+(l<<23&4294967295|l>>>9),l=u+(h^p^g)+m[9]+3654602809&4294967295,u=h+(l<<4&4294967295|l>>>28),l=g+(u^h^p)+m[12]+3873151461&4294967295,g=u+(l<<11&4294967295|l>>>21),l=p+(g^u^h)+m[15]+530742520&4294967295,p=g+(l<<16&4294967295|l>>>16),l=h+(p^g^u)+m[2]+3299628645&4294967295,h=p+(l<<23&4294967295|l>>>9),l=u+(p^(h|~g))+m[0]+4096336452&4294967295,u=h+(l<<6&4294967295|l>>>26),l=g+(h^(u|~p))+m[7]+1126891415&4294967295,g=u+(l<<10&4294967295|l>>>22),l=p+(u^(g|~h))+m[14]+2878612391&4294967295,p=g+(l<<15&4294967295|l>>>17),l=h+(g^(p|~u))+m[5]+4237533241&4294967295,h=p+(l<<21&4294967295|l>>>11),l=u+(p^(h|~g))+m[12]+1700485571&4294967295,u=h+(l<<6&4294967295|l>>>26),l=g+(h^(u|~p))+m[3]+2399980690&4294967295,g=u+(l<<10&4294967295|l>>>22),l=p+(u^(g|~h))+m[10]+4293915773&4294967295,p=g+(l<<15&4294967295|l>>>17),l=h+(g^(p|~u))+m[1]+2240044497&4294967295,h=p+(l<<21&4294967295|l>>>11),l=u+(p^(h|~g))+m[8]+1873313359&4294967295,u=h+(l<<6&4294967295|l>>>26),l=g+(h^(u|~p))+m[15]+4264355552&4294967295,g=u+(l<<10&4294967295|l>>>22),l=p+(u^(g|~h))+m[6]+2734768916&4294967295,p=g+(l<<15&4294967295|l>>>17),l=h+(g^(p|~u))+m[13]+1309151649&4294967295,h=p+(l<<21&4294967295|l>>>11),l=u+(p^(h|~g))+m[4]+4149444226&4294967295,u=h+(l<<6&4294967295|l>>>26),l=g+(h^(u|~p))+m[11]+3174756917&4294967295,g=u+(l<<10&4294967295|l>>>22),l=p+(u^(g|~h))+m[2]+718787259&4294967295,p=g+(l<<15&4294967295|l>>>17),l=h+(g^(p|~u))+m[9]+3951481745&4294967295,f.g[0]=f.g[0]+u&4294967295,f.g[1]=f.g[1]+(p+(l<<21&4294967295|l>>>11))&4294967295,f.g[2]=f.g[2]+p&4294967295,f.g[3]=f.g[3]+g&4294967295}r.prototype.v=function(f,u){u===void 0&&(u=f.length);let h=u-this.blockSize,m=this.C,p=this.h,g=0;for(;g<u;){if(p==0)for(;g<=h;)i(this,f,g),g+=this.blockSize;if(typeof f=="string"){for(;g<u;)if(m[p++]=f.charCodeAt(g++),p==this.blockSize){i(this,m),p=0;break}}else for(;g<u;)if(m[p++]=f[g++],p==this.blockSize){i(this,m),p=0;break}}this.h=p,this.o+=u},r.prototype.A=function(){var f=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);f[0]=128;for(var u=1;u<f.length-8;++u)f[u]=0;u=this.o*8;for(var h=f.length-8;h<f.length;++h)f[h]=u&255,u/=256;for(this.v(f),f=Array(16),u=0,h=0;h<4;++h)for(let m=0;m<32;m+=8)f[u++]=this.g[h]>>>m&255;return f};function s(f,u){var h=a;return Object.prototype.hasOwnProperty.call(h,f)?h[f]:h[f]=u(f)}function o(f,u){this.h=u;let h=[],m=!0;for(let p=f.length-1;p>=0;p--){let g=f[p]|0;m&&g==u||(h[p]=g,m=!1)}this.g=h}var a={};function c(f){return-128<=f&&f<128?s(f,function(u){return new o([u|0],u<0?-1:0)}):new o([f|0],f<0?-1:0)}function d(f){if(isNaN(f)||!isFinite(f))return I;if(f<0)return S(d(-f));let u=[],h=1;for(let m=0;f>=h;m++)u[m]=f/h|0,h*=4294967296;return new o(u,0)}function _(f,u){if(f.length==0)throw Error("number format error: empty string");if(u=u||10,u<2||36<u)throw Error("radix out of range: "+u);if(f.charAt(0)=="-")return S(_(f.substring(1),u));if(f.indexOf("-")>=0)throw Error('number format error: interior "-" character');let h=d(Math.pow(u,8)),m=I;for(let g=0;g<f.length;g+=8){var p=Math.min(8,f.length-g);let l=parseInt(f.substring(g,g+p),u);p<8?(p=d(Math.pow(u,p)),m=m.j(p).add(d(l))):(m=m.j(h),m=m.add(d(l)))}return m}var I=c(0),w=c(1),k=c(16777216);n=o.prototype,n.m=function(){if(D(this))return-S(this).m();let f=0,u=1;for(let h=0;h<this.g.length;h++){let m=this.i(h);f+=(m>=0?m:4294967296+m)*u,u*=4294967296}return f},n.toString=function(f){if(f=f||10,f<2||36<f)throw Error("radix out of range: "+f);if(A(this))return"0";if(D(this))return"-"+S(this).toString(f);let u=d(Math.pow(f,6));var h=this;let m="";for(;;){let p=Sn(h,u).g;h=be(h,p.j(u));let g=((h.g.length>0?h.g[0]:h.h)>>>0).toString(f);if(h=p,A(h))return g+m;for(;g.length<6;)g="0"+g;m=g+m}},n.i=function(f){return f<0?0:f<this.g.length?this.g[f]:this.h};function A(f){if(f.h!=0)return!1;for(let u=0;u<f.g.length;u++)if(f.g[u]!=0)return!1;return!0}function D(f){return f.h==-1}n.l=function(f){return f=be(this,f),D(f)?-1:A(f)?0:1};function S(f){let u=f.g.length,h=[];for(let m=0;m<u;m++)h[m]=~f.g[m];return new o(h,~f.h).add(w)}n.abs=function(){return D(this)?S(this):this},n.add=function(f){let u=Math.max(this.g.length,f.g.length),h=[],m=0;for(let p=0;p<=u;p++){let g=m+(this.i(p)&65535)+(f.i(p)&65535),l=(g>>>16)+(this.i(p)>>>16)+(f.i(p)>>>16);m=l>>>16,g&=65535,l&=65535,h[p]=l<<16|g}return new o(h,h[h.length-1]&-2147483648?-1:0)};function be(f,u){return f.add(S(u))}n.j=function(f){if(A(this)||A(f))return I;if(D(this))return D(f)?S(this).j(S(f)):S(S(this).j(f));if(D(f))return S(this.j(S(f)));if(this.l(k)<0&&f.l(k)<0)return d(this.m()*f.m());let u=this.g.length+f.g.length,h=[];for(var m=0;m<2*u;m++)h[m]=0;for(m=0;m<this.g.length;m++)for(let p=0;p<f.g.length;p++){let g=this.i(m)>>>16,l=this.i(m)&65535,Le=f.i(p)>>>16,ro=f.i(p)&65535;h[2*m+2*p]+=l*ro,et(h,2*m+2*p),h[2*m+2*p+1]+=g*ro,et(h,2*m+2*p+1),h[2*m+2*p+1]+=l*Le,et(h,2*m+2*p+1),h[2*m+2*p+2]+=g*Le,et(h,2*m+2*p+2)}for(f=0;f<u;f++)h[f]=h[2*f+1]<<16|h[2*f];for(f=u;f<2*u;f++)h[f]=0;return new o(h,0)};function et(f,u){for(;(f[u]&65535)!=f[u];)f[u+1]+=f[u]>>>16,f[u]&=65535,u++}function Ct(f,u){this.g=f,this.h=u}function Sn(f,u){if(A(u))throw Error("division by zero");if(A(f))return new Ct(I,I);if(D(f))return u=Sn(S(f),u),new Ct(S(u.g),S(u.h));if(D(u))return u=Sn(f,S(u)),new Ct(S(u.g),u.h);if(f.g.length>30){if(D(f)||D(u))throw Error("slowDivide_ only works with positive integers.");for(var h=w,m=u;m.l(f)<=0;)h=no(h),m=no(m);var p=tt(h,1),g=tt(m,1);for(m=tt(m,2),h=tt(h,2);!A(m);){var l=g.add(m);l.l(f)<=0&&(p=p.add(h),g=l),m=tt(m,1),h=tt(h,1)}return u=be(f,p.j(u)),new Ct(p,u)}for(p=I;f.l(u)>=0;){for(h=Math.max(1,Math.floor(f.m()/u.m())),m=Math.ceil(Math.log(h)/Math.LN2),m=m<=48?1:Math.pow(2,m-48),g=d(h),l=g.j(u);D(l)||l.l(f)>0;)h-=m,g=d(h),l=g.j(u);A(g)&&(g=w),p=p.add(g),f=be(f,l)}return new Ct(p,f)}n.B=function(f){return Sn(this,f).h},n.and=function(f){let u=Math.max(this.g.length,f.g.length),h=[];for(let m=0;m<u;m++)h[m]=this.i(m)&f.i(m);return new o(h,this.h&f.h)},n.or=function(f){let u=Math.max(this.g.length,f.g.length),h=[];for(let m=0;m<u;m++)h[m]=this.i(m)|f.i(m);return new o(h,this.h|f.h)},n.xor=function(f){let u=Math.max(this.g.length,f.g.length),h=[];for(let m=0;m<u;m++)h[m]=this.i(m)^f.i(m);return new o(h,this.h^f.h)};function no(f){let u=f.g.length+1,h=[];for(let m=0;m<u;m++)h[m]=f.i(m)<<1|f.i(m-1)>>>31;return new o(h,f.h)}function tt(f,u){let h=u>>5;u%=32;let m=f.g.length-h,p=[];for(let g=0;g<m;g++)p[g]=u>0?f.i(g+h)>>>u|f.i(g+h+1)<<32-u:f.i(g+h);return new o(p,f.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,pd=Ha.Md5=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=d,o.fromString=_,Xi=Ha.Integer=o}).apply(typeof Wa<"u"?Wa:typeof self<"u"?self:typeof window<"u"?window:{});function F(n,e,t,r){if(t==="a"&&!r)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?n!==e||!r:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?r:t==="a"?r.call(n):r?r.value:e.get(n)}var z=class{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}};z.UNAUTHENTICATED=new z(null),z.GOOGLE_CREDENTIALS=new z("google-credentials-uid"),z.FIRST_PARTY=new z("first-party-uid"),z.MOCK_USER=new z("mock-user");var Pt="13.2.0";function fc(n){Pt=n}var pt=new ve("@firebase/firestore");function Ce(n,...e){if(pt.logLevel<=v.DEBUG){let t=e.map(js);pt.debug(`Firestore (${Pt}): ${n}`,...t)}}function In(n,...e){if(pt.logLevel<=v.ERROR){let t=e.map(js);pt.error(`Firestore (${Pt}): ${n}`,...t)}}function pc(n,...e){if(pt.logLevel<=v.WARN){let t=e.map(js);pt.warn(`Firestore (${Pt}): ${n}`,...t)}}function js(n){if(typeof n=="string")return n;try{return function(t){return JSON.stringify(t)}(n)}catch{return n}}function R(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,mc(n,r,t)}function mc(n,e,t){let r=`FIRESTORE (${Pt}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw In(r),new Error(r)}function J(n,e,t,r){let i="Unexpected state";typeof t=="string"?i=t:r=t,n||mc(e,i,r)}function En(n,e){return n}var y={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},E=class extends K{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}};var yr=class{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}},ns=class{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(z.UNAUTHENTICATED))}shutdown(){}},rs=class{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}},Ir=class{constructor(e){this.auth=null,e.onInit(t=>{this.auth=t})}getToken(){return this.auth?this.auth.getToken().then(e=>e?(J(typeof e.accessToken=="string",42297,{Z:e}),new yr(e.accessToken,new z(this.auth.getUid()))):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}},is=class{constructor(e,t,r){this.ee=e,this.te=t,this.re=r,this.type="FirstParty",this.user=z.FIRST_PARTY,this.ne=new Map}ie(){return this.re?this.re():null}get headers(){this.ne.set("X-Goog-AuthUser",this.ee);let e=this.ie();return e&&this.ne.set("Authorization",e),this.te&&this.ne.set("X-Goog-Iam-Authorization-Token",this.te),this.ne}},ss=class{constructor(e,t,r){this.ee=e,this.te=t,this.re=r}getToken(){return Promise.resolve(new is(this.ee,this.te,this.re))}start(e,t){e.enqueueRetryable(()=>t(z.FIRST_PARTY))}shutdown(){}invalidateToken(){}},Er=class{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}},wr=class{constructor(e,t){this.se=t,this.appCheck=null,this.oe=null,G(e)&&e.settings.appCheckToken&&(this.oe=e.settings.appCheckToken),t.onInit(r=>{this.appCheck=r})}getToken(){return this.oe?Promise.resolve(new Er(this.oe)):this.appCheck?this.appCheck.getToken().then(e=>e?(J(typeof e.token=="string",3470,{tokenResult:e}),new Er(e.token)):null):Promise.resolve(null)}invalidateToken(){}start(e,t){}shutdown(){}};var os=class{constructor(e,t,r,i,s,o,a,c,d,_,I,w,k){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=d,this.isUsingEmulator=_,this.apiKey=I,this._customHeaders=w,this.grpcFlowControlWindow=k}},as="(default)",Tr=class n{constructor(e,t){this.projectId=e,this.database=t||as}static empty(){return new n("","")}get isDefaultDatabase(){return this.database===as}isEqual(e){return e instanceof n&&e.projectId===this.projectId&&e.database===this.database}};function gc(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new E(y.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Tr(n.options.projectId,e)}function md(n){let e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}var cs=class{static newId(){let e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516),r="";for(;r.length<20;){let i=md(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<t&&(r+=e.charAt(i[s]%62))}return r}};function O(n,e){return n<e?-1:n>e?1:0}function sn(n,e){let t=Math.min(n.length,e.length);for(let r=0;r<t;r++){let i=n.charAt(r),s=e.charAt(r);if(i!==s)return Zi(i)===Zi(s)?O(i,s):Zi(i)?1:-1}return O(n.length,e.length)}var gd=55296,_d=57343;function Zi(n){let e=n.charCodeAt(0);return e>=gd&&e<=_d}function _c(n,e,t){return n.length===e.length&&n.every((r,i)=>t(r,e[i]))}var za="__name__",br=class n{constructor(e,t,r){t===void 0?t=0:t>e.length&&R(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&R(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return n.comparator(this,e)===0}child(e){let t=this.segments.slice(this.offset,this.limit());return e instanceof n?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){let r=Math.min(e.length,t.length);for(let i=0;i<r;i++){let s=n.compareSegments(e.get(i),t.get(i));if(s!==0)return s}return O(e.length,t.length)}static compareSegments(e,t){let r=n.isNumericId(e),i=n.isNumericId(t);return r&&!i?-1:!r&&i?1:r&&i?n.extractNumericId(e).compare(n.extractNumericId(t)):sn(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Xi.fromString(e.substring(4,e.length-2))}},M=class n extends br{construct(e,t,r){return new n(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){let t=[];for(let r of e){if(r.indexOf("//")>=0)throw new E(y.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(i=>i.length>0))}return new n(t)}static emptyPath(){return new n([])}},yd=/^[_a-zA-Z][_a-zA-Z0-9]*$/,De=class lt extends br{construct(e,t,r){return new lt(e,t,r)}static isValidIdentifier(e){return yd.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===za}static keyField(){return new lt([za])}static fromServerFormat(e){let t=[],r="",i=0,s=()=>{if(r.length===0)throw new E(y.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""},o=!1;for(;i<e.length;){let a=e[i];if(a==="\\"){if(i+1===e.length)throw new E(y.INVALID_ARGUMENT,"Path has trailing escape character: "+e);let c=e[i+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new E(y.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(r+=a,i++):(s(),i++)}if(s(),o)throw new E(y.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new lt(t)}static emptyPath(){return new lt([])}};var $=class n{constructor(e){this.path=e}static fromPath(e){return new n(M.fromString(e))}static fromName(e){return new n(M.fromString(e).popFirst(5))}static empty(){return new n(M.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&M.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return M.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new n(new M(e.slice()))}};function yc(n,e,t){if(!t)throw new E(y.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Ga(n){if(!$.isDocumentKey(n))throw new E(y.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ka(n){if($.isDocumentKey(n))throw new E(y.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Ic(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Yr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{let e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":R(12329,{type:typeof n})}function Te(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new E(y.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{let t=Yr(n);throw new E(y.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function Id(n,e){if(e<=0)throw new E(y.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}function Ec(n){let e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}var dr=null;function Ed(){return dr===null?dr=function(){return 268435456+Math.round(2147483648*Math.random())}():dr++,"0x"+dr.toString(16)}function Bs(n){return n==null}function vr(n){return n===0&&1/n==-1/0}var es="RestConnection",wd={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"},us=class{get ae(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;let t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.ue=t+"://"+e.host,this._e=`projects/${r}/databases/${i}`,this.ce=this.databaseId.database===as?`project_id=${r}`:`project_id=${r}&database_id=${i}`}le(e,t,r,i,s){let o=Ed(),a=this.fe(e,t.toUriEncodedString());Ce(es,`Sending RPC '${e}' ${o}:`,a,r);let c={"google-cloud-resource-prefix":this._e,"x-goog-request-params":this.ce};this.he(c,i,s);let{host:d}=new URL(a),_=xe(d);return this.de(e,a,c,r,_).then(I=>(Ce(es,`Received RPC '${e}' ${o}: `,I),I),I=>{throw pc(es,`RPC '${e}' ${o} failed with error: `,I,"url: ",a,"request:",r),I})}me(e,t,r,i,s,o){return this.le(e,t,r,i,s)}he(e,t,r){if(e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Pt}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i),this.databaseInfo._customHeaders)for(let i of Object.keys(this.databaseInfo._customHeaders))e[i]=this.databaseInfo._customHeaders[i]}fe(e,t){let r=wd[e],i=`${this.ue}/v1/${t}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}};var Ya,b,j,dt,ls,pr,mr,en;function wc(n){switch(n){case y.OK:return R(64938);case y.CANCELLED:case y.UNKNOWN:case y.DEADLINE_EXCEEDED:case y.RESOURCE_EXHAUSTED:case y.INTERNAL:case y.UNAVAILABLE:case y.UNAUTHENTICATED:return!1;case y.INVALID_ARGUMENT:case y.NOT_FOUND:case y.ALREADY_EXISTS:case y.PERMISSION_DENIED:case y.FAILED_PRECONDITION:case y.ABORTED:case y.OUT_OF_RANGE:case y.UNIMPLEMENTED:case y.DATA_LOSS:return!0;default:return R(15467,{code:n})}}function Ja(n){if(n===void 0)return In("RPC_ERROR","HTTP error has no status"),y.UNKNOWN;switch(n){case 200:return y.OK;case 400:return y.FAILED_PRECONDITION;case 401:return y.UNAUTHENTICATED;case 403:return y.PERMISSION_DENIED;case 404:return y.NOT_FOUND;case 409:return y.ABORTED;case 416:return y.OUT_OF_RANGE;case 429:return y.RESOURCE_EXHAUSTED;case 499:return y.CANCELLED;case 500:return y.UNKNOWN;case 501:return y.UNIMPLEMENTED;case 503:return y.UNAVAILABLE;case 504:return y.DEADLINE_EXCEEDED;default:return n>=200&&n<300?y.OK:n>=400&&n<500?y.FAILED_PRECONDITION:n>=500&&n<600?y.INTERNAL:y.UNKNOWN}}(b=Ya||(Ya={}))[b.OK=0]="OK",b[b.CANCELLED=1]="CANCELLED",b[b.UNKNOWN=2]="UNKNOWN",b[b.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",b[b.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",b[b.NOT_FOUND=5]="NOT_FOUND",b[b.ALREADY_EXISTS=6]="ALREADY_EXISTS",b[b.PERMISSION_DENIED=7]="PERMISSION_DENIED",b[b.UNAUTHENTICATED=16]="UNAUTHENTICATED",b[b.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",b[b.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",b[b.ABORTED=10]="ABORTED",b[b.OUT_OF_RANGE=11]="OUT_OF_RANGE",b[b.UNIMPLEMENTED=12]="UNIMPLEMENTED",b[b.INTERNAL=13]="INTERNAL",b[b.UNAVAILABLE=14]="UNAVAILABLE",b[b.DATA_LOSS=15]="DATA_LOSS";var hs=class extends us{Ee(e,t){throw new Error("Not supported by FetchConnection")}async de(e,t,r,i,s){let o=JSON.stringify(i),a;try{let c={method:"POST",headers:r,body:o};s&&(c.credentials="include"),a=await fetch(t,c)}catch(c){let d=c,_=d?.message,I=d?.cause?String(d.cause):void 0,w=(_&&I?`${_} (${I})`:_??I)??d?.statusText??String(c);throw new E(Ja(d?.status),`Request failed with error: ${w}`)}if(!a.ok){let c=await a.json();Array.isArray(c)&&(c=c[0]);let d=c?.error?.message;throw new E(Ja(a.status),`Request failed with error: ${d??a.statusText}`)}return a.json()}};var ds=class extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}};var se=class n{constructor(e){this.binaryString=e}static fromBase64String(e){let t=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new ds("Invalid base64 string: "+s):s}}(e);return new n(t)}static fromUint8Array(e){let t=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new n(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){let r=new Uint8Array(t.length);for(let i=0;i<t.length;i++)r[i]=t.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return O(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}};function on(n){let e=0;for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function wn(n,e){for(let t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}se.EMPTY_BYTE_STRING=new se("");var V=class n{constructor(){this.exponent=0,this.Ve=0n,this.Te=0n,this.Ie=new Array(4).fill(0n),this.Ae=new Array(6).fill(0n),this.Re=new Array(6).fill(0n),this.Pe=new Array(6).fill(0n),this.pe=new Array(12).fill(0n)}static ye(e,t){let r=new n;return r.parse(e,t),r}parse(e,t){t+=e.length-1,this.exponent=0,this.Ve=0n,this.Te=0n;let r=this.Pe,i=this.be(e,r);if(i==0&&this.isEmpty(r)||(t+=i)<n.we)return;if(t>n.ge)return void(this.exponent=Number(n.Fe));let s=this.ve(t,r);this.xe(t,s,r)}be(e,t){for(let s=0;s<6;s++)t[s]=0n;let r=0;for(;r<e.length&&e[r]==0;)r+=1;if(r==e.length)return 0;let i=-r;if(e.length-r>n.De){let s=e[n.De]>=5,o=new Array(n.De).fill(0);for(let a=0;a<n.De;a++)o[a]=e[a+r];s&&(i+=this.Ne(o)),e=o,r=0}for(let s=e.length-1;s>=r;s--)t[0]|=BigInt(e[s])<<32n,this.Se(t);return i}Se(e){let t=e.length;for(let r=0;r<t;r++){let i=e[r]%10n;e[r]=e[r]/10n,r+1<t&&(e[r+1]+=i<<32n)}}isEmpty(e){for(let t=0;t<e.length;t++)if(e[t]!=0n)return!1;return!0}Ne(e){for(let t=e.length-1;t>=0;t--){if(e[t]!=9)return e[t]=e[t]+1,0;e[t]=0}return e[0]=1,1}ve(e,t){let r=t[0]<<31n|t[1]>>1n,i=Number(r)/n.Ce;return Math.floor(Number(e)*n.Be+this.log2(i))}log2(e){return n.Qe*Math.log(e)}xe(e,t,r){let i=this.Ie;this.Oe(-t,i);let s=this.pe;this.Me(r,i,s),this.qe(s),BigInt(i[0])!=BigInt(-e)&&this.qe(s),t+=this.Le(s),(t+=n.Ue)<=0||(t+=this.$e(s),BigInt(t)>=n.Fe?this.exponent=Number(n.Fe):(this.exponent=Number(t),this.Ve=(s[0]<<32n)+s[1]&0xffffffffffffffffn,this.Te=(s[2]<<32n)+s[3]&0xffffffffffffffffn))}Oe(e,t){if(e==0)return void this.ke(n.je[0],t);let r=n.je;e<0&&(e=-e,r=n.Ke);let i=n.ze,s=32,o=!0;for(;e>0;)e>=i&&(o?(this.ke(r[s],t),o=!1):this.We(t,r[s],t),e-=i),s-=1,i*=.5}ke(e,t){for(let r=0;r<t.length;r++)t[r]=e[r]}We(e,t,r){this.Ge(e,t,this.pe);let i=this.Je(this.pe);this.He(this.pe,r),r[0]=e[0]+t[0]+BigInt(i)}Ge(e,t,r){for(let i=0;i<r.length;i++)r[i]=0n;this.Ye(e,this.Ae),this.Ye(t,this.Re);for(let i=5;i>=0;i--)for(let s=5;s>=0;s--){let o=this.Ae[i]*this.Re[s];r[s+i+1]=r[s+i+1]+(o&n.Xe)&0xffffffffffffffffn,r[s+i]=r[s+i]+(o>>32n)&0xffffffffffffffffn}for(let i=11;i>=1;i--)r[i-1]=r[i-1]+(r[i]>>32n)&0xffffffffffffffffn,r[i]&=n.Xe}Je(e){let t=0;for(;this.Ze(e);)this.qe(e),t-=1;return t}Ze(e){if(e[0]<0x19999999n)return!0;if(e[0]>0x19999999n)return!1;for(let t=1;t<e.length;t++){if(e[t]<0x99999999n)return!0;if(e[t]>0x99999999n)return!1}return!1}Me(e,t,r){for(let o=0;o<r.length;o++)r[o]=0n;let i=this.Re;this.Ye(t,i);let s=e.length;for(let o=s-1;o>=0;o--)for(let a=s-1;a>=0;a--){let c=e[o]*i[a];r[a+o+1]=r[a+o+1]+(c&n.Xe)&0xffffffffffffffffn,r[a+o]=r[a+o]+(c>>32n)&0xffffffffffffffffn}for(let o=11;o>=1;o--)r[o-1]=r[o-1]+(r[o]>>32n)&0xffffffffffffffffn,r[o]&=n.Xe}qe(e){let t=e.length-1;e[0]&=n.Xe,e[t]*=10n;for(let r=t-1;r>=0;r--)e[r]=10n*e[r]+(e[r+1]>>32n)&0xffffffffffffffffn,e[r+1]&=n.Xe}Le(e){let t=31-n.et(e[0]);return t!=0&&this.tt(e,t),t}$e(e){return this.rt(e,5,100n),this.rt(e,4,0x80000000n),(e[0]&n.nt<<1n)!=0n?(this.tt(e,1),1):0}He(e,t){t[1]=(e[0]<<32n)+e[1],t[2]=(e[2]<<32n)+e[3],t[3]=(e[4]<<32n)+e[5]}Ye(e,t){t[0]=e[1]>>32n,t[1]=e[1]&n.Xe,t[2]=e[2]>>32n,t[3]=e[2]&n.Xe,t[4]=e[3]>>32n,t[5]=e[3]&n.Xe}tt(e,t){let r=e.length-1,i=BigInt(32-Math.abs(t));if(t>0){let s=BigInt(t);for(let o=r+1-1;o>=1;o--)e[o]=e[o]>>s|e[o-1]<<i&n.Xe;e[0]=e[0]>>s}else if(t<0){let s=BigInt(-t);e[0]=0xffffffffffffffffn&(e[0]<<s|e[1]>>i);for(let o=1;o<r;o++)e[o]=0xffffffffffffffffn&(e[o]<<s&n.Xe|e[o+1]>>i);e[r]=e[r]<<s&n.Xe}}rt(e,t,r){let i=t;e[i]=e[i]+r&0xffffffffffffffffn;for(let s=i+1-1;s>=1&&(e[s]&n.nt)!=0n;s--)e[s]&=n.Xe,e[s-1]+=1n}static et(e){let t=Number(e>>32n);return t==0?32+Math.clz32(Number(BigInt.asUintN(32,e))):Math.clz32(t)}};V.De=59,V.ge=646456993,V.we=-646457032,V.Ce=0xccccccccccccd00,V.it=0x8000000000000000n,V.ze=2147483648,V.Xe=0x00000000ffffffffn,V.nt=0xffffffff00000000n,V.Be=Math.log(10)/Math.log(2),V.Qe=1/Math.log(2),V.Ue=2147483647,V.Fe=0xffffffffn,V.je=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[1n,0x3333333333333333n,0x3333333333333333n,0x3333333333333334n],[1n,0x6666666666666666n,0x6666666666666666n,0x6666666666666667n],[2n,0x28f5c28f5c28f5c2n,0x8f5c28f5c28f5c28n,0xf5c28f5c28f5c290n],[3n,0x4189374bc6a7ef9dn,0xb22d0e5604189374n,0xbc6a7ef9db22d0e6n],[5n,0xa7c5ac471b478423n,0x0fcf80dc33721d53n,0xcddd6e04c0592104n],[10n,0x6df37f675ef6eadfn,0x5ab9a2072d44268dn,0x97df837e6748956en],[20n,0x2f394219248446ban,0xa23d2ec729af3d61n,0x0607aa0167dd94cbn],[39n,0x571cbec554b60dbbn,0xd5f64baf0506840dn,0x451db70d5904029bn],[78n,0x1da48ce468e7c702n,0x6520247d3556476dn,0x1469caf6db224cfan],[155n,0x2252f0e5b39769dcn,0x9ae2eea30ca3ade0n,0xeeaa3c08dfe84e30n],[309n,0x2e055c9a3f6ba793n,0x16583a816eb60a59n,0x22c4b0826cf1ebf7n],[617n,0x52bb45e9cf23f17fn,0x7688c07606e50364n,0xb34479aa9d449a57n],[1234n,0x1abc81c8ff5f846cn,0x8f5e3c9853e38c97n,0x45060097f3bf9296n],[2467n,0x1bec53b510daa7b4n,0x48369ed77dbb0eb1n,0x3b05587b2187b41en],[4933n,0x1e75063a5ba91326n,0x8abfb8e460016ae3n,0x28008702d29e8a3cn],[9865n,0x243c5d8bb5c5fa55n,0x40c6d248c5881915n,0x4c0fd99fd5befc22n],[19729n,0x334a5570c3f4ef3cn,0xa13c36c43f979c90n,0xda7ac473555fb7a8n],[39457n,0x66c304445dd98f3bn,0xa8c293a20e47a41bn,0x4c5b03dc12604964n],[78914n,0x293ffbf5fb028cc4n,0x89d3e5ff44238406n,0x369a339e1bfe8c9bn],[157827n,0x427792fbb68e5d20n,0x7b297cd9fc154b62n,0xf09142114aa9a20cn],[315653n,0xac92bc65ad5c08fcn,0x00beeb115a566c19n,0x4ba882d8a4622437n],[631306n,0x745581440f92e80en,0x4da822cf7f896f41n,0x509d598678164ecdn],[1262612n,0x34dd99b4c69523a5n,0x64bc2e8f0d8b1044n,0xb03b1c96da5dd349n],[2525223n,0x6d2bbea9d6d25a08n,0xa0a4606a88e96b70n,0x182063bbc2fe8520n],[5050446n,0x2e8e47d63bfdd6e3n,0x2b55fa8976eaa3e9n,0x1a6b9d3086412a73n],[10100891n,0x54aa68efa1d719dfn,0xd8505806612c5c8fn,0xad068837fee8b43an],[20201782n,0x1c00464ccb7bae77n,0x9e3877784c77982cn,0xd94af3b61717404fn],[40403563n,0x1ea099c8be2b6cd0n,0x8bfb6d539fa50466n,0x6d3bc37e69a84218n],[80807125n,0x24a457f466ce8d18n,0xf2c8f3b81bc6bb59n,0xa78c757692e02d49n],[161614249n,0x347256677aba6b53n,0x3fbf90d30611a67cn,0x1e039d87e0bdb32bn],[323228497n,0x6b727daf0fd3432an,0x71f71121f9e4200fn,0x8fcd9942d486c10cn],[646456994n,0x2d18e84484d91f78n,0x4079bfe7829dec6fn,0x21551643e365abc6n]],V.Ke=[[1n,0x1999999999999999n,0x9999999999999999n,0x999999999999999an],[0n,0x8000000000000000n,0x0000000000000000n,0x0000000000000000n],[0n,0x4000000000000000n,0x0000000000000000n,0x0000000000000001n],[-1n,0xa000000000000000n,0x0000000000000000n,0x0000000000000000n],[-2n,0x6400000000000000n,0x0000000000000000n,0x0000000000000000n],[-4n,0x2710000000000000n,0x0000000000000000n,0x0000000000000001n],[-9n,0x3b9aca0000000000n,0x0000000000000000n,0x0000000000000001n],[-19n,0x8ac7230489e80000n,0x0000000000000000n,0x0000000000000000n],[-38n,0x4b3b4ca85a86c47an,0x098a224000000000n,0x0000000000000001n],[-77n,0xdd15fe86affad912n,0x49ef0eb713f39eben,0xaa987b6e6fd2a002n],[-154n,0xbeeefb584aff8603n,0xaafb550ffacfd8fan,0x5ca47e4f88d45371n],[-308n,0x8e679c2f5e44ff8fn,0x570f09eaa7ea7648n,0x5961db50c6d2b888n],[-616n,0x4f371b3399fc2ab0n,0x8170041c9feb05aan,0xc7c343447c75bcf6n],[-1233n,0xf51e928179013fd3n,0xde4bd12cde4d985cn,0x4a573ca6f94bff14n],[-2466n,0xeab388127bccaff7n,0x1667639142b9fbaen,0x775ec9995e1039fbn],[-4932n,0xd72cb2a95c7ef6ccn,0xe81bf1e825ba7515n,0xc2feb521d6cb5dcdn],[-9864n,0xb4dc1be6604502dcn,0xd491079b8eef6535n,0x578d3965d24de84dn],[-19728n,0x7fc6447bee60ea43n,0x2548da5c8b125b27n,0x5f42d1142f41d349n],[-39456n,0x3fc65180f88af8fbn,0x6a6915f383349413n,0x063c3708b6ceb291n],[-78913n,0x9ee0197c8dcd55bfn,0x2b2b9b942c38f4a2n,0x0f8ba634e9c706aen],[-157826n,0x629963a25b8b2d79n,0xd00b9d2286f70876n,0xe97004700c3644fcn],[-315652n,0x25f9cc308ceef4f3n,0x40f19543911a4546n,0xa2cd389452cfc366n],[-631305n,0x385597b0d47e76b8n,0x1b9f67e103bf2329n,0xc3119848595985f7n],[-1262611n,0x7bf795d276c12f66n,0x66a61d62a446659an,0xa1a4d73bebf093d5n],[-2525222n,0x3c07d96ab1ed7799n,0xcb7355c22cc05ac0n,0x4ffc0ab73b1f6a49n],[-5050445n,0x8cc4cd8c3edefb9an,0x6c8ff86a90a97e0cn,0x166cfddbf98b71bfn],[-10100890n,0x4d67d81cc88e1228n,0x1d7cfb06666b79b3n,0x7b916728aaa4e70dn],[-20201781n,0xea0c55494e7a552dn,0xb88cb9484bb86c61n,0x8d44893c610bb7dfn],[-40403562n,0xd5fa8c821ec0c24an,0xa80e46e764e0f8b0n,0xa7276bfa432fac7en],[-80807124n,0xb2dae307426f6791n,0xc970b82f58b12918n,0x0472592f7f39190en],[-161614248n,0x7cf51edd8a15f1c9n,0x656dab3498f8e697n,0x12daa2a80e53c807n],[-323228496n,0x3cfe609ab5883c50n,0xbec8b5d22b198871n,0xe18477703b4622b4n],[-646456993n,0x9152447b9d7cda9an,0x3b4d3f6110d77aadn,0xfa81bad1c394adb4n]];var N=class n{constructor(e,t,r,i){this.negative=e,this.st=t,this.Ve=r,this.Te=i}exponent(){return this.st-V.Ue}ot(){return this.st===0&&this.Ve===0n&&this.Te===0n}ut(){return this.st===F(n,j,"f",dt)&&this.Ve===0n&&this.Te===0n}isNaN(){return this.st===F(n,j,"f",dt)&&!(this.Ve===0n&&this.Te===0n)}compareTo(e){if(this.isNaN())return e.isNaN()?0:1;if(e.isNaN())return-1;let t,r;if(this.negative){if(!e.negative)return-1;t=1,r=-1}else{if(e.negative)return 1;t=-1,r=1}return this.st<e.st?t:this.st>e.st?r:this.Ve<e.Ve?t:this.Ve>e.Ve?r:this.Te<e.Te?t:this.Te>e.Te?r:0}debug(){return(this.negative?"+":"-")+F(n,j,"m",ls).call(n,this.Ve)+F(n,j,"m",ls).call(n,this.Te)+"*2^"+this.exponent()}static fromNumber(e){if(isNaN(e))return n.NaN;if(!isFinite(e))return e<0?n._t:n.ct;if(e===0)return Math.sign(1/e)>0?n.lt:n.ft;let t=new DataView(new ArrayBuffer(8));t.setFloat64(0,e);let r=t.getBigUint64(0),i=BigInt.asUintN(64,r<<12n),s=2047&Number(r>>52n);if(s===0){let o=V.et(i);i=o<63?i<<BigInt(o+1):0n,s=-o}return new n(e<0,F(n,j,"m",en).call(n,s-1023),i,0n)}static fromString(e){if(e==="NaN")return n.NaN;if(e==="-Infinity")return n._t;if(e==="Infinity"||e==="+Infinity")return n.ct;let t=new Array(e.length).fill(0),r=0,i=0,s=0,o=!1;for(e[r]==="-"?(o=!0,r++):e[r]==="+"&&r++;F(n,j,"m",pr).call(n,e,r);)t[i++]=F(n,j,"m",mr).call(n,e,r++);if(e[r]==="."){let c=++r;for(;F(n,j,"m",pr).call(n,e,r);)t[i++]=F(n,j,"m",mr).call(n,e,r++);s=c-r}if(e[r]==="e"||e[r]==="E"){let c=0;r++;let d=1;e[r]==="-"?(d=-1,r++):e[r]==="+"&&r++;let _=r;for(;F(n,j,"m",pr).call(n,e,r);)if(c=10*c+F(n,j,"m",mr).call(n,e,r++),r-_>9)throw new Error("Exponent too large "+e);if(r===_)throw new Error("Invalid number "+e);s+=c*d}if(i===0||r!==e.length)throw new Error("Invalid number "+e);let a=V.ye(t.slice(0,i),s);return new n(o,a.exponent,a.Ve,a.Te)}};j=N,ls=function(e){return e.toString(16).padStart(16,"0")},pr=function(e,t){let r=e.codePointAt(t);return r!==void 0&&r>=48&&r<=57},mr=function(e,t){return e.codePointAt(t)-48},en=function(e){return e+V.Ue},dt={value:Number(V.Fe)},N.lt=new N(!1,0,0n,0n),N.ft=new N(!0,0,0n,0n),N.NaN=new N(!1,F(N,j,"f",dt),1n<<63n,0n),N._t=new N(!0,F(N,j,"f",dt),0n,0n),N.ct=new N(!1,F(N,j,"f",dt),0n,0n),new N(!0,F(N,j,"m",en).call(N,63),0n,0n),new N(!1,F(N,j,"m",en).call(N,0),0n,0n),new N(!0,F(N,j,"m",en).call(N,0),0n,0n);var Td=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function He(n){if(J(!!n,39018),typeof n=="string"){let e=0,t=Td.exec(n);if(J(!!t,46558,{timestamp:n}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}let r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:B(n.seconds),nanos:B(n.nanos)}}function B(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ar(n){return typeof n=="string"?se.fromBase64String(n):se.fromUint8Array(n)}function Q(n,e){let t={typeString:n};return e&&(t.value=e),t}function Tn(n,e){if(!Ic(n))throw new E(y.INVALID_ARGUMENT,"JSON must be an object");let t;for(let r in e)if(e[r]){let i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0,o=e[r].optional;if(!(r in n)){if(o)continue;t=`JSON missing required field: '${r}'`;break}let a=n[r];if(i&&typeof a!==i){t=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&a!==s.value){t=`Expected '${r}' field to equal '${s.value}'`;break}}if(t)throw new E(y.INVALID_ARGUMENT,t);return!0}var Qa=-62135596800,Xa=1e6,q=class n{static now(){return n.fromMillis(Date.now())}static fromDate(e){return n.fromMillis(e.getTime())}static fromMillis(e){let t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Xa);return new n(t,r)}static fromInstant(e){if(!e||typeof e.ht!="bigint")throw new E(y.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return n._fromEpochNanoseconds(e.ht)}static _fromEpochNanoseconds(e){let t,r;if(e>=0n)t=Number(e/1000000000n),r=Number(e%1000000000n);else{let i=e%1000000000n;i===0n?(t=Number(e/1000000000n),r=0):(t=Number(e/1000000000n-1n),r=Number(i+1000000000n))}return new n(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new E(y.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new E(y.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Qa)throw new E(y.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new E(y.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Xa}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new E(y.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");let e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?O(this.nanoseconds,e.nanoseconds):O(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:n._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Tn(e,n._jsonSchema))return new n(e.seconds,e.nanoseconds)}valueOf(){let e=this.seconds-Qa;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}};q._jsonSchemaVersion="firestore/timestamp/1.0",q._jsonSchema={type:Q("string",q._jsonSchemaVersion),seconds:Q("number"),nanoseconds:Q("number")};function bd(n){return(n?.mapValue?.fields||{}).__type__?.stringValue==="server_timestamp"}function Tc(n){let e=n.mapValue.fields.__previous_value__;return bd(e)?Tc(e):e}function an(n){let e=He(n.mapValue.fields.__local_write_time__.timestampValue);return new q(e.seconds,e.nanos)}var bc="__type__",vc="__vector__",Sr="value",vd="server_timestamp",Ac="__min__",qs="__max__",ke="__regex__",Rr="pattern",Nr="options",cn="__oid__",bn="__int__",mt="__decimal128__",We="__request_timestamp__",Pr="seconds",kr="increment",Jr="__binary__",fr={},P,ee;(ee=P||(P={})).dt="regexValue",ee.Et="bsonObjectIdValue",ee.Vt="int32Value",ee.Tt="decimal128Value",ee.It="bsonTimestampValue",ee.At="bsonBinaryValue",ee.Rt="minKeyValue",ee.Pt="maxKeyValue",ee.yt="maxValue",ee.bt="vectorValue",ee.wt="serverTimestampValue",ee.gt="regularMapValue";var Za={[vc]:P.bt,[qs]:P.yt,[vd]:P.wt},Sc={[ke]:P.dt,[cn]:P.Et,[bn]:P.Vt,[mt]:P.Tt,[We]:P.It,[Jr]:P.At,[Ac]:P.Rt,[qs]:P.Pt};function ze(n){if("nullValue"in n)return 0;if("booleanValue"in n)return 2;if("integerValue"in n||"doubleValue"in n)return 3;if("timestampValue"in n)return 4;if("stringValue"in n)return 7;if("bytesValue"in n)return 8;if("referenceValue"in n)return 9;if("geoPointValue"in n)return 11;if("arrayValue"in n)return 13;if(!("mapValue"in n))return R(28295,{value:n});switch(function(r){if(!r.mapValue?.fields)return P.gt;let i=r.mapValue.fields,s=i[bc]?.stringValue;if(s&&Za[s])return Za[s];if(on(i)===1){let o=Object.keys(i);return Sc[o[0]]??P.gt}return P.gt}(n)){case P.wt:return 6;case P.yt:return 9007199254740991;case P.bt:return 14;case P.dt:return 12;case P.Et:return 10;case P.Vt:case P.Tt:return 3;case P.It:return 5;case P.At:return 8;case P.Rt:return 1;case P.Pt:return 16;default:return 15}}function Dr(n,e,t){if(n===e)return!0;let r=ze(n);if(r!==ze(e))return!1;switch(r){case 0:case 9007199254740991:case 16:case 1:return!0;case 2:return n.booleanValue===e.booleanValue;case 6:return an(n).isEqual(an(e));case 4:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;let a=He(s.timestampValue),c=He(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 7:return n.stringValue===e.stringValue;case 8:return function(s,o){return kc(s,o)===0}(n,e);case 9:return n.referenceValue===e.referenceValue;case 11:return function(s,o){return B(s.geoPointValue.latitude)===B(o.geoPointValue.latitude)&&B(s.geoPointValue.longitude)===B(o.geoPointValue.longitude)}(n,e);case 3:return function(s,o,a){if(Ge(s)&&Ge(o))return Nc(s,o)===0;if("integerValue"in s&&"integerValue"in o||Or(s)&&Or(o))return ln(s)===ln(o);let c,d;return!("doubleValue"in s)||!("doubleValue"in o)?!1:(c=B(s.doubleValue),d=B(o.doubleValue),c===d?vr(c)===vr(d):!!(a===void 0||a.vt)&&isNaN(c)&&isNaN(d))}(n,e,t);case 13:return _c(n.arrayValue.values||[],e.arrayValue.values||[],(i,s)=>Dr(i,s,t));case 14:case 15:return function(s,o,a){let c=s.mapValue.fields||{},d=o.mapValue.fields||{};if(on(c)!==on(d))return!1;for(let _ in c)if(c.hasOwnProperty(_)&&(d[_]===void 0||!Dr(c[_],d[_],a)))return!1;return!0}(n,e,t);case 5:return Pc(n,e)===0;case 12:return Dc(n,e)===0;case 10:return Cc(n,e)===0;default:return R(52216,{left:n})}}function un(n,e){return(n.values||[]).find(t=>Dr(t,e))!==void 0}function Cr(n,e){if(n===e)return 0;let t=ze(n),r=ze(e);if(t!==r)return O(t,r);switch(t){case 0:case 1:case 16:case 9007199254740991:return 0;case 2:return O(n.booleanValue,e.booleanValue);case 3:return fs(n,e);case 4:return tc(n.timestampValue,e.timestampValue);case 6:return tc(an(n),an(e));case 7:return sn(n.stringValue,e.stringValue);case 8:return kc(n,e);case 9:return function(s,o){let a=s.split("/"),c=o.split("/");for(let d=0;d<a.length&&d<c.length;d++){let _=O(a[d],c[d]);if(_!==0)return _}return O(a.length,c.length)}(n.referenceValue,e.referenceValue);case 11:return function(s,o){let a=O(B(s.latitude),B(o.latitude));return a!==0?a:O(B(s.longitude),B(o.longitude))}(n.geoPointValue,e.geoPointValue);case 13:return nc(n.arrayValue,e.arrayValue);case 14:return function(s,o){let a=s.fields||{},c=o.fields||{},d=a[Sr]?.arrayValue,_=c[Sr]?.arrayValue,I=O(d?.values?.length||0,_?.values?.length||0);return I!==0?I:nc(d,_)}(n.mapValue,e.mapValue);case 15:return function(s,o){if(s===fr&&o===fr)return 0;if(s===fr)return 1;if(o===fr)return-1;let a=s.fields||{},c=Object.keys(a),d=o.fields||{},_=Object.keys(d);c.sort(),_.sort();for(let I=0;I<c.length&&I<_.length;++I){let w=sn(c[I],_[I]);if(w!==0)return w;let k=Cr(a[c[I]],d[_[I]]);if(k!==0)return k}return O(c.length,_.length)}(n.mapValue,e.mapValue);case 5:return Pc(n,e);case 12:return Dc(n,e);case 10:return Cc(n,e);default:throw R(23264,{xt:t})}}function ln(n){let e;return e=Or(n)?n.mapValue.fields[bn].integerValue:n.integerValue||n.doubleValue,B(e)}function Rc(n){return n.mapValue.fields[mt].stringValue}function fs(n,e){if(Ge(n)||Ge(e))return Nc(n,e);let t=ln(n),r=ln(e);return isNaN(t)?isNaN(r)?0:-1:isNaN(r)?1:O(t,r)}function Nc(n,e){let t=ec(n),r=ec(e);return t.ot()&&r.ot()?0:t.isNaN()?r.isNaN()?0:-1:r.isNaN()?1:t.compareTo(r)}function ec(n){return Ge(n)?N.fromString(Rc(n)):N.fromNumber(ln(n))}function tc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return O(n,e);let t=He(n),r=He(e),i=O(t.seconds,r.seconds);return i!==0?i:O(t.nanos,r.nanos)}function nc(n,e){let t=n.values||[],r=e.values||[];for(let i=0;i<t.length&&i<r.length;++i){let s=Cr(t[i],r[i]);if(s!==void 0&&s!==0)return s}return O(t.length,r.length)}function Pc(n,e){let t=n.mapValue.fields?.[We].mapValue?.fields?.[Pr],r=e.mapValue.fields?.[We].mapValue?.fields?.[Pr],i=n.mapValue.fields?.[We].mapValue?.fields?.[kr],s=e.mapValue.fields?.[We].mapValue?.fields?.[kr],o=fs(t,r);return o!==0?o:fs(i,s)}function rc(n){if("bytesValue"in n)return{subtype:0,bytes:Ar(n.bytesValue)};let e=n.mapValue?.fields,t=e?.[Jr],r=t?.bytesValue;if(!r)throw new Error("Received incorrect value for BsonBinaryData");let i=Ar(r).toUint8Array();if(i.length===0)throw new Error("Received empty bytesValue for BsonBinaryData");let s=i[0],o=i.slice(1);return{subtype:s,bytes:se.fromUint8Array(o)}}function kc(n,e){let t=rc(n),r=rc(e);return t.subtype!==r.subtype?t.subtype<r.subtype?-1:1:t.bytes.compareTo(r.bytes)}function Dc(n,e){let t=n.mapValue.fields,r=t?.[ke]?.mapValue?.fields?.[Rr]?.stringValue??"",i=t?.[ke]?.mapValue?.fields?.[Nr]?.stringValue??"",s=e.mapValue.fields,o=s?.[ke]?.mapValue?.fields?.[Rr]?.stringValue??"",a=s?.[ke]?.mapValue?.fields?.[Nr]?.stringValue??"",c=sn(r,o);return c!==0?c:O(i,a)}function Cc(n,e){return sn(n.mapValue.fields?.[cn]?.stringValue??"",e.mapValue.fields?.[cn]?.stringValue??"")}function ic(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ge(n){if(!n.mapValue?.fields)return!1;let e=n.mapValue.fields;return on(e)===1&&e[mt]&&!!e[mt].stringValue}function Or(n){if(!n.mapValue?.fields)return!1;let e=n.mapValue.fields;return on(e)===1&&e[bn]?.integerValue!==void 0}function Oc(n){return!!n&&"arrayValue"in n}function sc(n){return!!n&&"nullValue"in n}function oc(n){return!(!function(t){return!!t&&"doubleValue"in t}(n)||!isNaN(Number(n.doubleValue)))||!(!Ge(n)||Rc(n)!=="NaN")}function ts(n){return!!n&&"mapValue"in n}function tn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){let e={mapValue:{fields:{}}};return wn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=tn(r)),e}if(n.arrayValue){let e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=tn(n.arrayValue.values[t]);return e}return{...n}}new Set(Object.values(Sc));var Vr=class{constructor(e,t){this.position=e,this.inclusive=t}};var Lr=class{},oe=class n extends Lr{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new ps(e,t,r):t==="array-contains"?new _s(e,r):t==="in"?new ys(e,r):t==="not-in"?new Is(e,r):t==="array-contains-any"?new Es(e,r):new n(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new ms(e,r):new gs(e,r)}matches(e){let t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Cr(t,this.value)):t!==null&&ze(this.value)===ze(t)&&this.matchesComparison(Cr(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return R(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}},hn=class n extends Lr{constructor(e,t){super(),this.filters=e,this.op=t,this.Dt=null}static create(e,t){return new n(e,t)}matches(e){return function(r){return r.op==="and"}(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Dt!==null||(this.Dt=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Dt}getFilters(){return Object.assign([],this.filters)}};var ps=class extends oe{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){let t=$.comparator(e.key,this.key);return this.matchesComparison(t)}},ms=class extends oe{constructor(e,t){super(e,"in",t),this.keys=Vc("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}},gs=class extends oe{constructor(e,t){super(e,"not-in",t),this.keys=Vc("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}};function Vc(n,e){return(e.arrayValue?.values||[]).map(t=>$.fromName(t.referenceValue))}var _s=class extends oe{constructor(e,t){super(e,"array-contains",t)}matches(e){let t=e.data.field(this.field);return Oc(t)&&un(t.arrayValue,this.value)}},ys=class extends oe{constructor(e,t){super(e,"in",t)}matches(e){let t=e.data.field(this.field);return t!==null&&un(this.value.arrayValue,t)}},Is=class extends oe{constructor(e,t){super(e,"not-in",t)}matches(e){if(un(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;let t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!un(this.value.arrayValue,t)}},Es=class extends oe{constructor(e,t){super(e,"array-contains-any",t)}matches(e){let t=e.data.field(this.field);return!(!Oc(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>un(this.value.arrayValue,r))}};var gt=class{constructor(e,t="asc"){this.field=e,this.dir=t}};var x=class n{static fromTimestamp(e){return new n(e)}static min(){return new n(new q(0,0))}static max(){return new n(new q(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}};var ws=class n{constructor(e,t){this.comparator=e,this.root=t||le.EMPTY}insert(e,t){return new n(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,le.BLACK,null,null))}remove(e){return new n(this.comparator,this.root.remove(e,this.comparator).copy(null,null,le.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){let r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){let i=this.comparator(e,r.key);if(i===0)return t+r.left.size;i<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){let e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new ft(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new ft(this.root,e,this.comparator,!1)}getReverseIterator(){return new ft(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new ft(this.root,e,this.comparator,!0)}},ft=class{constructor(e,t,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=t?r(e.key,t):1,t&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop(),t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;let e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},le=class n{constructor(e,t,r,i,s){this.key=e,this.value=t,this.color=r??n.RED,this.left=i??n.EMPTY,this.right=s??n.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,i,s){return new n(e??this.key,t??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let i=this,s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,t,r),null):s===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return n.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return n.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){let e=this.copy(null,null,n.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){let e=this.copy(null,null,n.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){let e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){let e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw R(43730,{key:this.key,value:this.value});if(this.right.isRed())throw R(14113,{key:this.key,value:this.value});let e=this.left.check();if(e!==this.right.check())throw R(27949);return e+(this.isRed()?0:1)}};le.EMPTY=null,le.RED=!0,le.BLACK=!1;le.EMPTY=new class{constructor(){this.size=0}get key(){throw R(57766)}get value(){throw R(16141)}get color(){throw R(16727)}get left(){throw R(29726)}get right(){throw R(36894)}copy(e,t,r,i,s){return this}insert(e,t,r){return new le(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};var xr=class n{constructor(e){this.comparator=e,this.data=new ws(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){let r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){let i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){let t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Mr(this.data.getIterator())}getIteratorFrom(e){return new Mr(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof n)||this.size!==e.size)return!1;let t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){let i=t.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){let e=[];return this.forEach(t=>{e.push(t)}),e}toString(){let e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){let t=new n(this.comparator);return t.data=e,t}},Mr=class{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}};var _t=class n{constructor(e){this.fields=e,e.sort(De.comparator)}static empty(){return new n([])}unionWith(e){let t=new xr(De.comparator);for(let r of this.fields)t=t.add(r);for(let r of e)t=t.add(r);return new n(t.toArray())}covers(e){for(let t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return _c(this.fields,e.fields,(t,r)=>t.isEqual(r))}};var Y=class n{constructor(e){this.value=e}static empty(){return new n({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!ts(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=tn(t)}setAll(e){let t=De.emptyPath(),r={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){let c=this.getFieldsMap(t);this.applyChanges(c,r,i),r={},i=[],t=a.popLast()}o?r[a.lastSegment()]=tn(o):i.push(a.lastSegment())});let s=this.getFieldsMap(t);this.applyChanges(s,r,i)}delete(e){let t=this.field(e.popLast());ts(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Dr(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=t.mapValue.fields[e.get(r)];ts(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,r){wn(t,(i,s)=>e[i]=s);for(let i of r)delete e[i]}clone(){return new n(tn(this.value))}};var dn=class n{constructor(e,t,r,i,s,o,a){this.key=e,this.documentType=t,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=a}static newInvalidDocument(e){return new n(e,0,x.min(),x.min(),x.min(),Y.empty(),0)}static newFoundDocument(e,t,r,i){return new n(e,1,t,x.min(),r,i,0)}static newNoDocument(e,t){return new n(e,2,t,x.min(),x.min(),Y.empty(),0)}static newUnknownDocument(e,t){return new n(e,3,t,x.min(),x.min(),Y.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(x.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Y.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Y.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=x.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof n&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new n(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}};var Ts=class{constructor(e,t=null,r=[],i=[],s=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=a,this.Nt=null}};function ac(n,e=null,t=[],r=[],i=null,s=null,o=null){return new Ts(n,e,t,r,i,s,o)}var yt=class{constructor(e,t=null,r=[],i=[],s=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=a,this.endAt=c,this.St=null,this.Ct=null,this.Bt=null,this.startAt,this.endAt}};function Ad(n){return n.collectionGroup!==null}function Sd(n){let e=En(n);if(e.St===null){e.St=[];let t=new Set;for(let s of e.explicitOrderBy)e.St.push(s),t.add(s.field.canonicalString());let r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new xr(De.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(d=>{d.isInequality()&&(a=a.add(d.field))})}),a})(e).forEach(s=>{t.has(s.canonicalString())||s.isKeyField()||e.St.push(new gt(s,r))}),t.has(De.keyField().canonicalString())||e.St.push(new gt(De.keyField(),r))}return e.St}function Rd(n){let e=En(n);return e.Ct||(e.Ct=Nd(e,Sd(n))),e.Ct}function Nd(n,e){if(n.limitType==="F")return ac(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{let s=i.dir==="desc"?"asc":"desc";return new gt(i.field,s)});let t=n.endAt?new Vr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Vr(n.startAt.position,n.startAt.inclusive):null;return ac(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function bs(n,e){let t=n.filters.concat([e]);return new yt(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Lc(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:vr(e)?"-0":e}}function gr(n){return{integerValue:""+n}}function Pd(n,e,t){return function(i){return typeof i=="number"&&Number.isInteger(i)&&!vr(i)&&i<=Number.MAX_SAFE_INTEGER&&i>=Number.MIN_SAFE_INTEGER}(e)?gr(e):Lc(n,e)}var It=class{constructor(){this._=void 0}},Ur=class extends It{},vs=class extends It{constructor(e){super(),this.elements=e}},As=class extends It{constructor(e){super(),this.elements=e}},fn=class extends It{constructor(e,t){super(),this.serializer=e,this.Qt=t}},Ss=class extends fn{},Rs=class extends fn{},Ns=class extends fn{};var Ps=class{constructor(e,t){this.field=e,this.transform=t}},te=class n{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new n}static exists(e){return new n(void 0,e)}static updateTime(e){return new n(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}},Et=class{},Fr=class extends Et{constructor(e,t,r,i=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}},pn=class extends Et{constructor(e,t,r,i,s=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}},wt=class extends Et{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}},mn=class extends Et{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}};var kd={asc:"ASCENDING",desc:"DESCENDING"},Dd={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Cd={and:"AND",or:"OR"},ks=class{constructor(e,t){this.databaseId=e,this.useProto3Json=t}};function _r(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function cc(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Od(n,e){return _r(n,e.toTimestamp())}function nn(n){return J(!!n,49232),x.fromTimestamp(function(t){let r=He(t);return new q(r.seconds,r.nanos)}(n))}function $s(n,e){return Ds(n,e).canonicalString()}function Ds(n,e){let t=function(i){return new M(["projects",i.projectId,"databases",i.database])}(n).child("documents");return e===void 0?t:t.child(e)}function jr(n,e){return $s(n.databaseId,e.path)}function Cs(n,e){let t=function(i){let s=M.fromString(i);return J(Mc(s),10190,{key:s.toString()}),s}(e);if(t.get(1)!==n.databaseId.projectId)throw new E(y.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new E(y.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(function(i){return J(i.length>4&&i.get(4)==="documents",29091,{key:i.toString()}),i.popFirst(5)}(t))}function uc(n,e,t){return{name:jr(n,e),fields:t.value.mapValue.fields}}function Vd(n,e){return"found"in e?function(r,i){J(!!i.found,43571),i.found.name,i.found.updateTime;let s=Cs(r,i.found.name),o=nn(i.found.updateTime),a=i.found.createTime?nn(i.found.createTime):x.min(),c=new Y({mapValue:{fields:i.found.fields}});return dn.newFoundDocument(s,o,a,c)}(n,e):"missing"in e?function(r,i){J(!!i.missing,3894),J(!!i.readTime,22933);let s=Cs(r,i.missing),o=nn(i.readTime);return dn.newNoDocument(s,o)}(n,e):R(7234,{result:e})}function Ld(n,e){let t;if(e instanceof Fr)t={update:uc(n,e.key,e.value)};else if(e instanceof wt)t={delete:jr(n,e.key)};else if(e instanceof pn)t={update:uc(n,e.key,e.data),updateMask:jd(e.fieldMask)};else{if(!(e instanceof mn))return R(16599,{Ot:e.type});t={verify:jr(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(s,o){let a=o.transform;if(a instanceof Ur)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof vs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof As)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Ss)return{fieldPath:o.field.canonicalString(),increment:a.Qt};if(a instanceof Rs)return{fieldPath:o.field.canonicalString(),minimum:a.Qt};if(a instanceof Ns)return{fieldPath:o.field.canonicalString(),maximum:a.Qt};throw R(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:Od(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:R(27497)}(n,e.precondition)),t}function xd(n,e){let t={structuredQuery:{}},r=e.path,i;e.collectionGroup!==null?(i=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=function(d,_){return $s(d.databaseId,_)}(n,i);let s=function(d){if(d.length!==0)return xc(hn.create(d,"and"))}(e.filters);s&&(t.structuredQuery.where=s);let o=function(d){if(d.length!==0)return d.map(_=>function(w){return{field:ht(w.field),direction:Md(w.dir)}}(_))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);let a=function(d,_){return d.useProto3Json||Bs(_)?_:{value:_}}(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{Mt:t,parent:i}}function Md(n){return kd[n]}function Ud(n){return Dd[n]}function Fd(n){return Cd[n]}function ht(n){return{fieldPath:n.canonicalString()}}function xc(n){return n instanceof oe?function(t){if(t.op==="=="){if(oc(t.value))return{unaryFilter:{field:ht(t.field),op:"IS_NAN"}};if(sc(t.value))return{unaryFilter:{field:ht(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(oc(t.value))return{unaryFilter:{field:ht(t.field),op:"IS_NOT_NAN"}};if(sc(t.value))return{unaryFilter:{field:ht(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:ht(t.field),op:Ud(t.op),value:t.value}}}(n):n instanceof hn?function(t){let r=t.getFilters().map(i=>xc(i));return r.length===1?r[0]:{compositeFilter:{op:Fd(t.op),filters:r}}}(n):R(54877,{filter:n})}function jd(n){let e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Mc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Uc(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Ws(n){return new ks(n,!0)}var Os=class{},Vs=class extends Os{constructor(e,t,r,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=i,this.qt=!1}Lt(){if(this.qt)throw new E(y.FAILED_PRECONDITION,"The client has already been terminated.")}le(e,t,r,i){return this.Lt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.le(e,Ds(t,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===y.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new E(y.UNKNOWN,s.toString())})}me(e,t,r,i,s){return this.Lt(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.me(e,Ds(t,r),i,o,a,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===y.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new E(y.UNKNOWN,o.toString())})}terminate(){this.qt=!0,this.connection.terminate()}};async function kt(n,e){let t=En(n),r={writes:e.map(i=>Ld(t.serializer,i))};await t.le("Commit",t.serializer.databaseId,M.emptyPath(),r)}async function Hs(n,e){let t=En(n),r={documents:e.map(a=>jr(t.serializer,a))},i=await t.me("BatchGetDocuments",t.serializer.databaseId,M.emptyPath(),r,e.length),s=new Map;i.forEach(a=>{let c=Vd(t.serializer,a);s.set(c.key.toString(),c)});let o=[];return e.forEach(a=>{let c=s.get(a.toString());J(!!c,55234,{key:a}),o.push(c)}),o}async function Bd(n,e){let t=En(n),{Mt:r,parent:i}=xd(t.serializer,Rd(e));return(await t.me("RunQuery",t.serializer.databaseId,i,{structuredQuery:r.structuredQuery})).filter(s=>!!s.document).map(s=>function(a,c,d){let _=Cs(a,c.name),I=nn(c.updateTime),w=c.createTime?nn(c.createTime):x.min(),k=new Y({mapValue:{fields:c.fields}}),A=dn.newFoundDocument(_,I,w,k);return d?A.setHasCommittedMutations():A}(t.serializer,s.document,void 0))}var Fc="ComponentProvider",rn=new Map;function Ve(n){if(n._terminated)throw new E(y.FAILED_PRECONDITION,"The client has already been terminated.");if(!rn.has(n)){Ce(Fc,"Initializing Datastore");let e=function(s){return new hs(s)}(function(s,o,a,c,d){return new os(s,o,a,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,Ec(d.experimentalLongPollingOptions),d.useFetchStreams,d.isUsingEmulator,c,d._customHeaders,d.grpcFlowControlWindow)}(n._databaseId,n.app.options.appId||"",n._persistenceKey,n.app.options.apiKey,n._freezeSettings())),t=Ws(n._databaseId),r=function(s,o,a,c){return new Vs(s,o,a,c)}(n._authCredentials,n._appCheckCredentials,e,t);rn.set(n,r)}return rn.get(n)}var qd=1048576,jc="firestore.googleapis.com",lc=!0,Br=class{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new E(y.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=jc,this.ssl=lc}else this.host=e.host,this.ssl=e.ssl??lc;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qd)throw new E(y.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(function(r,i,s,o){if(i===!0&&o===!0)throw new E(y.INVALID_ARGUMENT,`${r} and ${s} cannot be used together.`)}("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Ec(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new E(y.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new E(y.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new E(y.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new E(y.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&function(r,i){if(r===i)return!0;if(!r||!i)return!1;let s=Object.keys(r),o=Object.keys(i);if(s.length!==o.length)return!1;for(let a of s)if(r[a]!==i[a])return!1;return!0}(this._customHeaders,e._customHeaders)}},Oe=class{constructor(e,t,r,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Br({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new E(y.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new E(y.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Br(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ns;switch(r.type){case"firstParty":return new ss(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new E(y.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){let r=rn.get(t);r&&(Ce(Fc,"Removing Datastore"),rn.delete(t),r.terminate())}(this),Promise.resolve()}};function Bc(n,e){let t=typeof n=="object"?n:Cn(),r=typeof n=="string"?n:e||"(default)",i=Lt(t,"firestore/lite").getImmediate({identifier:r});if(!i._initialized){let s=co("firestore");s&&zs(i,...s)}return i}function zs(n,e,t,r={}){n=Te(n,Oe);let i=xe(e),s=n._getSettings(),o={...s,emulatorOptions:n._getEmulatorOptions()},a=`${e}:${t}`;i&&Nn(`https://${a}`),s.host!==jc&&s.host!==a&&pc("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");let c={...s,host:a,ssl:i,emulatorOptions:r};if(!ne(c,o)&&(n._setSettings(c),r.mockUserToken)){let d,_;if(typeof r.mockUserToken=="string")d=r.mockUserToken,_=z.MOCK_USER;else{d=uo(r.mockUserToken,n._app?.options.projectId);let I=r.mockUserToken.sub||r.mockUserToken.user_id;if(!I)throw new E(y.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");_=new z(I)}n._authCredentials=new rs(new yr(d,_))}}var we=class n{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new n(this.firestore,e,this._query)}},L=class n{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new he(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new n(this.firestore,e,this._key)}toJSON(){return{type:n._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(Tn(t,n._jsonSchema))return new n(e,r||null,new $(M.fromString(t.referencePath)))}};L._jsonSchemaVersion="firestore/documentReference/1.0",L._jsonSchema={type:Q("string",L._jsonSchemaVersion),referencePath:Q("string")};var he=class n extends we{constructor(e,t,r){super(e,t,function(s){return new yt(s)}(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){let e=this._path.popLast();return e.isEmpty()?null:new L(this.firestore,null,new $(e))}withConverter(e){return new n(this.firestore,e,this._path)}};function qc(n,e,...t){if(n=C(n),yc("collection","path",e),n instanceof Oe){let r=M.fromString(e,...t);return Ka(r),new he(n,null,r)}{if(!(n instanceof L||n instanceof he))throw new E(y.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(M.fromString(e,...t));return Ka(r),new he(n.firestore,null,r)}}function Gs(n,e,...t){if(n=C(n),arguments.length===1&&(e=cs.newId()),yc("doc","path",e),n instanceof Oe){let r=M.fromString(e,...t);return Ga(r),new L(n,null,new $(r))}{if(!(n instanceof L||n instanceof he))throw new E(y.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");let r=n._path.child(M.fromString(e,...t));return Ga(r),new L(n.firestore,n instanceof he?n.converter:null,new $(r))}}var de=class n{constructor(e,t=0){if(this.subtype=t,!Number.isInteger(t)||t<0||t>255)throw new E(y.INVALID_ARGUMENT,"The subtype for Bytes must be a value in the inclusive [0, 255] range.");this._byteString=e}static fromBase64String(e,t=0){try{return new n(se.fromBase64String(e),t)}catch(r){throw new E(y.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+r)}}static fromUint8Array(e,t=0){return new n(se.fromUint8Array(e),t)}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}get data(){return this.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+", subtype: "+this.subtype+")"}isEqual(e){return this.subtype===e.subtype&&this._byteString.isEqual(e._byteString)}toJSON(){let e={type:n._jsonSchemaVersion,bytes:this.toBase64()};return this.subtype!==0&&(e.subtype=this.subtype),e}static fromJSON(e){if(Tn(e,n._jsonSchema)){let t=e.subtype??0;return n.fromBase64String(e.bytes,t)}}};de._jsonSchemaVersion="firestore/bytes/1.0",de._jsonSchema={type:Q("string",de._jsonSchemaVersion),bytes:Q("string"),subtype:{...Q("number"),optional:!0}};var Ke=class{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new E(y.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new De(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}};var Tt=class{constructor(e){this.value=e}isEqual(e){return this.value===e.value}};var bt=class{constructor(e,t){if(this.seconds=e,this.increment=t,!Number.isInteger(e)||e<0||e>4294967295)throw new Error("BsonTimestamp 'seconds' must be in the range of a 32-bit unsigned integer (0-4294967295).");if(!Number.isInteger(t)||t<0||t>4294967295)throw new Error("BsonTimestamp 'increment' must be in the range of a 32-bit unsigned integer (0-4294967295).")}isEqual(e){return this.seconds===e.seconds&&this.increment===e.increment}};var vt=class{constructor(e){this.stringValue=e,this.value=N.fromString(e)}isEqual(e){return!(!this.value.ot()||!e.value.ot())||this.value.compareTo(e.value)===0}toJSON(){return{$t:{stringValue:this.stringValue}}}};var Ye=class{constructor(e){this._methodName=e}};var Ee=class n{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new E(y.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new E(y.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return O(this._lat,e._lat)||O(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:n._jsonSchemaVersion}}static fromJSON(e){if(Tn(e,n._jsonSchema))return new n(e.latitude,e.longitude)}};Ee._jsonSchemaVersion="firestore/geoPoint/1.0",Ee._jsonSchema={type:Q("string",Ee._jsonSchemaVersion),latitude:Q("number"),longitude:Q("number")};var At=class{constructor(e){this.value=e}isEqual(e){return this.value===e.value}};var Je=class n{constructor(){this.type="MaxKey"}static instance(){return n.MAX_KEY_VALUE_INSTANCE||(n.MAX_KEY_VALUE_INSTANCE=new n),n.MAX_KEY_VALUE_INSTANCE}};Je.MAX_KEY_VALUE_INSTANCE=null;var Qe=class n{constructor(){this.type="MinKey"}static instance(){return n.MIN_KEY_VALUE_INSTANCE||(n.MIN_KEY_VALUE_INSTANCE=new n),n.MIN_KEY_VALUE_INSTANCE}};Qe.MIN_KEY_VALUE_INSTANCE=null;var St=class{constructor(e,t){this.pattern=e,this.options=t}isEqual(e){return this.pattern===e.pattern&&this.options===e.options}};var fe=class n{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:n._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Tn(e,n._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new n(e.vectorValues);throw new E(y.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}};fe._jsonSchemaVersion="firestore/vectorValue/1.0",fe._jsonSchema={type:Q("string",fe._jsonSchemaVersion),vectorValues:Q("object")};var $d=/^__.*__$/,Ls=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new pn(e,this.data,this.fieldMask,t,this.fieldTransforms):new Fr(e,this.data,t,this.fieldTransforms)}},qr=class{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new pn(e,this.data,this.fieldMask,t,this.fieldTransforms)}};function $c(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw R(40011,{dataSource:n})}}var xs=class n{constructor(e,t,r,i,s,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new n({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePathSegment(e),r}childContextForFieldPath(e){let t=this.path?.child(e),r=this.contextWith({path:t,arrayElement:!1});return r.validatePath(),r}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Wr(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if($c(this.dataSource)&&$d.test(e))throw this.createError('Document fields cannot begin and end with "__"')}},Ms=class{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Ws(e)}createContext(e,t,r,i=!1){return new xs({dataSource:e,methodName:t,targetDoc:r,path:De.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}};function Dt(n){let e=n._freezeSettings(),t=Ws(n._databaseId);return new Ms(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Qr(n,e,t,r,i,s={}){let o=n.createContext(s.merge||s.mergeFields?2:0,e,t,i);Js("Data must be an object, but it was:",o,r);let a=Wc(r,o),c,d;if(s.merge)c=new _t(o.fieldMask),d=o.fieldTransforms;else if(s.mergeFields){let _=[];for(let I of s.mergeFields){let w=Xe(e,I,t);if(!o.contains(w))throw new E(y.INVALID_ARGUMENT,`Field '${w}' is specified in your field mask but missing from your input data.`);Kc(_,w)||_.push(w)}c=new _t(_),d=o.fieldTransforms.filter(I=>c.covers(I.field))}else c=null,d=o.fieldTransforms;return new Ls(new Y(a),c,d)}var $r=class n extends Ye{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof n}};var Us=class n extends Ye{_toFieldTransform(e){return new Ps(e.path,new Ur)}isEqual(e){return e instanceof n}};function Ks(n,e,t,r){let i=n.createContext(1,e,t);Js("Data must be an object, but it was:",i,r);let s=[],o=Y.empty();wn(r,(c,d)=>{let _=Gc(e,c,t);d=C(d);let I=i.childContextForFieldPath(_);if(d instanceof $r)s.push(_);else{let w=vn(d,I);w!=null&&(s.push(_),o.set(_,w))}});let a=new _t(s);return new qr(o,a,i.fieldTransforms)}function Ys(n,e,t,r,i,s){let o=n.createContext(1,e,t),a=[Xe(e,r,t)],c=[i];if(s.length%2!=0)throw new E(y.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let w=0;w<s.length;w+=2)a.push(Xe(e,s[w])),c.push(s[w+1]);let d=[],_=Y.empty();for(let w=a.length-1;w>=0;--w)if(!Kc(d,a[w])){let k=a[w],A=c[w];A=C(A);let D=o.childContextForFieldPath(k);if(A instanceof $r)d.push(k);else{let S=vn(A,D);S!=null&&(d.push(k),_.set(k,S))}}let I=new _t(d);return new qr(_,I,o.fieldTransforms)}function Wd(n,e,t,r=!1){return vn(t,n.createContext(r?4:3,e))}function vn(n,e,t){if(zc(n=C(n)))return Js("Unsupported field value:",e,n),Wc(n,e);if(n instanceof Ye)return function(i,s){if(!$c(s.dataSource))throw s.createError(`${i._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${i._methodName}() is not currently supported inside arrays`);let o=i._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return function(i,s){let o=[],a=0;for(let c of i){let d=vn(c,s.childContextForArray(a));d==null&&(d={nullValue:"NULL_VALUE"}),o.push(d),a++}return{arrayValue:{values:o}}}(n,e)}return function(i,s,o){if((i=C(i))===null)return{nullValue:"NULL_VALUE"};if(typeof i=="number")return Pd(s.serializer,i);if(typeof i=="boolean")return{booleanValue:i};if(typeof i=="string")return{stringValue:i};if(i instanceof Date){let a=q.fromDate(i);return{timestampValue:_r(s.serializer,a)}}if(i instanceof q){let a=new q(i.seconds,1e3*Math.floor(i.nanoseconds/1e3));return{timestampValue:_r(s.serializer,a)}}if(Hc(i)){let a=q.fromInstant(i),c=new q(a.seconds,1e3*Math.floor(a.nanoseconds/1e3));return{timestampValue:_r(s.serializer,c)}}if(i instanceof Ee)return{geoPointValue:{latitude:i.latitude,longitude:i.longitude}};if(i instanceof de)return i.subtype===0?{bytesValue:cc(s.serializer,i._byteString)}:function(c,d){let _=d.toUint8Array(),I=new Uint8Array(_.length+1);return I[0]=d.subtype,I.set(_,1),{mapValue:{fields:{[Jr]:{bytesValue:cc(c,se.fromUint8Array(I))}}}}}(s.serializer,i);if(i instanceof L){let a=s.databaseId,c=i.firestore._databaseId;if(!c.isEqual(a))throw s.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:$s(i.firestore._databaseId||s.databaseId,i._key.path)}}if(i instanceof fe)return function(c,d){let _=c instanceof fe?c.toArray():c;return{mapValue:{fields:{[bc]:{stringValue:vc},[Sr]:{arrayValue:{values:_.map(w=>{if(typeof w!="number")throw d.createError("VectorValues must only contain numeric values.");return Lc(d.serializer,w)})}}}}}}(i,s);if(i instanceof St)return function(c){return{mapValue:{fields:{[ke]:{mapValue:{fields:{[Rr]:{stringValue:c.pattern},[Nr]:{stringValue:c.options}}}}}}}}(i);if(i instanceof Tt)return function(c){return{mapValue:{fields:{[cn]:{stringValue:c.value}}}}}(i);if(i instanceof At)return function(c){return{mapValue:{fields:{[bn]:gr(c.value)}}}}(i);if(i instanceof vt)return function(c){return{mapValue:{fields:{[mt]:{stringValue:c.stringValue}}}}}(i);if(i instanceof bt)return function(c){return{mapValue:{fields:{[We]:{mapValue:{fields:{[Pr]:gr(c.seconds),[kr]:gr(c.increment)}}}}}}}(i);if(i instanceof Qe)return function(){return{mapValue:{fields:{[Ac]:{nullValue:"NULL_VALUE"}}}}}();if(i instanceof Je)return function(){return{mapValue:{fields:{[qs]:{nullValue:"NULL_VALUE"}}}}}();if(Uc(i))return i._toProto(s.serializer);throw s.createError(`Unsupported field value: ${Yr(i)}`)}(n,e)}function Wc(n,e){let t={};return function(i){for(let s in i)if(Object.prototype.hasOwnProperty.call(i,s))return!1;return!0}(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):wn(n,(r,i)=>{let s=vn(i,e.childContextForField(r));s!=null&&(t[r]=s)}),{mapValue:{fields:t}}}function Hc(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;let e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.ht=="bigint"}function zc(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof q||n instanceof Ee||n instanceof de||n instanceof L||n instanceof Ye||n instanceof fe||n instanceof Qe||n instanceof Je||n instanceof At||n instanceof vt||n instanceof St||n instanceof Tt||n instanceof bt||Hc(n)||Uc(n))}function Js(n,e,t){if(!zc(t)||!Ic(t)){let r=Yr(t);throw r==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+r)}}function Xe(n,e,t){if((e=C(e))instanceof Ke)return e._internalPath;if(typeof e=="string")return Gc(n,e);throw Wr("Field path arguments must be of type string or ",n,!1,void 0,t)}var Hd=new RegExp("[~\\*/\\[\\]]");function Gc(n,e,t){if(e.search(Hd)>=0)throw Wr(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ke(...e.split("."))._internalPath}catch{throw Wr(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Wr(n,e,t,r,i){let s=r&&!r.isEmpty(),o=i!==void 0,a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||o)&&(c+=" (found",s&&(c+=` in field ${r}`),o&&(c+=` in document ${i}`),c+=")"),new E(y.INVALID_ARGUMENT,a+n+c)}function Kc(n,e){return n.some(t=>t.isEqual(e))}var Ze=class{constructor(e,t,r,i,s){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new L(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){let e=new gn(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){return this._document?.data.clone().value.mapValue.fields??void 0}get(e){if(this._document){let t=this._document.data.field(Xe("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},gn=class extends Ze{data(){return super.data()}},Hr=class{constructor(e,t){this._docs=t,this.query=e}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(e,t){this._docs.forEach(e,t)}};var _n=class{},Rt=class extends _n{};function Yc(n,e,...t){let r=[];e instanceof _n&&r.push(e),r=r.concat(t),function(s){let o=s.filter(c=>c instanceof zr).length,a=s.filter(c=>c instanceof yn).length;if(o>1||o>0&&a>0)throw new E(y.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(let i of r)n=i._apply(n);return n}var yn=class n extends Rt{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new n(e,t,r)}_apply(e){let t=this._parse(e);return Zc(e._query,t),new we(e.firestore,e.converter,bs(e._query,t))}_parse(e){let t=Dt(e.firestore);return function(s,o,a,c,d,_,I){let w;if(function(D,S){if(typeof D=="number"&&isNaN(D)&&S!=="=="&&S!=="!="&&S!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on NaN.");if(D===null&&S!=="=="&&S!=="!="&&S!=="array-contains")throw new Error("Invalid query. You can only perform '==' and '!=' comparisons on Null.")}(I,_),d.isKeyField()){if(_==="array-contains"||_==="array-contains-any")throw new E(y.INVALID_ARGUMENT,`Invalid Query. You can't perform '${_}' queries on documentId().`);if(_==="in"||_==="not-in"){dc(I,_);let A=[];for(let D of I)A.push(hc(c,s,D));w={arrayValue:{values:A}}}else w=hc(c,s,I)}else _!=="in"&&_!=="not-in"&&_!=="array-contains-any"||dc(I,_),w=Wd(a,o,I,_==="in"||_==="not-in");return oe.create(d,_,w)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}};function Jc(n,e,t){let r=e,i=Xe("where",n);return yn._create(i,r,t)}var zr=class n extends _n{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new n(e,t)}_parse(e){let t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:hn.create(t,this._getOperator())}_apply(e){let t=this._parse(e);return t.getFilters().length===0?e:(function(i,s){let o=i,a=s.getFlattenedFilters();for(let c of a)Zc(o,c),o=bs(o,c)}(e._query,t),new we(e.firestore,e.converter,bs(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}};var Gr=class n extends Rt{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new n(e,t)}_apply(e){let t=function(i,s,o){if(i.startAt!==null)throw new E(y.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new E(y.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new gt(s,o)}(e._query,this._field,this._direction);return new we(e.firestore,e.converter,function(i,s){let o=i.explicitOrderBy.concat([s]);return new yt(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}};function Qc(n,e="asc"){let t=e,r=Xe("orderBy",n);return Gr._create(r,t)}var Kr=class n extends Rt{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new n(e,t,r)}_apply(e){return new we(e.firestore,e.converter,function(r,i,s){return new yt(r.path,r.collectionGroup,r.explicitOrderBy.slice(),r.filters.slice(),i,s,r.startAt,r.endAt)}(e._query,this._limit,this._limitType))}};function Xc(n){return Id("limit",n),Kr._create("limit",n,"F")}function hc(n,e,t){if(typeof(t=C(t))=="string"){if(t==="")throw new E(y.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Ad(e)&&t.indexOf("/")!==-1)throw new E(y.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);let r=e.path.child(M.fromString(t));if(!$.isDocumentKey(r))throw new E(y.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return ic(n,new $(r))}if(t instanceof L)return ic(n,t._key);throw new E(y.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Yr(t)}.`)}function dc(n,e){if(!Array.isArray(n)||n.length===0)throw new E(y.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Zc(n,e){let t=function(i,s){for(let o of i)for(let a of o.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null}(n.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new E(y.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new E(y.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}var Fs=class{convertValue(e,t="none"){switch(ze(e)){case 0:return null;case 2:return e.booleanValue;case 3:if("mapValue"in e){if(Or(e))return this.convertToInt32Value(e.mapValue);if(Ge(e))return this.convertToDecimal128Value(e.mapValue)}return B(e.integerValue||e.doubleValue);case 4:return this.convertTimestamp(e.timestampValue);case 6:return this.convertServerTimestamp(e,t);case 7:return e.stringValue;case 8:return"bytesValue"in e?this.convertBytes(Ar(e.bytesValue)):this.convertToBytesWithSubtype(e.mapValue);case 9:return this.convertReference(e.referenceValue);case 11:return this.convertGeoPoint(e.geoPointValue);case 13:return this.convertArray(e.arrayValue,t);case 15:return this.convertObject(e.mapValue,t);case 14:return this.convertVectorValue(e.mapValue);case 12:return this.convertToRegexValue(e.mapValue);case 10:return this.convertToBsonObjectId(e.mapValue);case 5:return this.convertToBsonTimestamp(e.mapValue);case 16:return Je.instance();case 1:return Qe.instance();default:throw R(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){let r={};return wn(e,(i,s)=>{r[i]=this.convertValue(s,t)}),r}convertVectorValue(e){let t=e.fields?.[Sr].arrayValue?.values?.map(r=>B(r.doubleValue));return new fe(t)}convertToBsonObjectId(e){let t=e.fields?.[cn]?.stringValue??"";return new Tt(t)}convertToBytesWithSubtype(e){let t=e.fields?.[Jr],r=t?.bytesValue;if(!r)throw new Error("Received incorrect bytesValue for Bytes with subtype");let i=Ar(r).toUint8Array();if(i.length===0)throw new Error("Received empty bytesValue for Bytes with subtype");let s=i[0],o=i.slice(1);return new de(se.fromUint8Array(o),s)}convertToBsonTimestamp(e){let t=e.fields?.[We],r=Number(t?.mapValue?.fields?.[Pr]?.integerValue),i=Number(t?.mapValue?.fields?.[kr]?.integerValue);return new bt(r,i)}convertToRegexValue(e){let t=e.fields?.[ke]?.mapValue?.fields?.[Rr]?.stringValue??"",r=e.fields?.[ke]?.mapValue?.fields?.[Nr]?.stringValue??"";return new St(t,r)}convertToInt32Value(e){let t=Number(e.fields?.[bn]?.integerValue);return new At(t)}convertToDecimal128Value(e){let t=e.fields?.[mt]?.stringValue??"";return new vt(t)}convertGeoPoint(e){return new Ee(B(e.latitude),B(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":let r=Tc(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(an(e));default:return null}}convertTimestamp(e){let t=He(e);return new q(t.seconds,t.nanos)}convertDocumentKey(e,t){let r=M.fromString(e);J(Mc(r),9688,{name:e});let i=new Tr(r.get(1),r.get(3)),s=new $(r.popFirst(5));return i.isEqual(t)||In(`A document reference to ${s} refers to a different database (${i.projectId}/${i.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),s}};function Xr(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}var Nt=class extends Fs{constructor(e){super(),this.firestore=e}convertBytes(e){return new de(e)}convertReference(e){let t=this.convertDocumentKey(e,this.firestore._databaseId);return new L(this.firestore,null,t)}};function eu(n){let e=Ve((n=Te(n,L)).firestore),t=new Nt(n.firestore);return Hs(e,[n._key]).then(r=>{J(r.length===1,15618);let i=r[0];return new Ze(n.firestore,t,n._key,i.isFoundDocument()?i:null,n.converter)})}function tu(n){(function(i){if(i.limitType==="L"&&i.explicitOrderBy.length===0)throw new E(y.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")})((n=Te(n,we))._query);let e=Ve(n.firestore),t=new Nt(n.firestore);return Bd(e,n._query).then(r=>{let i=r.map(s=>new gn(n.firestore,t,s.key,s,n.converter));return n._query.limitType==="L"&&i.reverse(),new Hr(n,i)})}function nu(n,e,t){let r=Xr((n=Te(n,L)).converter,e,t),i=Qr(Dt(n.firestore),"setDoc",n._key,r,n.converter!==null,t);return kt(Ve(n.firestore),[i.toMutation(n._key,te.none())])}function ru(n,e,t,...r){let i=Dt((n=Te(n,L)).firestore),s;return s=typeof(e=C(e))=="string"||e instanceof Ke?Ys(i,"updateDoc",n._key,e,t,r):Ks(i,"updateDoc",n._key,e),kt(Ve(n.firestore),[s.toMutation(n._key,te.exists(!0))])}function iu(n){return kt(Ve((n=Te(n,L)).firestore),[new wt(n._key,te.none())])}function su(n,e){let t=Gs(n=Te(n,he)),r=Xr(n.converter,e),i=Qr(Dt(n.firestore),"addDoc",t._key,r,t.converter!==null,{});return kt(Ve(n.firestore),[i.toMutation(t._key,te.exists(!1))]).then(()=>t)}function ou(){return new Us("serverTimestamp")}var au="4.19.1";var An=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};var ei=class{constructor(e,t,r=1e3,i=1.5,s=6e4){this.t=e,this.timerId=t,this.i=r,this.o=i,this.h=s,this.u=0,this.l=null,this._=Date.now(),this.reset()}reset(){this.u=0}m(){this.u=this.h}A(e){this.cancel();let t=Math.floor(this.u+this.p()),r=Math.max(0,Date.now()-this._),i=Math.max(0,t-r);i>0&&Ce("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.u} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.l=this.t.enqueueAfterDelay(this.timerId,i,()=>(this._=Date.now(),e())),this.u*=this.o,this.u<this.i&&(this.u=this.i),this.u>this.h&&(this.u=this.h)}T(){this.l!==null&&(this.l.skipDelay(),this.l=null)}cancel(){this.l!==null&&(this.l.cancel(),this.l=null)}p(){return(Math.random()-.5)*this.u}};function Zr(n,e){if((n=C(n)).firestore!==e)throw new E(y.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}var zd=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new E(y.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;let t=await Hs(this.datastore,e);return t.forEach(r=>this.recordVersion(r)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new wt(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;let e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,r)=>{let i=$.fromPath(r);this.mutations.push(new mn(i,this.precondition(i)))}),await kt(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw R(50498,{R:e.constructor.name});t=x.min()}let r=this.readVersions.get(e.key.toString());if(r){if(!t.isEqual(r))throw new E(y.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){let t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(x.min())?te.exists(!1):te.updateTime(t):te.none()}preconditionForUpdate(e){let t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(x.min()))throw new E(y.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return te.updateTime(t)}return te.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};var Gd={maxAttempts:5};var Xs=class{constructor(e,t,r,i,s){this.asyncQueue=e,this.datastore=t,this.options=r,this.updateFunction=i,this.deferred=s,this.I=r.maxAttempts,this.P=new ei(this.asyncQueue,"transaction_retry")}V(){this.I-=1,this.D()}D(){this.P.A(async()=>{let e=new zd(this.datastore),t=this.v(e);t&&t.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.F(i)}))}).catch(r=>{this.F(r)})})}v(e){try{let t=this.updateFunction(e);return!Bs(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}F(e){this.I>0&&this.B(e)?(this.I-=1,this.asyncQueue.enqueueAndForget(()=>(this.D(),Promise.resolve()))):this.deferred.reject(e)}B(e){if(e?.name==="FirebaseError"){let t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!wc(t)}return!1}};function Qs(){return typeof document<"u"?document:null}var Zs=class n{constructor(e,t,r,i,s){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new An,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,i,s){let o=Date.now()+r,a=new n(e,t,o,i,s);return a.start(r),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new E(y.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}};var cu="AsyncQueue",eo=class{constructor(e=Promise.resolve()){this.k=[],this.O=!1,this.C=[],this.S=null,this.q=!1,this.M=!1,this.N=[],this.P=new ei(this,"async_queue_retry"),this.L=()=>{let r=Qs();r&&Ce(cu,"Visibility state changed to "+r.visibilityState),this.P.T()},this.W=e;let t=Qs();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.L)}get isShuttingDown(){return this.O}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.U(),this.j(e)}enterRestrictedMode(e){if(!this.O){this.O=!0,this.M=e||!1;let t=Qs();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.L)}}enqueue(e){if(this.U(),this.O)return new Promise(()=>{});let t=new An;return this.j(()=>this.O&&this.M?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.k.push(e),this.$()))}async $(){if(this.k.length!==0){try{await this.k[0](),this.k.shift(),this.P.reset()}catch(e){if(!function(r){return r.name==="IndexedDbTransactionError"}(e))throw e;Ce(cu,"Operation failed with retryable error: "+e)}this.k.length>0&&this.P.A(()=>this.$())}}j(e){let t=this.W.then(()=>(this.q=!0,e().catch(r=>{this.S=r,this.q=!1;let i=uu(r);throw In("INTERNAL UNHANDLED ERROR: ",i),r}).then(r=>(this.q=!1,r))));return this.W=t,t}enqueueAfterDelay(e,t,r){this.U(),this.N.indexOf(e)>-1&&(t=0);let i=Zs.createAndSchedule(this,e,t,r,s=>this.G(s));return this.C.push(i),i}U(){this.S&&R(47125,{K:uu(this.S)})}verifyOperationInProgress(){}async H(){let e;do e=this.W,await e;while(e!==this.W)}J(e){for(let t of this.C)if(t.timerId===e)return!0;return!1}X(e){return this.H().then(()=>{this.C.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(let t of this.C)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.H()})}Y(e){this.N.push(e)}G(e){let t=this.C.indexOf(e);this.C.splice(t,1)}};function uu(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}var to=class{constructor(e,t){this._firestore=e,this._transaction=t,this._dataReader=Dt(e)}get(e){let t=Zr(e,this._firestore),r=new Nt(this._firestore);return this._transaction.lookup([t._key]).then(i=>{if(!i||i.length!==1)return R(24041);let s=i[0];if(s.isFoundDocument())return new Ze(this._firestore,r,s.key,s,t.converter);if(s.isNoDocument())return new Ze(this._firestore,r,t._key,null,t.converter);throw R(18433,{doc:s})})}set(e,t,r){let i=Zr(e,this._firestore),s=Xr(i.converter,t,r),o=Qr(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(e,t,r,...i){let s=Zr(e,this._firestore),o;return o=typeof(t=C(t))=="string"||t instanceof Ke?Ys(this._dataReader,"Transaction.update",s._key,t,r,i):Ks(this._dataReader,"Transaction.update",s._key,t),this._transaction.update(s._key,o),this}delete(e){let t=Zr(e,this._firestore);return this._transaction.delete(t._key),this}};function Kd(n,e,t){n=Te(n,Oe);let r=Ve(n),i={...Gd,...t};(function(a){if(a.maxAttempts<1)throw new E(y.INVALID_ARGUMENT,"Max attempts must be at least 1")})(i);let s=new An;return new Xs(function(){return new eo}(),r,i,o=>e(new to(n,o)),s).V(),s.promise}(function(){fc(`${Se}_lite`),Ae(new X("firestore/lite",(e,{instanceIdentifier:t,options:r})=>{let i=e.getProvider("app").getImmediate(),s=new Oe(new Ir(e.getProvider("auth-internal")),new wr(i,e.getProvider("app-check-internal")),gc(i,t),i);return r&&s._setSettings(r),s},"PUBLIC").setMultipleInstances(!0)),re("firestore-lite",au,""),re("firestore-lite",au,"esm2020")})();export{ut as GoogleAuthProvider,su as addDoc,qc as collection,Ki as connectAuthEmulator,zs as connectFirestoreEmulator,iu as deleteDoc,Gs as doc,$a as getAuth,eu as getDoc,tu as getDocs,Bc as getFirestore,Fa as getRedirectResult,Co as initializeApp,Xc as limit,Ra as onAuthStateChanged,Qc as orderBy,Yc as query,Kd as runTransaction,ou as serverTimestamp,nu as setDoc,La as signInWithPopup,Ua as signInWithRedirect,Na as signOut,ru as updateDoc,Jc as where};
/*! Bundled license information:

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/auth/dist/esm/index-Bz2J43nW.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/webchannel-wrapper/dist/bloom-blob/esm/bloom_blob_es2018.js:
  (** @license
  Copyright The Closure Library Authors.
  SPDX-License-Identifier: Apache-2.0
  *)
  (** @license
  
   Copyright The Closure Library Authors.
   SPDX-License-Identifier: Apache-2.0
  *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * Copyright 2021 M.Vokhmentsev
   *
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2024 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/common-COCKIFt2.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/firestore/dist/lite/index.browser.esm.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
