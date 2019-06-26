export default class BrowserDescision {
	constructor() {
		let  ua = navigator.userAgent.toLowerCase();
		let  ver = navigator.appVersion.toLowerCase();

		this.isMSIE = (ua.indexOf('msie') > -1) && (ua.indexOf('opera') === -1);
		this.isIE6 = this.isMSIE && (ver.indexOf('msie 6.') > -1);
		this.isIE7 = this.isMSIE && (ver.indexOf('msie 7.') > -1);
		this.isIE8 = this.isMSIE && (ver.indexOf('msie 8.') > -1);
		this.isIE9 = this.isMSIE && (ver.indexOf('msie 9.') > -1);
		this.isIE10 = this.isMSIE && (ver.indexOf('msie 10.') > -1);
		this.isIE11 = (ua.indexOf('trident/7') > -1);
		this.isIE = this.isMSIE || this.isIE11;
		this.isEdge = (ua.indexOf('edge') > -1);
		this.isChrome = (ua.indexOf('chrome') > -1) && (ua.indexOf('edge') === -1);
		this.isFirefox = (ua.indexOf('firefox') > -1);
		this.isSafari = (ua.indexOf('safari') > -1) && (ua.indexOf('chrome') === -1);
		this.isOpera = (ua.indexOf('opera') > -1);
		this.isAndroid = (ua.indexOf('android') > -1);
		this.isAndroid442 = (ua.indexOf('android 4.4.2') > -1);
	}

	init() {
		this.add();
	}

	add() {
		let classes = [];
		if(this.isIE) { classes.push('browser-ie'); }
		if(this.isIE6) { classes.push('browser-ie6'); }
		if(this.isIE7) { classes.push('browser-ie7'); }
		if(this.isIE8) { classes.push('browser-ie8'); }
		if(this.isIE9) { classes.push('browser-ie9'); }
		if(this.isIE10) { classes.push('browser-ie10'); }
		if(this.isIE11) { classes.push('browser-ie11'); }
		if(this.isEdge) { classes.push('browser-edge'); }
		if(this.isChrome) { classes.push('browser-chrome'); }
		if(this.isFirefox) { classes.push('browser-firefox'); }
		if(this.isSafari) { classes.push('browser-safari'); }
		if(this.isOpera) { classes.push('browser-opera'); }
		if(this.isAndroid) { classes.push('browser-android'); }
		if(this.isAndroid442) { classes.push('browser-android442'); }

		$('body').addClass(classes.join(' '));
	}
};

