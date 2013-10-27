(function() {
	console.log("test self");
})();

var a = 1;
var b = 2;

(function(var1, var2) {
	console.log(var1 + var2);
})(a, b);


function highlightElements(a) {
	highlightedElementsSelector && unhighlightElements();
	var b = document.querySelectorAll(a);
	highlightedElementsSelector = a, highlightedElementsBoxShadows = new Array, highlightedElementsBGColors = new Array;
	for (var c = 0; c < b.length; c++) highlightedElementsBoxShadows[c] = b[c].style.getPropertyValue("-webkit-box-shadow"), highlightedElementsBGColors[c] = b[c].style.backgroundColor, b[c].style.setProperty("-webkit-box-shadow", "inset 0px 0px 5px #fd6738"), b[c].style.backgroundColor = "#f6e1e5"
}

function unhighlightElements() {
	if (null != highlightedElementsSelector) {
		for (var a = document.querySelectorAll(highlightedElementsSelector), b = 0; b < a.length; b++) a[b].style.setProperty("-webkit-box-shadow", highlightedElementsBoxShadows[b]), a[b].style.backgroundColor = highlightedElementsBGColors[b];
		highlightedElementsSelector = null
	}
}

function getAbsolutePosition(a) {
	for (var b = 0, c = 0; a; a = a.offsetParent) b += a.offsetLeft, c += a.offsetTop;
	return [b, c]
}

function addElementOverlay(a) {
	if (!a) return null;
	var b = getElementURL(a);
	if (a.className || a.id || b) {
		var c = getComputedStyle(a, null),
			d = document.createElement("div");
		d.prisoner = a, d.prisonerURL = b, d.className = "__adblockplus__overlay", d.setAttribute("style", "opacity:0.4; background-color:#ffffff; display:inline-box; width:" + c.width + "; height:" + c.height + "; position:absolute; overflow:hidden; -webkit-box-sizing:border-box; z-index: 99999");
		var e = getAbsolutePosition(a);
		return d.style.left = e[0] + "px", d.style.top = e[1] + "px", document.body.appendChild(d), d
	}
}

function clickHide_showDialog(a, b, c) {
	if (clickHide_activated || clickHideFiltersDialog) {
		var d = currentElement.prisoner ? currentElement.prisoner : currentElement;
		clickHide_deactivate(), currentElement = d
	}
	clickHide_filters = c, clickHideFiltersDialog = document.createElement("iframe"), clickHideFiltersDialog.src = chrome.extension.getURL("block.html"), clickHideFiltersDialog.setAttribute("style", "position: fixed !important; visibility: hidden; display: block !important; border: 0px !important;"), clickHideFiltersDialog.style.WebkitBoxShadow = "5px 5px 20px rgba(0,0,0,0.5)", clickHideFiltersDialog.style.zIndex = 99999, clickHideFiltersDialog.style.left = "50px", clickHideFiltersDialog.style.top = "50px", clickHideFiltersDialog.onmouseout = function() {
		clickHideFiltersDialog && clickHideFiltersDialog.style.setProperty("opacity", "0.7")
	}, clickHideFiltersDialog.onmouseover = function() {
		clickHideFiltersDialog && clickHideFiltersDialog.style.setProperty("opacity", "1.0")
	}, document.body.appendChild(clickHideFiltersDialog)
}

function clickHide_activate() {
	if (null != document) {
		(clickHide_activated || clickHideFiltersDialog) && clickHide_deactivate();
		for (var a = document.querySelectorAll("object,embed,img,iframe"), b = 0; b < a.length; b++) addElementOverlay(a[b]);
		clickHide_activated = !0, document.addEventListener("mouseover", clickHide_mouseOver, !1), document.addEventListener("mouseout", clickHide_mouseOut, !1), document.addEventListener("click", clickHide_mouseClick, !1), document.addEventListener("keyup", clickHide_keyUp, !1)
	}
}

function clickHide_rulesPending() {
	clickHide_activated = !1, document.removeEventListener("mouseover", clickHide_mouseOver, !1), document.removeEventListener("mouseout", clickHide_mouseOut, !1), document.removeEventListener("click", clickHide_mouseClick, !1), document.removeEventListener("keyup", clickHide_keyUp, !1)
}

