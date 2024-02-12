//
// vein
//

!function(e,t){"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("vein",t):this.vein=t()}(0,function(){var e=function(){},t=function(e,t,n){var s,r,l=[],i=[],u=t[document.all?"rules":"cssRules"],o=e.replace(/\s/g,"");for(s=0,r=u.length;s<r;s++)(u[s].selectorText===e||4===u[s].type&&u[s].cssText.replace(/\s/g,"").substring(0,o.length)==o)&&(null===n?i.push(s):l.push(u[s]));for(s=0,r=i.length;s<r;s++)t.deleteRule(i[s]);return l},n=function(e){var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n+": "+e[n]+";");return t.join("")};e.getStylesheet=function(){return this.element&&document.getElementById("vein")||(this.element=document.createElement("style"),this.element.setAttribute("type","text/css"),this.element.setAttribute("id","vein"),document.getElementsByTagName("head")[0].appendChild(this.element),this.stylesheet=this.element.sheet),this.stylesheet};var s=function(e){return e[document.all?"rules":"cssRules"]},r=function(e,t,n){var r=s(n);n.insertRule?n.insertRule(e+"{"+t+"}",r.length):n.addRule(e,t,r.length)};return e.inject=function(e,l,i){var u,o,h,f,c,a,y,d,g,p,m=(i=function(e){e=e||{};for(var t=1;t<arguments.length;t++)if(arguments[t])for(var n in arguments[t])arguments[t].hasOwnProperty(n)&&(e[n]=arguments[t][n]);return e}({},i)).stylesheet||this.getStylesheet();s(m);for("string"==typeof e&&(e=[e]),u=0,o=e.length;u<o;u++)if("object"==typeof e[u]&&m.insertRule)for(h in e[u])if(0===(f=t(h,m,l)).length)for(c=n(l),g=0,p=e[u][h].length;g<p;g++)r(h,e[u][h][g]+"{"+c+"}",m);else for(y=0,d=f.length;y<d;y++)this.inject(e[u][h],l,{stylesheet:f[y]});else{if(f=t(e[u],m,l),null===l)return;if(0===f.length)c=n(l),r(e[u],c,m);else for(y=0,d=f.length;y<d;y++)for(a in l)l.hasOwnProperty(a)&&(f[y].style.setProperty?f[y].style.setProperty(a,l[a],""):f[y].style.setAttribute(a,l[a],""))}return this},e});


//
// jwlib-utils
//

(function($){"use strict";jQuery.fn.exists=function(){return jQuery(this).length>0;};jQuery.getParameterByName=function(name,url){if(!url)url=window.location.href;name=name.replace(/[[\]]/g,"\\$&");var regex=new RegExp("[?&]"+name+"(=([^&#]*)|&|#|$)"),results=regex.exec(url);if(!results)return null;if(!results[2])return"";return decodeURIComponent(results[2].replace(/\+/g," "));};jQuery.debug=function(){if(window.debug===true)window.debug=1;var maxlevel=parseInt($.getParameterByName("debug")||window.debug)||0;if(maxlevel===0)return;var args=Array.prototype.slice.call(arguments),group="debug",loglevel=1;if(args.length>1&&typeof(args[args.length-1])==="number"){loglevel=args.pop();}
if(loglevel>maxlevel)return;if(args.length>1&&typeof(args[0])==="string"){group=args.shift();}
var debugGroup=$.getParameterByName("debugGroup")||window.debugGroup;if(debugGroup&&!group.match(debugGroup))return;console.group(group);args.forEach(function(arg){if(Array.isArray(arg)&&typeof arg[0]!=="object"){console.table(arg);}
else{console.log(arg);}});console.groupEnd();};jQuery.isMobile=jQuery.isTouch=function(){return"ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch||false;};if(jQuery.isTouch())document.documentElement.classList.add("touch");jQuery.clearBrowserCache=function(){$(window).on("pageshow",function(event){if(event.originalEvent.persisted){window.location.reload();}});};jQuery.preloadImages=function(){for(var i=0;i<arguments.length;i++){$("<img />").attr("src",arguments[i]);}};var triggerWindowResize=function(){$(window).trigger("resize");};if(typeof(orientationEvent)==undefined){var orientationEvent=0;}
$(window).on(orientationEvent,triggerWindowResize).on("load",triggerWindowResize);})(jQuery);


//
// jwlib-rwflexnav
//

;(function($){"use strict";var version='20140730.1100',debug=function(msg,obj){if(window.debug===true&&window.console&&console.log){console.log('[rwflexnav] '+msg);if(obj)console.log(obj);}};$.fn.divideNav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});var container=$(this);$('> li.'+opts.className.divider,container).remove();var items=$('> li',container);$('<li>').addClass(opts.className.divider).insertBefore(items);$('<li>').addClass(opts.className.divider).insertAfter(items.last());return $(container);};$.fn.hackRWFlexNav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});var container=$(this);$('> ul.'+opts.className.menu,container).first().removeClass(opts.className.dropdown).find('ul').removeClass(opts.className.menu);$('> ul.'+opts.className.menu,container).find('li').each(function(){if($(this).find('ul').length===0)$(this).removeClass(opts.className.hasDropdown);});return $(container);};$.fn.processRWFlexNav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});var container=$(this);$('li a header',container).parent().attr('href','javascript:void(0)').parent().addClass(opts.className.heading);$('li a label',container).unwrap();$('li a button',container).each(function(){var classes=$(this).attr('class');var text=$(this).text();$(this).parent().addClass(opts.className.button).addClass(classes).html(text).parent().addClass(opts.className.hasButton);});$('li a hr',container).unwrap().parent().addClass(opts.className.divider).html('');return $(container);};$.fn.rwflexnav=function(options){var opts=$.extend(true,{},$.fn.rwflexnav.defaults,options||{});return this.each(function(){if($('> ul.'+opts.className.menu,this).length===0){console.error('RWFlexNav Aborting! Unable to locate menu with class "'+opts.className.menu+'"');return false;}
var method=$.fn.rwflexnav[opts.scope],container=typeof method==='function'?method(opts,this):false;if(opts.hackNav)container.hackRWFlexNav(opts);container.processRWFlexNav(opts);if(opts.divide)$('> ul.'+opts.className.menu,container).divideNav(opts);debug('Processing Complete',container);return $(container);});};$.fn.rwflexnav.all=function(opts,container){return $(container);};$.fn.rwflexnav.top=function(opts,container){$('> ul.'+opts.className.menu,container).find('ul').remove();return $(container);};$.fn.rwflexnav.subnav=function(opts,container){var menu=$('> ul.'+opts.className.menu,container).first(),submenu=$('> ul.'+opts.className.menu+'> li:nth-child('+opts.subNavIndex+') > ul',container),classes=menu.attr('class');debug('Scope SubNav',submenu);if(submenu.length===0){console.error('RWFlexNav Error! No subnav found at index '+opts.subNavIndex);}
else{submenu.addClass(opts.className.menu).addClass(classes).insertAfter(menu);submenu.find('>li.js-generated').remove();menu.remove();}
return $(container);};$.fn.rwflexnav.active=function(opts,container){var menu=$('> ul.'+opts.className.menu,container).first(),submenu=$('> ul.'+opts.className.menu+' > li.'+opts.className.active+' > ul',container),classes=menu.attr('class');debug('Scope Active',submenu);if(submenu.length===0){console.error('RWFlexNav Error! No active subnav found with class "'+opts.className.active+'"');}
else{submenu.addClass(opts.className.menu).addClass(classes).insertAfter(menu);submenu.find('>li.js-generated').remove();menu.remove();}
return $(container);};$.fn.rwflexnav.defaults={scope:'all',hackNav:true,divide:false,subNavIndex:0,className:{menu:'menu',heading:'heading',divider:'divider',active:'active',dropdown:'dropdown',button:'button',hasButton:'has-form',hasDropdown:'has-dropdown'}};})(jQuery);


