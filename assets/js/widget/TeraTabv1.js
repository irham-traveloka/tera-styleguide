var TeraTabv1 = function(element) {
	this._tab = element;

	this.SELECTOR = {
		nav : 'data-tabv1-nav',
		trigger : 'data-tabv1-trigger',
		highlighter : 'data-tabv1-highlighter',
		window : 'data-tabv1-window',
		slider : 'data-tabv1-slider',
		pane : 'data-tabv1-pane',
	};

	this._init();
}

TeraTabv1.prototype._init = function () {
	var self = this;

	self.tab = this._tab;
	self.id = self.tab.getAttribute('data-tabv1');
	self.nav = self.tab.querySelector(':scope > [' + self.SELECTOR.nav + ']');
	self.window = self.tab.querySelector(':scope > [' + self.SELECTOR.window + ']');
	self.trigger = self.nav.querySelectorAll(':scope > [' + self.SELECTOR.trigger + ']');
	self.highlighter = self.nav.querySelector(':scope > [' + self.SELECTOR.highlighter + ']');
	self.slider = self.window.querySelector(':scope > [' + self.SELECTOR.slider + ']');
	self.pane = self.slider.querySelectorAll(':scope > [' + self.SELECTOR.pane + ']');

	self.tabIndex = 0;

	self._setActivePane();
	self._setActiveWindow();
	self._setActiveTrigger();
	if (self.highlighter) {
		self._setActiveHighlighter();
	}

	self._initEvent();
}

TeraTabv1.prototype._initEvent = function () {
	var self = this;

	[].slice.call( self.trigger ).forEach( function( el, i ) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
			self._update(el, i);
		});
	});
}

TeraTabv1.prototype._update = function (el, i) {
	var self = this;

	// Do nothing if active trigger being clicked
	if ( !el.classList.contains('is-active')) {
		self.tabIndex = i;

		self._setActivePane();
		self._setActiveWindow();
		self._setActiveTrigger();
		if (self.highlighter) {
			self._setActiveHighlighter();
		}
	}
}

TeraTabv1.prototype._setActiveTrigger = function () {
	var self = this;

	// set is-active class
	[].slice.call( self.trigger ).forEach( function( el, i ) {
		el.classList.remove('is-active');
	});

	self.trigger[self.tabIndex].classList.add('is-active');
}

TeraTabv1.prototype._setActiveWindow = function () {
	var self = this;

}

TeraTabv1.prototype._setActivePane = function () {
	var self = this;

	// set pane initial height
	// set is-active class
	[].slice.call( self.pane ).forEach( function( el, i ) {
		el.classList.remove('is-active');
		el.style.display = 'none';
	});

	self.pane[self.tabIndex].style.display = 'block';
	setInterval(function(){
		self.pane[self.tabIndex].classList.add('is-active');
	}, 0);
}

TeraTabv1.prototype._setActiveHighlighter = function () {
	var self = this;

	// set highlighter width
	self.highlighter.style.width = self.trigger[self.tabIndex].offsetWidth + 'px';

	// set highlighter position
	self._translateX(self.highlighter, self.trigger[self.tabIndex].offsetLeft);
}

TeraTabv1.prototype._isPropertySupported = function (property) {
	var self = this;

	return property in document.body.style;
}

TeraTabv1.prototype._translateX = function (el, translateProp) {
	var self = this;

	if (self._isPropertySupported("MozTransform")) {
		return el.style.MozTransform = "translateX(" + translateProp + "px)";
	}
	if (self._isPropertySupported("webkitTransform")) {
		return el.style.webkitTransform = "translateX(" + translateProp + "px)";
	}
}


/*
	Invoke the obj instance
*/

// var TeraTabv1Invoker = (function(){
// 	[].slice.call( document.querySelectorAll('[data-tabv1]')).forEach( function( el, i ) {
// 		var tabs = new TeraTabv1(el);
// 	});
// })();