function clickHide_deactivate() {
	if (clickHideFiltersDialog && (document.body.removeChild(clickHideFiltersDialog), clickHideFiltersDialog = null), currentElement && (currentElement.removeEventListener("contextmenu", clickHide_elementClickHandler, !1), unhighlightElements(), currentElement.style.setProperty("-webkit-box-shadow", currentElement_boxShadow), currentElement.style.backgroundColor = currentElement_backgroundColor, currentElement = null, clickHideFilters = null), unhighlightElements(), clickHide_activated = !1, clickHide_filters = null, document) {
		document.removeEventListener("mouseover", clickHide_mouseOver, !1), document.removeEventListener("mouseout", clickHide_mouseOut, !1), document.removeEventListener("click", clickHide_mouseClick, !1), document.removeEventListener("keyup", clickHide_keyUp, !1);
		for (var a; a = document.querySelector(".__adblockplus__overlay");) a.parentNode.removeChild(a)
	}
}

function clickHide_elementClickHandler(a) {
	a.preventDefault(), a.stopPropagation(), clickHide_mouseClick(a)
}

function clickHide_mouseOver(a) {
	0 != clickHide_activated && (a.target.id || a.target.className || a.target.src) && (currentElement = a.target, currentElement_boxShadow = a.target.style.getPropertyValue("-webkit-box-shadow"), currentElement_backgroundColor = a.target.style.backgroundColor, a.target.style.setProperty("-webkit-box-shadow", "inset 0px 0px 5px #d6d84b"), a.target.style.backgroundColor = "#f8fa47", a.target.addEventListener("contextmenu", clickHide_elementClickHandler, !1))
}

function clickHide_mouseOut() {
	clickHide_activated && currentElement && (currentElement.style.setProperty("-webkit-box-shadow", currentElement_boxShadow), currentElement.style.backgroundColor = currentElement_backgroundColor, currentElement.removeEventListener("contextmenu", clickHide_elementClickHandler, !1))
}

function clickHide_keyUp(a) {
	a.ctrlKey && a.shiftKey && 69 == a.keyCode && clickHide_mouseClick(a)
}