/*! jQuery Migrate v1.2.1 | (c) 2005, 2013 jQuery Foundation, Inc. and other contributors | jquery.org/license */
jQuery.migrateMute===void 0&&(jQuery.migrateMute=!0),function(e,t,n){function r(n){var r=t.console;i[n]||(i[n]=!0,e.migrateWarnings.push(n),r&&r.warn&&!e.migrateMute&&(r.warn("JQMIGRATE: "+n),e.migrateTrace&&r.trace&&r.trace()))}function a(t,a,i,o){if(Object.defineProperty)try{return Object.defineProperty(t,a,{configurable:!0,enumerable:!0,get:function(){return r(o),i},set:function(e){r(o),i=e}}),n}catch(s){}e._definePropertyBroken=!0,t[a]=i}var i={};e.migrateWarnings=[],!e.migrateMute&&t.console&&t.console.log&&t.console.log("JQMIGRATE: Logging is active"),e.migrateTrace===n&&(e.migrateTrace=!0),e.migrateReset=function(){i={},e.migrateWarnings.length=0},"BackCompat"===document.compatMode&&r("jQuery is not compatible with Quirks Mode");var o=e("<input/>",{size:1}).attr("size")&&e.attrFn,s=e.attr,u=e.attrHooks.value&&e.attrHooks.value.get||function(){return null},c=e.attrHooks.value&&e.attrHooks.value.set||function(){return n},l=/^(?:input|button)$/i,d=/^[238]$/,p=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,f=/^(?:checked|selected)$/i;a(e,"attrFn",o||{},"jQuery.attrFn is deprecated"),e.attr=function(t,a,i,u){var c=a.toLowerCase(),g=t&&t.nodeType;return u&&(4>s.length&&r("jQuery.fn.attr( props, pass ) is deprecated"),t&&!d.test(g)&&(o?a in o:e.isFunction(e.fn[a])))?e(t)[a](i):("type"===a&&i!==n&&l.test(t.nodeName)&&t.parentNode&&r("Can't change the 'type' of an input or button in IE 6/7/8"),!e.attrHooks[c]&&p.test(c)&&(e.attrHooks[c]={get:function(t,r){var a,i=e.prop(t,r);return i===!0||"boolean"!=typeof i&&(a=t.getAttributeNode(r))&&a.nodeValue!==!1?r.toLowerCase():n},set:function(t,n,r){var a;return n===!1?e.removeAttr(t,r):(a=e.propFix[r]||r,a in t&&(t[a]=!0),t.setAttribute(r,r.toLowerCase())),r}},f.test(c)&&r("jQuery.fn.attr('"+c+"') may use property instead of attribute")),s.call(e,t,a,i))},e.attrHooks.value={get:function(e,t){var n=(e.nodeName||"").toLowerCase();return"button"===n?u.apply(this,arguments):("input"!==n&&"option"!==n&&r("jQuery.fn.attr('value') no longer gets properties"),t in e?e.value:null)},set:function(e,t){var a=(e.nodeName||"").toLowerCase();return"button"===a?c.apply(this,arguments):("input"!==a&&"option"!==a&&r("jQuery.fn.attr('value', val) no longer sets properties"),e.value=t,n)}};var g,h,v=e.fn.init,m=e.parseJSON,y=/^([^<]*)(<[\w\W]+>)([^>]*)$/;e.fn.init=function(t,n,a){var i;return t&&"string"==typeof t&&!e.isPlainObject(n)&&(i=y.exec(e.trim(t)))&&i[0]&&("<"!==t.charAt(0)&&r("$(html) HTML strings must start with '<' character"),i[3]&&r("$(html) HTML text after last tag is ignored"),"#"===i[0].charAt(0)&&(r("HTML string cannot start with a '#' character"),e.error("JQMIGRATE: Invalid selector string (XSS)")),n&&n.context&&(n=n.context),e.parseHTML)?v.call(this,e.parseHTML(i[2],n,!0),n,a):v.apply(this,arguments)},e.fn.init.prototype=e.fn,e.parseJSON=function(e){return e||null===e?m.apply(this,arguments):(r("jQuery.parseJSON requires a valid JSON string"),null)},e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||0>e.indexOf("compatible")&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0"}},e.browser||(g=e.uaMatch(navigator.userAgent),h={},g.browser&&(h[g.browser]=!0,h.version=g.version),h.chrome?h.webkit=!0:h.webkit&&(h.safari=!0),e.browser=h),a(e,"browser",e.browser,"jQuery.browser is deprecated"),e.sub=function(){function t(e,n){return new t.fn.init(e,n)}e.extend(!0,t,this),t.superclass=this,t.fn=t.prototype=this(),t.fn.constructor=t,t.sub=this.sub,t.fn.init=function(r,a){return a&&a instanceof e&&!(a instanceof t)&&(a=t(a)),e.fn.init.call(this,r,a,n)},t.fn.init.prototype=t.fn;var n=t(document);return r("jQuery.sub() is deprecated"),t},e.ajaxSetup({converters:{"text json":e.parseJSON}});var b=e.fn.data;e.fn.data=function(t){var a,i,o=this[0];return!o||"events"!==t||1!==arguments.length||(a=e.data(o,t),i=e._data(o,t),a!==n&&a!==i||i===n)?b.apply(this,arguments):(r("Use of jQuery.fn.data('events') is deprecated"),i)};var j=/\/(java|ecma)script/i,w=e.fn.andSelf||e.fn.addBack;e.fn.andSelf=function(){return r("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"),w.apply(this,arguments)},e.clean||(e.clean=function(t,a,i,o){a=a||document,a=!a.nodeType&&a[0]||a,a=a.ownerDocument||a,r("jQuery.clean() is deprecated");var s,u,c,l,d=[];if(e.merge(d,e.buildFragment(t,a).childNodes),i)for(c=function(e){return!e.type||j.test(e.type)?o?o.push(e.parentNode?e.parentNode.removeChild(e):e):i.appendChild(e):n},s=0;null!=(u=d[s]);s++)e.nodeName(u,"script")&&c(u)||(i.appendChild(u),u.getElementsByTagName!==n&&(l=e.grep(e.merge([],u.getElementsByTagName("script")),c),d.splice.apply(d,[s+1,0].concat(l)),s+=l.length));return d});var Q=e.event.add,x=e.event.remove,k=e.event.trigger,N=e.fn.toggle,T=e.fn.live,M=e.fn.die,S="ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",C=RegExp("\\b(?:"+S+")\\b"),H=/(?:^|\s)hover(\.\S+|)\b/,A=function(t){return"string"!=typeof t||e.event.special.hover?t:(H.test(t)&&r("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"),t&&t.replace(H,"mouseenter$1 mouseleave$1"))};e.event.props&&"attrChange"!==e.event.props[0]&&e.event.props.unshift("attrChange","attrName","relatedNode","srcElement"),e.event.dispatch&&a(e.event,"handle",e.event.dispatch,"jQuery.event.handle is undocumented and deprecated"),e.event.add=function(e,t,n,a,i){e!==document&&C.test(t)&&r("AJAX events should be attached to document: "+t),Q.call(this,e,A(t||""),n,a,i)},e.event.remove=function(e,t,n,r,a){x.call(this,e,A(t)||"",n,r,a)},e.fn.error=function(){var e=Array.prototype.slice.call(arguments,0);return r("jQuery.fn.error() is deprecated"),e.splice(0,0,"error"),arguments.length?this.bind.apply(this,e):(this.triggerHandler.apply(this,e),this)},e.fn.toggle=function(t,n){if(!e.isFunction(t)||!e.isFunction(n))return N.apply(this,arguments);r("jQuery.fn.toggle(handler, handler...) is deprecated");var a=arguments,i=t.guid||e.guid++,o=0,s=function(n){var r=(e._data(this,"lastToggle"+t.guid)||0)%o;return e._data(this,"lastToggle"+t.guid,r+1),n.preventDefault(),a[r].apply(this,arguments)||!1};for(s.guid=i;a.length>o;)a[o++].guid=i;return this.click(s)},e.fn.live=function(t,n,a){return r("jQuery.fn.live() is deprecated"),T?T.apply(this,arguments):(e(this.context).on(t,this.selector,n,a),this)},e.fn.die=function(t,n){return r("jQuery.fn.die() is deprecated"),M?M.apply(this,arguments):(e(this.context).off(t,this.selector||"**",n),this)},e.event.trigger=function(e,t,n,a){return n||C.test(e)||r("Global events are undocumented and deprecated"),k.call(this,e,t,n||document,a)},e.each(S.split("|"),function(t,n){e.event.special[n]={setup:function(){var t=this;return t!==document&&(e.event.add(document,n+"."+e.guid,function(){e.event.trigger(n,null,t,!0)}),e._data(this,n,e.guid++)),!1},teardown:function(){return this!==document&&e.event.remove(document,n+"."+e._data(this,n)),!1}}})}(jQuery,window);
var stacks = {};


stacks.jQuery = jQuery.noConflict(true);


stacks.stacks_in_p47_n1_page8 = {};

stacks.stacks_in_p47_n1_page8 = (function(stack) {

    var jQuery = stacks.jQuery;
    var $ = jQuery;


document.documentElement.lang='en';stacks.fInit=function(stack){return stack;}
window.wowjsmobile=true;window.revealAnimation='fadeAndPop';window.revealNoScroll=false;$(document).on('opened.fndtn.reveal','[data-reveal]',function(){$(window).trigger('resize')});$(document).ready(function(){if($.isMobile()){$('.show-for-touch').fadeIn('fast');$("a[data-dropdown],a.menu-icon,a.touchfix").on('touchend',function(){$(this).trigger('click')});}});var useCustomSelector='False',stacksTrue='True',headerFamily='Open Sans'==='custom'?'':"Open Sans",headerFamilyFallback='sans-serif',headerSelector='h1'+',.font-family-h1',headerStyle='normal',headerGoogle=headerFamily==='Open Sans'?stacksTrue:'Open Sans'==='custom'?'False':'false',headerWeight=headerStyle==='italic'?'300italic':'300',headerWeight=headerWeight+',400'.replace(/\s/g,''),header2Family='Open Sans'==='custom'?'':'Open Sans',header2FamilyFallback='sans-serif',header2Selector='h2, h3, h4, h5, h6'+',.font-family-h2',header2Style='normal',header2Google=header2Family==='Open Sans'?stacksTrue:'Open Sans'==='custom'?'False':'false',header2Weight=header2Style==='italic'?'400italic':'400',header2Weight=header2Weight+',400'.replace(/\s/g,''),fontFamily='\'Helvetica Neue\', Helvetica, Arial, sans-serif'==='custom'?'':'\'Helvetica Neue\', Helvetica, Arial, sans-serif',fontFamilyFallback='sans-serif',fontSelector='p'+',.font-family-text',fontGoogle=fontFamily==='Open Sans'?stacksTrue:'\'Helvetica Neue\', Helvetica, Arial, sans-serif'==='custom'?'False':'false',fontWeight='400,400'.replace(/\s/g,''),getGoogleUrls=function(fontStore){var googleFonts=[];for(var family in fontStore){var weights=fontStore[family].join().replace(/,,/g,',').replace(/,$/,'');googleFonts.push('https://fonts.googleapis.com/css?family='+family+':'+weights);}
return googleFonts;},isGFont=function(family,google){if(google===stacksTrue)return family;return false;},getGoogleFonts=function(data){var fonts=data.fonts,weights=data.weights,google=data.google,fontStore=new Object();for(var i=0;i<fonts.length;i++){if(isGFont(fonts[i],google[i])===false)continue;(fontStore[fonts[i]]=fontStore[fonts[i]]||[]).push(weights[i]);}
return getGoogleUrls(fontStore);};headerFamily=$.trim(headerFamily);header2Family=$.trim(header2Family);fontFamily=$.trim(fontFamily);var cssFontFiles=getGoogleFonts({fonts:[headerFamily,header2Family,fontFamily],weights:[headerWeight,header2Weight,fontWeight],google:[headerGoogle,header2Google,fontGoogle]});for(var i=0;i<cssFontFiles.length;i++){loadCSS(decodeURIComponent(cssFontFiles[i]));}
if(useCustomSelector===stacksTrue){fontFamily='"'+fontFamily+'"';headerFamily='"'+headerFamily+'"';header2Family='"'+header2Family+'"';var customFontStyles={'font-family':[fontFamily,fontFamilyFallback].join()+'!important','font-weight':fontWeight.split(',')[0]+'!important'},customHeaderSyles={'font-family':[headerFamily,headerFamilyFallback].join()+'!important','font-weight':headerWeight.split(',')[0]+'!important','font-style':headerStyle+'!important'},customHeader2Syles={'font-family':[header2Family,header2FamilyFallback].join()+'!important','font-weight':header2Weight.split(',')[0]+'!important','font-style':header2Style+'!important'};if(fontFamily!=='fontpro'){$.debug('Custom Font Selectors:'+fontSelector,customFontStyles);vein.inject(fontSelector,customFontStyles);}
if(headerFamily!=='fontpro'){$.debug('Custom Header Selectors:'+headerSelector,customHeaderSyles);vein.inject(headerSelector,customHeaderSyles);}
if(header2Family!=='fontpro'){$.debug('Custom Header2 Selectors:'+header2Selector,customHeader2Syles);vein.inject(header2Selector,customHeader2Syles);}}

    return stack;
})(stacks.stacks_in_p47_n1_page8);



stacks.stacks_in_p47_n3_page8 = {};

stacks.stacks_in_p47_n3_page8 = (function(stack) {

    var jQuery = stacks.jQuery;
    var $ = jQuery;

 var subNavIndex=1,divide=1,zoneDivider=0,fullWidthMenu='full-width',scope='all',style='solid',menuAlign='right',styleActive=''==='styleActive'?true:false,rwmenu='rw'==='rw'?true:false,magellan='rw'==='magellan'?true:false,dropdowns='#stacks_in_p47_n3_page8 ul:not(.title-area) li.has-dropdown';$(document).ready(function(){var stack=$('#stacks_in_p47_n3_page8');stack.parent().css({overflow:'visible'});$('.top-bar-section:not(.menu-magellan):not(.menu-none)',stack).rwflexnav({scope:scope,subNavIndex:subNavIndex,divide:divide});if(magellan){if(divide)$('ul.magellanList',stack).divideNav();$('.magellanList li',stack).each(function(){var id=$(this).data('magellan-arrival');$('a',this).attr('href','#'+id);});}
if($('ul.zone',stack).exists()){if(zoneDivider)$('ul.zone',stack).divideNav();}
if($('.zone-align-left ul.zone',stack).exists()||!$('ul.zone',stack).exists()){$('ul.menu',stack).addClass(menuAlign);}
if(fullWidthMenu==='full-width'&&menuAlign==='centered'){var calcMenuItemWidth=function(){var items=$('.menu-align-centered ul.menu > li:not(.divider)',stack),dividers=$('.menu-align-centered ul.menu > li.divider',stack);if($('.top-bar .toggle-topbar',stack).is(':visible')){items.removeAttr('style');}
else{var count=items.length;if(count>0){var width=dividers.length>0?100/count-0.2:100/count;items.width(width+"%");}}};calcMenuItemWidth();$(window).on('resize',calcMenuItemWidth);}
$(dropdowns).attr('aria-haspopup','true');$(dropdowns).hover(function(){$('> a:not(.button)',this).addClass('hovered');},function(){$('> a:not(.button)',this).removeClass('hovered');});});$(window).load(function(){var stack=$('#stacks_in_p47_n3_page8');if('40.063em'==='62.563em'){$('.parent-link.hide-for-medium-up',stack).removeClass('hide-for-medium-up').addClass('hide-for-large-up');}
else if('40.063em'==='9999px'){$('.parent-link.hide-for-medium-up',stack).removeClass('hide-for-medium-up');}});

    return stack;
})(stacks.stacks_in_p47_n3_page8);



stacks.stacks_in_230_page8 = {};

stacks.stacks_in_230_page8 = (function(stack) {

    var jQuery = stacks.jQuery;
    var $ = jQuery;

// Single Page Nav

if(typeof Object.create!=="function"){Object.create=function(e){function t(){}t.prototype=e;return new t}}(function(e,t,n,r){"use strict";var i={init:function(n,r){this.options=e.extend({},e.fn.singlePageNav.defaults,n);this.container=r;this.$container=e(r);this.$links=this.$container.find("a");if(this.options.filter!==""){this.$links=this.$links.filter(this.options.filter)}this.$window=e(t);this.$htmlbody=e("html, body");this.$links.on("click.singlePageNav",e.proxy(this.handleClick,this));this.didScroll=false;this.checkPosition();this.setTimer()},handleClick:function(t){var n=this,r=t.currentTarget,i=e(r.hash);t.preventDefault();if(i.length){n.clearTimer();if(typeof n.options.beforeStart==="function"){n.options.beforeStart()}n.setActiveLink(r.hash);n.scrollTo(i,function(){if(n.options.updateHash&&history.pushState){history.pushState(null,null,r.hash)}n.setTimer();if(typeof n.options.onComplete==="function"){n.options.onComplete()}})}},scrollTo:function(e,t){var n=this;var r=n.getCoords(e).top;var i=false;n.$htmlbody.stop().animate({scrollTop:r},{duration:n.options.speed,easing:n.options.easing,complete:function(){if(typeof t==="function"&&!i){t()}i=true}})},setTimer:function(){var e=this;e.$window.on("scroll.singlePageNav",function(){e.didScroll=true});e.timer=setInterval(function(){if(e.didScroll){e.didScroll=false;e.checkPosition()}},250)},clearTimer:function(){clearInterval(this.timer);this.$window.off("scroll.singlePageNav");this.didScroll=false},checkPosition:function(){var e=this.$window.scrollTop();var t=this.getCurrentSection(e);this.setActiveLink(t)},getCoords:function(e){return{top:Math.round(e.offset().top)-this.options.offset}},setActiveLink:function(e){var t=this.$container.find("a[href$='"+e+"']");if(!t.hasClass(this.options.currentClass)){this.$links.removeClass(this.options.currentClass);t.addClass(this.options.currentClass)}},getCurrentSection:function(t){var n,r,i,s;for(n=0;n<this.$links.length;n++){r=this.$links[n].hash;if(e(r).length){i=this.getCoords(e(r));if(t>=i.top-this.options.threshold){s=r}}}return s||this.$links[0].hash}};e.fn.singlePageNav=function(e){return this.each(function(){var t=Object.create(i);t.init(e,this)})};e.fn.singlePageNav.defaults={offset:0,threshold:120,speed:400,currentClass:"current",easing:"swing",updateHash:false,filter:"",onComplete:false,beforeStart:false}})(jQuery,window,document);

// Easing

jQuery.easing["jswing"]=jQuery.easing["swing"];jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b+c;return-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b+c;return d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b+c;return-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){if((b/=e/2)<1)return d/2*b*b*b*b*b+c;return d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){if(b==0)return c;if(b==e)return c+d;if((b/=e/2)<1)return d/2*Math.pow(2,10*(b-1))+c;return d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){if((b/=e/2)<1)return-d/2*(Math.sqrt(1-b*b)-1)+c;return d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e)==1)return c+d;if(!g)g=e*.3;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158;var g=0;var h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;if(!g)g=e*.3*1.5;if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);if(b<1)return-.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c;return h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;return d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){if(f==undefined)f=1.70158;if((b/=e/2)<1)return d/2*b*b*(((f*=1.525)+1)*b-f)+c;return d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){if((b/=e)<1/2.75){return d*7.5625*b*b+c}else if(b<2/2.75){return d*(7.5625*(b-=1.5/2.75)*b+.75)+c}else if(b<2.5/2.75){return d*(7.5625*(b-=2.25/2.75)*b+.9375)+c}else{return d*(7.5625*(b-=2.625/2.75)*b+.984375)+c}},easeInOutBounce:function(a,b,c,d,e){if(b<e/2)return jQuery.easing.easeInBounce(a,b*2,0,d,e)*.5+c;return jQuery.easing.easeOutBounce(a,b*2-e,0,d,e)*.5+d*.5+c}});

