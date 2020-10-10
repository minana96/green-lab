import * as m from "../es2015/core";
window.am4core = m;

// TODO move all of this code into a different module and then import it
function getCurrentScript() {
	if (document.currentScript) {
		return document.currentScript;

	// Internet Explorer only
	} else {
		var scripts = document.getElementsByTagName("script");
		return scripts[scripts.length - 1];
	}
}

function dirpath(x) {
	return /(.*\/)[^\/]*$/.exec(x)[1];
}

__webpack_public_path__ = dirpath(getCurrentScript().src);



//////////////////
// WEBPACK FOOTER
// ./core.js
// module id = null
// module chunks = 