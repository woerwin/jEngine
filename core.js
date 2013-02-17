!(function(c){c.Logger=function(){};c.Logger.level=4;c.Logger.setLevel=function(e){c.Logger.level=e};var d=false;var a=["error","warn","info","debug","log"];c.extend(c.Logger.prototype,{level:c.Logger.level,setEnableLevel:function(e){if(e>4||e<0){this.error(["wrong level setting. level should be 0-4, the int type,you set ",e,", so stupided."].join(""))}this.level=parseInt(e)},setErrorUri:function(e){c.Logger.errorUri=e},enabled:function(e){if(e>c.Logger.level){return false}return true},name:function(){return this._name},log:function(){this._log(4,arguments)},debug:function(){this._log(3,arguments)},info:function(){this._log(2,arguments)},warn:function(){this._log(1,arguments)},error:function(){this._log(0,arguments)},_handler:function(g,h,k,j){var f=a[g];var l=[[f+"|"].join(" | ")].concat(Array.prototype.slice.call(k));if(self.console&&!c.browser.msie){if(console.log.apply){console[f].apply(console,l)}else{console[console[f]?f:"log"](l)}}else{if(c.browser.msie){if(/debug=true/i.test(location.search)){!d&&this._prepare();var i=c("#DEBUG ol");var m;switch(f){case"log":m="#FFFFFF";break;case"debug":m="#C0C0C0";break;case"info":m="#EBF5FF";break;case"warn":m="#FFFFC8";break;case"error":m="#FE6947";break;default:m="#FFFFFF";break}c('<li style="background-color:'+m+';">').text(""+l).appendTo(i)}}}if(!DEBUG_MOD&&c.Logger.errorUri){if(g==0||g==1){var e="";if(j){e="&module="+j;l=k}(new Image()).src=c.Logger.errorUri+this._getBrowserInfo()+this._getErrorUrl()+"&level=3"+"&msg="+encodeURIComponent(l)+e}}},_log:function(h,g){if(this.enabled(h)){var e=g[0];var f=g[1];this._handler(h,this.name(),e,f)}},_getBrowserInfo:function(){var e="&browser=";var f="";c.each(jQuery.browser,function(g,h){if(g!="version"){f=f+g+" "}else{f=f+h}});return e+encodeURIComponent(f)},_getErrorUrl:function(){var e="&erroruri=";var f=window.location.href;return e+encodeURIComponent(f)},_prepare:function(){c("#DEBUG").remove();c(document.body).append('<div id="DEBUG" style="margin-top:10px;padding:8px;border:dashed 1px #FF7300;background-color:#EEE;color:#000;"><ol></ol></div>');d=true},end:0});var b={};c.getLogger=function(e){if(!b[e]){b[e]=new c.Logger(e);b[e]._name=e}return b[e]};c.logger=c.getLogger("jEngine");if(DEBUG_MOD){c.logger.setEnableLevel(4)}else{c.logger.setEnableLevel(2)}})(jQuery);!(function(a){function b(c,e,d){return this.init(c,e,d)}a.extend(b.prototype,{init:function(c,e,d){this.core=c;this.moduleId=e;this.options=d!=null?d:{}}});jEngine.Core.Sandbox=b})(jQuery);!(function(a){function b(c){this.channels={};if(c){this.installTo(c)}}a.extend(b.prototype,{on:function(g,h,d){var c,l,k,f,j,e;if(d==null){d=this}if(this.channels[g]==null){this.channels[g]=[]}k=this;if(g instanceof Array){e=[];for(f=0,j=g.length;f<j;f++){c=g[f];e.push(this.on(c,h,d))}return e}else{l={context:d,callback:h};return{attach:function(){k.channels[g].push(l);return this},detach:function(){b._rm(k,g,l.callback);return this}}.attach()}},off:function(d,c){var e;switch(typeof d){case"string":if(typeof c==="function"){b._rm(this,d,c)}if(typeof c==="undefined"){b._rm(this,d)}break;case"function":for(e in this.channels){b._rm(this,e,d)}break;case"undefined":for(e in this.channels){b._rm(this,e)}break;case"object":for(e in this.channels){b._rm(this,e,null,d)}}return this},notify:function(h,f,m){var c,d,n,l,g,j,e;if(this.channels[h]!=null){e=this.channels[h];for(g=0,j=e.length;g<j;g++){n=e[g];if(m!==true&&typeof f==="object"){if(f instanceof Array){c=(function(){var o,i,k;k=[];for(o=0,i=f.length;o<i;o++){l=f[o];k.push(l)}return k})()}else{c={};for(d in f){l=f[d];c[d]=l}}n.callback.apply(n.context,[c,h])}else{n.callback.apply(n.context,[f,h])}}}return this},installTo:function(c){if(typeof c==="object"){c.on=this.on;c.off=this.off;c.notify=this.notify;c.channels=this.channels}return this}});b._rm=function(g,f,d,c){var e;return g.channels[f]=(function(){var k,j,l,h;l=g.channels[f];h=[];for(k=0,j=l.length;k<j;k++){e=l[k];if((d!=null?e.callback!==d:c!=null?e.context!==c:e.context!==g)){h.push(e)}}return h})()};jEngine.Core.Mediator=b})(jQuery);!(function(d){var g,f={styleDomain:"style.china.alibaba.com",end:0},a={},e=document,c={};function b(h){g=h;return b}d.extend(b,{add:function(m,p,l){m=(d.isArray(m)?m:m.replace(/\s+/g,"").split(","));if(d.isPlainObject(p)){l=p;p=undefined}for(var k=0,h=m.length;k<h;k++){var j=m[k],n=a[j];if(n){if(!l){n.status="ready"}}else{a[j]=d.extendIf(l||{status:"ready"},{ver:"1.0"})}}if(d.isFunction(p)){p()}},use:function(m,n,k){var j=this;var i=jQuery.Deferred();m=(d.isArray(m)?m:d.unique(m.replace(/\s+/g,"").split(",")));var l=0;if(d.type(n)==="boolean"||d.type(n)==="object"){k=n;n=undefined}d.each(m,function(p,o){var q=a[o];if(q){if(k&&q.url){if(typeof k==="boolean"){k={}}d.extend(q,k,{status:q.callbackQueue?"refresh":"reset"})}if(q.status==="ready"){h(q._data)}else{if(k){d.extend(q,k)}if(q.requires){j.use(q.requires,function(){j.init(o,h,i)})}else{j.init(o,h,i)}}}else{d.error("Invalid Module "+o)}});function h(o){l++;if(m.length===l){if(d.isFunction(n)){n(o)}i.resolve(o)}}return i.promise()},init:function(i,s,t){var u=this;var p=a[i],j=p.url,n=p.css,k=p.js;if(j||d.isArray(k)||d.isArray(n)){p.callbackQueue=p.callbackQueue||[];p.callbackQueue[p.callbackQueue.length]=s;if(p.callbackQueue.length===1||p.status==="refresh"){var o=1,h=0,r=function(q){h++;if(q){p._data=q}if(h===o){p.status="ready";d.each(p.callbackQueue,function(v,w){w(q)});delete p.callbackQueue}},m=function(q,v){t.reject()},l=function(){delete p.jqxhr};if(j){p.jqxhr&&p.jqxhr.abort();p.jqxhr=d.ajax(u.extendIf({global:false,success:r,error:p.error||m,complete:l},p))}else{k=k||[];n=n||[];o=k.length+n.length;d.each(n,function(v,q){q=u.substitute(q,[d.styleDomain,p.ver]);u.loadCSS(q,r)});d.each(k,function(q,v){v=u.substitute(v,[d.styleDomain,p.ver]);d.ajax(v,{global:false,dataType:"script",cache:true,success:r,error:m})})}}}else{s(p._data)}},substitute:function(i,h){return i.replace(/\{(\w+)\}/g,function(k,j){return h[j]!==undefined?h[j]:"{"+j+"}"})},extendIf:function(i,j){if(j===undefined){j=i;i=this}for(var h in j){if(typeof i[h]==="undefined"){i[h]=j[h]}}return i},loadCSS:function(i,m,t){var s=e.getElementsByTagName("head")[0]||e.documentElement,k=s.getElementsByTagName("base"),r=c[i],h;if(d.isFunction(m)){t=m;m=undefined}if(r){t&&t()}else{r=e.createElement("link");var l={type:"text/css",rel:"stylesheet",media:"screen",href:i};if(d.isPlainObject(m)){d.extend(l,m)}for(var j in l){r.setAttribute(j,l[j])}c[i]=r;t&&q(r,t)}return k.length?s.insertBefore(r,k[0]):s.appendChild(r);function q(o,p){if(o.attachEvent){o.attachEvent("onload",p)}else{setTimeout(function(){n(o,p)},0)}}function n(p,u){if(d.browser.webkit){if(p["sheet"]){h=true}}else{if(p["sheet"]){try{if(p["sheet"].cssRules){h=true}}catch(o){if(o.name==="SecurityError"||o.name==="NS_ERROR_DOM_SECURITY_ERR"){h=true}}}}setTimeout(function(){if(h){u()}else{n(p,u)}},0)}},unloadCSS:function(h){var i=c[h];if(i){i.parentNode.removeChild(i);delete c[h];return true}else{return false}},setStyleDomain:function(h){f.styleDomain=h},end:0});jEngine.Core.ModuleLoader=b})(jQuery);!(function(g){var h,c=jEngine.Core.ModuleLoader,i={threshold:250,end:0};var b=false;var f=g(window);var d=0;var a=[];var j={};function e(k){h=k;h.on("jEngine.lazyLoad",function(l){e._handleManualEvent(l)});return e}g.extend(e,{register:function(o,k,q,s){var n=g.extend(true,{},i,q);if(o){var l=g(o);if(!l||l.length==0||!k){return false}var t=this;if(k==="exposure"){this._handleExposureEvent(l,n,s)}else{var m=null;var p=function(v){var u=this;m=setTimeout(function(){t._getModule(u,n,s,k);l.unbind(k,p);if(k=="mouseover"){l.unbind("mouseout",r)}},50)};l.bind(k,p);var r=function(){clearTimeout(m)};if(k=="mouseover"){l.bind("mouseout",r)}}}else{if(k==="manual"){j[n.key]=[n,s]}}return true},_handleExposureEvent:function(m,k,n){var l=this._pushToArray(m,k,n);this._uniqueMerge(a,l);if(!b){d=this._getViewportHeight();this._bindExposureEvent()}this._loadModules()},_handleManualEvent:function(l){if(l.moduleId){var k=j[l.moduleId];if(k){this._getModule(null,k[0],k[1]);delete j[l.moduleId]}}},_pushToArray:function(n,l,o){var k=[];if(!n.length){return k}for(var m=0;m<n.length;m++){k.push([n[m],l,o])}return k},_uniqueMerge:function(o,l){for(var n=0;n<l.length;n++){for(var m=0,k=o.length;m<k;m++){if(l[n]===o[m]){l.splice(n,1);break}}}g.merge(o,l)},_bindExposureEvent:function(){if(b){return}var k=this;f.bind("scroll.lazymodule",function(l){k._exposureCall(k._loadModules,k)});f.bind("resize.lazymodule",function(l){d=k._getViewportHeight();k._exposureCall(k._loadModules,k)});b=true},_removeEvent:function(){if(!b){return}f.unbind("scroll.lazymodule");f.unbind("resize.lazymodule");b=false},_exposureCall:function(l,k){clearTimeout(l.tId);l.tId=setTimeout(function(){l.call(k)},100)},_loadModules:function(){this._filter(a,this._runCallback,this);if(a.length===0){this._removeEvent()}},_filter:function(r,q,m){var o;for(var l=0;l<r.length;){o=r[l];if(g.isArray(o)&&this._checkPosition(o)){r.splice(l,1);q.call(m,o);if(!o[1].keep){var n=o[1].key;for(var k=0;k<r.length;){var p=r[k];if(n===p[1].key){r.splice(k,1)}else{k++}}}}else{l++}}},_runCallback:function(k){var n,m,l;n=k[0];l=k[1];m=k[2];this._getModule(n,l,m)},_getModule:function(o,k,n,q){var l=this;var m=k.module;if(m){var p=m.moduleId;c.add(p,{js:m.js,css:m.css});if(n){c.use(p,function(){n(o);if(q){l._dispatchEvent(o,q)}})}else{c.use(p)}}else{if(n){n(o)}}},_getViewportHeight:function(){return f.height()},_checkPosition:function(n){var l=false;var k=n[1].threshold?n[1].threshold:i.threshold;var p=g(document).scrollTop();var o=p+d+k;var m=(g(n).css("display")!=="none")?g(n).offset().top:Number.POSITIVE_INFINITY;if(m<=o){l=true}return l},_dispatchEvent:function(n,k){try{if(document.createEvent){var l=document.createEvent("MouseEvents");l.initEvent(k,true,false);n.dispatchEvent(l)}else{if(document.createEventObject){n.fireEvent("on"+k)}}return true}catch(m){return false}},end:0});jEngine.Core.LazyModule=e})(jQuery);!(function(a){var b={dataField:"data-mod-config",docField:"data-doc-config",combineField:"combine-mod-config",scriptField:"script-mod-config",AllReadyEvent:"jEngine.ready",end:0};function c(d){this.init(d)}a.extend(c.prototype,{init:function(d){this.config=a.extend(true,{},b,d);this.moduleData={};this.mediator=new jEngine.Core.Mediator();this.lazyModule=new jEngine.Core.LazyModule(this.mediator)},register:function(g,f,e){if(e==null){e={}}try{if(!this._addModule(g,f,e)){return false}if(e.init){return this.start(g)}return true}catch(d){if(!DEBUG_MOD){a.logger.error("could not register "+g+" because: "+d.message,g)}else{throw d}return false}},lazyRegister:function(e,g,i,d,f){if(f==null){f={}}try{var f=this._getModuleCombine(e,f);var j=false;if(f.init===false){j=this.lazyModule.register(i,d,f)}else{var l=this;var h=null;if(f.callback){if(g){h=function(){if(l._lazyStart(e,g)){f.callback()}}}else{h=f.callback}}else{h=function(){l._lazyStart(e,g)}}j=this.lazyModule.register(i,d,f,h)}return j}catch(k){if(!DEBUG_MOD){a.logger.error("could not lazyregister "+e+" because: "+k.message,e)}else{throw k}return false}},unregister:function(d){if(this.moduleData[d]!=null){delete this.moduleData[d];return true}else{return false}},start:function(g){try{if(this.moduleData[g]==null){throw new Error("module "+g+" does not exist")}var h=a.now();var f=this.moduleData[g].options;if(f==null){f={}}var d=this._createInstance(g,f);if(d.running===true){return}if(typeof d.init!=="function"){throw new Error("module "+g+" do not have an init function")}d.init(d.options);d.running=true;this.moduleData[g].instance=d;if(typeof f.callback==="function"){f.callback()}a.logger.info(g+" init finished, cost:"+ +(a.now()-h)+" ms",g);return true}catch(e){if(!DEBUG_MOD){a.logger.error(g+" init Error: "+e.message,g)}else{throw e}return false}},startAll:function(){var e,d;d=[];for(e in this.moduleData){if(this.moduleData.hasOwnProperty(e)){d.push(this.start(e))}}this.mediator.notify(this.config.AllReadyEvent);return d},stop:function(e){var d=this.moduleData[e];if(d.instance){if(a.isFunction(d.instance.destroy)){d.instance.destroy()}d.instance.running=false;d.instance=null;return true}else{return false}},stopAll:function(){var e,d;d=[];for(e in this.moduleData){if(this.moduleData.hasOwnProperty(e)){d.push(this.stop(e))}}return d},restart:function(d){if(this.stop(d)){return this.start(d)}return false},_addModule:function(g,f,e){if(typeof g!=="string"){throw new Error("moudule ID has to be a string")}var d=f;if(typeof f==="string"){f=this._parseFunction(f)}if(typeof f!=="function"){if(e.ignore){return false}else{throw new Error("creator "+d+" has to be a constructor function")}}if(typeof e!=="object"){throw new Error("option parameter has to be an object")}if(this.moduleData[g]!=null){throw new Error("module was already registered")}this.moduleData[g]={creator:f,options:e};return true},_createInstance:function(h,g){var f=this.moduleData[h];if(f.instance!=null){return f.instance}var j=new jEngine.Core.Sandbox(jEngine.Core.AppEntity,h,g);this.mediator.installTo(j);var g=this._getModuleConfig(h,g);var d=new f.creator(j),e,i;d.options=g;if(!DEBUG_MOD){for(e in d){i=d[e];if(typeof i=="function"){d[e]=function(k,l){return function(){try{return l.apply(this,arguments)}catch(m){a.logger.error(h+" throw error: "+k+"()-> "+m.message,h)}}}(e,i)}}}return d},_lazyStart:function(e,d){if(this.moduleData[e]==null){if(this.register(e,d,{ignore:true})){return this.start(e)}}return false},_getModuleConfig:function(d,f){var h="#"+d;var i=a(h);if(i.length>0){var k=i.attr(this.config.dataField);if(k&&k.trim()){f.data=a.parseJSON(k)}var g=i.attr(this.config.scriptField);if(g&&g.trim()){var j=a.parseJSON(g);var m=a("#"+j.script);if(m.length>0){if(j.replace){i.replaceWith(m.html())}else{i.html(m.html())}}}f.id=d;f.dom=i}if(!this.docDetect){try{var n=a("#doc");if(n.length>0){var k=n.attr(this.config.docField);if(k&&k.trim()){k=k.replace(/\\'/g,"'");this.config.global=f.global=a.parseJSON(k)}}}catch(l){}this.docDetect=true}else{if(this.config.global){f.global=this.config.global}}return f},_getModuleCombine:function(f,d){if(typeof(d.module)!=="undefined"){var g="#"+f;var e=a(g);if(e.length>0){var h=e.attr(this.config.combineField);if(h&&h.trim()){d.module=d.module[h]}}d.module.moduleId=f}d.key=f;return d},_parseFunction:function(g){var e=g.split("."),d=e.length,h=window;for(var f=(a.isWindow(e[0])?1:0);f<d;f++){if(a.isFunction(h[e[f]])||a.isPlainObject(h[e[f]])){h=h[e[f]]}else{return null}}if(a.isFunction(h)){return h}return null},end:0});AppCore=jEngine.Core.AppEntity=new c()})(jQuery);