(function ($) {
    "use strict";
    $.fn.pin = function (options) {
        var scrollY = 0, elements = [], disabled = false, $window = $(window);

        options = options || {};

        var recalculateLimits = function () {
            for (var i=0, len=elements.length; i<len; i++) {
                var $this = elements[i];

                if (options.minWidth && $window.width() <= options.minWidth) {
                    if ($this.parent().is(".pin-wrapper")) { $this.unwrap(); }
                    $this.css({width: "", left: "", top: "", position: ""});
                    if (options.activeClass) { $this.removeClass(options.activeClass); }
                    disabled = true;
                    continue;
                } else {
                    disabled = false;
                }

                var $container = options.containerSelector ? $this.closest(options.containerSelector) : $(document.body);
                var offset = $this.offset();
                var containerOffset = $container.offset();
                var parentOffset = $this.offsetParent().offset();

                if (!$this.parent().is(".pin-wrapper")) {
                    $this.wrap("<div class='pin-wrapper'>");
                }

                var pad = $.extend({
                  top: 0,
                  bottom: 0
                }, options.padding || {});

                $this.data("pin", {
                    pad: pad,
                    from: (options.containerSelector ? containerOffset.top : offset.top) - pad.top,
                    to: containerOffset.top + $container.height() - $this.outerHeight() - pad.bottom,
                    end: containerOffset.top + $container.height(),
                    parentTop: parentOffset.top
                });

                $this.css({width: $this.outerWidth()});
                $this.parent().css("height", $this.outerHeight());
            }
        };

        var onScroll = function () {
            if (disabled) { return; }

            scrollY = $window.scrollTop();

            var elmts = [];
            for (var i=0, len=elements.length; i<len; i++) {          
                var $this = $(elements[i]),
                    data  = $this.data("pin");

                if (!data) { // Removed element
                  continue;
                }

                elmts.push($this); 
                  
                var from = data.from - data.pad.bottom,
                    to = data.to - data.pad.top;
              
                if (from + $this.outerHeight() > data.end) {
                    $this.css('position', '');
                    continue;
                }
              
                if (from < scrollY && to > scrollY) {
                    !($this.css("position") == "fixed") && $this.css({
                        left: $this.offset().left,
                        top: data.pad.top
                    }).css("position", "fixed").addClass('pinned');
                    if (options.activeClass) { $this.addClass(options.activeClass); }
                } else if (scrollY >= to) {
                    $this.css({
                        left: "",
                        top: to - data.parentTop + data.pad.top
                    }).css("position", "absolute").removeClass('pinned');
                    if (options.activeClass) { $this.addClass(options.activeClass); }
                } else {
                    $this.css({position: "", top: "", left: ""}).removeClass('pinned');
                    if (options.activeClass) { $this.removeClass(options.activeClass); }
                }
          }
          elements = elmts;
        };

        var update = function () { recalculateLimits(); onScroll(); setTimeout(function(){ recalculateLimits(); }, 3000);};

        this.each(function () {
            var $this = $(this), 
                data  = $(this).data('pin') || {};

            if (data && data.update) { return; }
            elements.push($this);
            $("img", this).one("load", recalculateLimits);
            data.update = update;
            $(this).data('pin', data);
        });

        $window.scroll(onScroll);
        $window.resize(function () { recalculateLimits(); });
        recalculateLimits();
        $window.load(update);

        return this;
      };
})(jQuery);


$(function() {

  // Mate sections to navigation

  var tn = 0;
  var ts = 0;
  var rNav = $("#rails-nav");
  var rItems = rNav.find('a');
  var rSections = $("#rails-sections").find(".ts-box");

  rItems.each(function(){
    $(this).not('.external').attr('href',"#ts"+tn++);
  });
  
  rSections.each(function(){
    $(this).attr('id',"ts"+ts++);
  });

  // Create rails.

  rNav.pin({containerSelector: "#rails-wrapper",minWidth: 700}).singlePageNav({
      filter: ':not(.external)',
      offset: 80,
      updateHash: false,
      speed: 1000,
      easing: 'easeInOutQuint',
      threshold: 50
  });
});


    return stack;
})(stacks.stacks_in_230_page8);


