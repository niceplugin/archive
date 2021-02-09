var nicedb;nicedb=(()=>{"use strict";var e={352:(e,t,r)=>{function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e){return function(e){if(Array.isArray(e))return u(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return u(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?u(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function c(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t,r){return t&&l(e.prototype,t),r&&l(e,r),e}function f(e,t){var r=t.get(e);if(!r)throw new TypeError("attempted to get private field on non-instance");return r.get?r.get.call(e):r.value}function d(e,t,r){var n=t.get(e);if(!n)throw new TypeError("attempted to set private field on non-instance");if(n.set)n.set.call(e,r);else{if(!n.writable)throw new TypeError("attempted to set read only private field");n.value=r}return r}function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e){return null!==e&&!Array.isArray(e)&&"object"===p(e)}function h(e){return"boolean"==typeof e}r.d(t,{default:()=>I});var b=new WeakMap,v=new WeakMap,m=new WeakMap,w=new WeakMap,g=new WeakMap,j=new WeakMap,O=new WeakMap,E=function(){function e(t,r){c(this,e),b.set(this,{writable:!0,value:void 0}),v.set(this,{writable:!0,value:void 0}),m.set(this,{writable:!0,value:void 0}),w.set(this,{writable:!0,value:void 0}),g.set(this,{writable:!0,value:void 0}),j.set(this,{writable:!0,value:void 0}),O.set(this,{writable:!0,value:void 0});var n=this,o=t;d(this,b,t),d(this,v,r),d(this,m,{_id:{$gt:0}}),d(this,w,(function(e,t){var r=f(n,v).result.transaction(o,t);r.onerror=function(){throw r.error};var i=r.objectStore(o),a=Object.keys(e)[0];return{objectStore:i="_id"===a?i:i.index(a),field:a}})),d(this,g,(function(e){var t=e[Object.keys(e)[0]];if(y(t)){var r,n=Object.keys(t),o={};n.forEach((function(e){var r=t[e];"$lt"===e?(o.upper=r,o.upperOpen=!0):"$lte"===e?(o.upper=r,o.upperOpen=!1):"$gt"===e?(o.lower=r,o.lowerOpen=!0):"$gte"===e&&(o.lower=r,o.lowerOpen=!1)}));var i=Object.keys(o);if(i.includes("lower")&&i.includes("upper")?r=IDBKeyRange.bound(o.lower,o.upper,o.lowerOpen,o.upperOpen):i.includes("lower")?r=IDBKeyRange.lowerBound(o.lower,o.lowerOpen):i.includes("upper")&&(r=IDBKeyRange.upperBound(o.upper,o.upperOpen)),!r)throw new URIError("The value of the query is invalid.");return r}return IDBKeyRange.only(t)})),d(this,j,(function(e,t,r){e.onsuccess=function(){t(e.result)},e.onerror=function(){r(e.error)}})),d(this,O,(function(e,t,r){return new Promise((function(o,i){try{var a=f(n,w).call(n,t,"readonly").objectStore,u=f(n,g).call(n,t),c=r&&r>0?a[e](u,r):a[e](u);f(n,j).call(n,c,o,i)}catch(e){i(e)}}))}))}return s(e,[{key:"name",get:function(){return f(this,b)},set:function(e){return e}},{key:"indexList",get:function(){return a(f(this,w).call(this,f(this,m),"readonly").objectStore.indexNames)},set:function(e){return e}},{key:"indexInfo",get:function(){var e=f(this,w).call(this,f(this,m),"readonly").objectStore;return a(e.indexNames).map((function(t){var r=e.index(t);return{field:r.keyPath,multiEntry:r.multiEntry,unique:r.unique}}))},set:function(e){return e}},{key:"find",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f(this,m),t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return"number"==typeof e&&(t=e,e=f(this,m)),e||(e=f(this,m)),f(this,O).call(this,"getAll",e,t)}},{key:"findOne",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f(this,m);return f(this,O).call(this,"get",e)}},{key:"count",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f(this,m);return f(this,O).call(this,"count",e)}},{key:"insert",value:function(e){var t=this;return new Promise((function(r,n){try{y(e)||n(new URIError("The second argument must be an object.")),delete e._id,0===Object.keys(e).length&&n(new URIError("The document to be inserted cannot be an empty object."));var o=f(t,w).call(t,f(t,m),"readwrite").objectStore.add(e);f(t,j).call(t,o,r,n)}catch(e){n(e)}}))}},{key:"update",value:function(){for(var e=this,t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return new Promise((function(t,n){try{var i,a=f(e,m),u=!1,c=null;if(0===r.length)return n(new URIError("There are no parameters."));if(1===r.length){if(!y(r[0]))return n(new URIError('"doc" parameter must be an object.'));i=r[0],c=!1}else if(2===r.length)if(h(r[1])){if(!y(r[0]))return n(new URIError('"doc" parameter must be an object.'));i=r[0],u=!!r[1],c=!1}else{if(!y(r[0])||!y(r[1]))return n(new URIError('"query" and "doc" parameters must be an object.'));a=r[0],i=r[1]}else{if(!y(r[0])||!y(r[1]))return n(new URIError('"query" and "doc" parameters must be an object.'));a=r[0],i=r[1],u=!!r[2]}var l=f(e,w).call(e,a,"readwrite"),s=l.objectStore,d=l.field;c=null===c?"_id"===d:c;var p=f(e,g).call(e,a),b=c?s.get(p):s.openCursor(p),v=[];delete i._id,b.onerror=function(){n(b.error)},b.onsuccess=function(){var e=c?s:b.result;if(!e)return t(v);var r=c?b.result:e.value;if(void 0===r)return t(v);var a=o(u?{_id:r._id}:o({},r),i);if(!c&&-1!==v.indexOf(e.primaryKey))return e.continue();var l=c?e.put(a):e.update(a);l.onerror=function(e){n(e.target.error)},l.onsuccess=function(){c?t([l.result]):(v.push(e.primaryKey),e.continue())}}}catch(e){n(e)}}))}},{key:"remove",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f(this,m);return new Promise((function(r,n){try{var o=f(e,w).call(e,t,"readwrite"),i=o.objectStore,a="_id"===o.field,u=f(e,g).call(e,t),c=a?i.delete(u):i.openCursor(u);a?f(e,j).call(e,c,r,n):(c.onerror=function(){n(c.error)},c.onsuccess=function(){var e=c.result;e?(e.delete(),e.continue()):r()})}catch(e){n(e)}}))}},{key:"clear",value:function(){var e=this;return new Promise((function(t,r){try{var n=f(e,w).call(e,f(e,m),"readwrite").objectStore.clear();f(e,j).call(e,n,t,r)}catch(e){r(e)}}))}}]),e}(),k=new WeakMap,S=new WeakMap;const I=new(function(){function e(){c(this,e),k.set(this,{writable:!0,value:void 0}),S.set(this,{writable:!0,value:void 0}),d(this,k,null),d(this,S,null),this.onversionchange=null,this.onblocked=null}return s(e,[{key:"define",value:function(e){var t=this;return new Promise((function(r,n){if(!indexedDB)throw new ReferenceError("IndexedDB is not supported at this runtime.");if(!y(e)||!Object.keys(e).length)throw new URIError("The parameter must be an object defining the stores of IndexedDB.");var o=t;d(t,S,JSON.parse(JSON.stringify(e))),d(t,k,indexedDB.open("niceDB",+new Date)),f(t,k).onerror=function(){n(f(o,k).error)},f(t,k).onblocked=function(){var e=new Error("Your database version can't be upgraded because the app is open somewhere else.");"function"==typeof o.onblocked?o.onblocked(e):n(e)},f(t,k).onsuccess=function(e){r(e)},f(t,k).onupgradeneeded=function(e){try{var t=f(o,k).result;t.onversionchange=function(e){"function"==typeof o.onversionchange&&o.onversionchange(e)};var r=a(Object.keys(f(o,S)));a(t.objectStoreNames).filter((function(e){return!r.includes(e)})).forEach((function(e){return t.deleteObjectStore(e)})),r.forEach((function(r){var n,i=e.target.transaction;n=t.objectStoreNames.contains(r)?i.objectStore(r):t.createObjectStore(r,{keyPath:"_id",autoIncrement:!0});var u=function(e){var t=f(o,S)[e];if(!Array.isArray(t)||!t.length)throw new URIError("The field of store '".concat(e,"' is invalid. Field must be an array."));return t.map((function(t,r){var n="The index in problem is ".concat(r," of the field array of '").concat(e,"' store."),o="string"==typeof t&&!t.length,i=null===t||Array.isArray(t),a="object"!==p(t)&&"string"!=typeof t;if(o||i||a)throw new URIError("The properties of the Field array, must be 'strings of longer then 1' or object. ".concat(n));if("string"==typeof t)return{name:t,unique:!1,multiEntry:!1};if(!t.name||"string"!=typeof t.name||!t.name.length)throw new URIError("If the property of the field array is an object, it must have name property with a string of longer than 1. ".concat(n));return{name:t.name,unique:!!t.unique,multiEntry:!!t.multiEntry}}))}(r),c=u.map((function(e){return e.name})),l=a(n.indexNames),s=l.filter((function(e){return!c.includes(e)})),d=u.filter((function(e){return!l.includes(e.name)})),y=u.filter((function(e){return l.includes(e.name)}));s.forEach((function(e){return n.deleteIndex(e)})),d.forEach((function(e){var t=e.name,r={unique:e.unique,multiEntry:e.multiEntry};"_id"!==t&&n.createIndex(t,t,r)})),y.forEach((function(e){var t=n.index(e.name);if(e.unique!==t.unique||e.multiEntry!==t.multiEntry){var r=e.name,o={unique:e.unique,multiEntry:e.multiEntry};n.deleteIndex(r),n.createIndex(r,r,o)}}))}))}catch(e){n(e)}}}))}},{key:"getStore",value:function(e){return a(f(this,k).result.objectStoreNames).includes(e)?new E(e,f(this,k)):null}}]),e}())}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}return r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r(352)})().default;