function clickHide_mouseClick(a) {
	if (currentElement && clickHide_activated) {
		var b = currentElement,
			c = null;
		currentElement.className && "__adblockplus__overlay" == currentElement.className ? (b = currentElement.prisoner, c = currentElement.prisonerURL) : b.src && (c = b.src), c && (c = normalizeURL(relativeToAbsoluteUrl(c)));
		var d = b.id ? b.id.split(" ").join("") : null,
			e = null;
		if (b.className && (e = b.className.replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ")), clickHideFilters = new Array, selectorList = new Array, d && (clickHideFilters.push(document.domain + "###" + d), selectorList.push("#" + d)), e)
			for (var f = 0; f < e.length; f++) clickHideFilters.push(document.domain + "##." + e[f]), selectorList.push("." + e[f]);
		c && (clickHideFilters.push(relativeToAbsoluteUrl(c)), selectorList.push(b.localName + '[src="' + c + '"]')), clickHide_showDialog(a.clientX, a.clientY, clickHideFilters), currentElement.style.setProperty("-webkit-box-shadow", currentElement_boxShadow), currentElement.style.backgroundColor = currentElement_backgroundColor, highlightElements(selectorList.join(",")), currentElement.style.setProperty("-webkit-box-shadow", "inset 0px 0px 5px #fd1708"), currentElement.style.backgroundColor = "#f6a1b5"
	}
}

function getElementURL(a) {
	var b;
	if ("OBJECT" != a.localName.toUpperCase() || (b = a.getAttribute("data"))) b || (b = a.getAttribute("src") || a.getAttribute("href"));
	else {
		var c = a.querySelectorAll('param[name="movie"]');
		c[0] ? b = c[0].getAttribute("value") : (c = a.querySelectorAll('param[name="src"]'), c[0] && (b = c[0].getAttribute("value")))
	}
	return b
}

function relativeToAbsoluteUrl(a) {
	if (!a || /^[\w\-]+:/i.test(a)) return a;
	if ("/" == a[0]) return document.location.protocol + "//" + document.location.host + a;
	var b = document.baseURI.match(/.+\//);
	return b ? b[0] + a : document.baseURI + "/" + a
}

function removeDotSegments(a) {
	var b = "",
		c = [];
	if (/\./.test(a)) {
		for (; void 0 !== a && "" !== a;) "." === a || ".." === a ? a = "" : /^\.\.\//.test(a) ? a = a.substring(3) : /^\.\//.test(a) ? a = a.substring(2) : /^\/\.(\/|$)/.test(a) ? a = "/" + a.substring(3) : /^\/\.\.(\/|$)/.test(a) ? (a = "/" + a.substring(4), b = b.replace(/\/?[^\/]+$/, "")) : (c = a.match(/^(\/?[^\/]*)(\/.*)?$/), a = c[2], b += c[1]);
		return b
	}
	return a
}

function normalizeURL(a) {
	var b = a.match(/(.+:\/\/.+?)\/(.*)/);
	if (!b) return a;
	var c = removeDotSegments(b[2]);
	return 0 == c.length ? b[1] : ("/" != c[0] && (c = "/" + c), b[1] + c)
}
var clickHide_activated = !1,
	clickHide_filters = null,
	currentElement = null,
	currentElement_boxShadow = null,
	currentElement_backgroundColor, clickHideFilters = null,
	highlightedElementsSelector = null,
	highlightedElementsBoxShadows = null,
	highlightedElementsBGColors = null,
	clickHideFiltersDialog = null,
	lastRightClickEvent = null;
document.documentElement instanceof HTMLElement && (document.addEventListener("contextmenu", function(a) {
	lastRightClickEvent = a
}, !1), document.addEventListener("click", function(a) {
	if (2 != a.button) {
		for (var b = a.target; b && !(b instanceof HTMLAnchorElement);) b = b.parentNode;
		if (b && "abp:" == b.protocol) {
			a.preventDefault(), a.stopPropagation();
			var c = b.href;
			if (/^abp:\/*subscribe\/*\?(.*)/i.test(c)) {
				for (var d = RegExp.$1.split("&"), e = null, f = null, g = 0; g < d.length; g++) {
					var h = d[g].split("=", 2);
					if (2 == h.length && /\S/.test(h[1])) switch (h[0]) {
						case "title":
							e = decodeURIComponent(h[1]);
							break;
						case "location":
							f = decodeURIComponent(h[1])
					}
				}
				f && (e || (e = f), e = e.replace(/^\s+/, "").replace(/\s+$/, ""), f = f.replace(/^\s+/, "").replace(/\s+$/, ""), /^(https?|ftp):/.test(f) && chrome.extension.sendRequest({
					reqtype: "add-subscription",
					title: e,
					url: f
				}))
			}
		}
	}
}, !0), chrome.extension.onRequest.addListener(function(a, b, c) {
	switch (a.reqtype) {
		case "get-clickhide-state":
			c({
				active: clickHide_activated
			});
			break;
		case "clickhide-activate":
			clickHide_activate();
			break;
		case "clickhide-deactivate":
			clickHide_deactivate();
			break;
		case "clickhide-new-filter":
			if (!lastRightClickEvent) return;
			var d = lastRightClickEvent.target,
				e = d.src;
			if (a.filter !== e)
				for (var f = document.querySelectorAll("[src]"), g = 0; g < f.length; g++)
					if (e = f[g].src, a.filter === e) {
						d = f[g];
						break
					}
			a.filter === e ? (clickHide_activated = !0, clickHideFilters = [a.filter], currentElement = addElementOverlay(d), clickHide_mouseClick(lastRightClickEvent)) : console.log("clickhide-new-filter: URLs don't match. Couldn't find that element.", a.filter, e, lastRightClickEvent.target.src);
			break;
		case "clickhide-init":
			clickHideFiltersDialog && (c({
				filters: clickHide_filters
			}), clickHideFiltersDialog.style.width = a.width + 5 + "px", clickHideFiltersDialog.style.height = a.height + 5 + "px", clickHideFiltersDialog.style.visibility = "visible");
			break;
		case "clickhide-move":
			clickHideFiltersDialog && (clickHideFiltersDialog.style.left = parseInt(clickHideFiltersDialog.style.left, 10) + a.x + "px", clickHideFiltersDialog.style.top = parseInt(clickHideFiltersDialog.style.top, 10) + a.y + "px");
			break;
		case "clickhide-close":
			clickHideFiltersDialog && (a.remove && currentElement && currentElement.parentNode && currentElement.parentNode.removeChild(currentElement), clickHide_deactivate());
			break;
		default:
			c({})
	}
}));