var TeraDialog = function (element) {
	this._element = element;

	this.SELECTOR = {
		idDataAttr : 'data-dialog-id',
		triggerDataAttr : '[data-dialog-trigger]',
		closeDataAttr : '[data-dialog-close]',
		innerClassName : 'dialog-content',
		overlayClassName : 'dialog-overlay',
	};

	this._init();
}

TeraDialog.prototype._init = function () {
	var self = this;

	self.ID = self._element.getAttribute(self.SELECTOR.idDataAttr);
	self.CLOSE = self._element.querySelectorAll(self.SELECTOR.closeDataAttr);
	self.INNER = self._element.querySelector('.' + self.SELECTOR.innerClassName);
	self.BODY = document.getElementsByTagName('body')[0];
	self.TRIGGER = document.querySelectorAll('[data-dialog-trigger="' + self.ID + '"]')
	self.OVERLAY = document.createElement('div');
	self.OVERLAY.className = self.SELECTOR.overlayClassName;

	self._initEvent();
}

TeraDialog.prototype._initEvent = function () {
	var self = this;

	if (self.TRIGGER != null) {
		[].slice.call( self.TRIGGER ).forEach( function( el, i ) {
			el.addEventListener('click', function(ev) {
				ev.preventDefault();
				self._addDialog();
			});
		});
	};

	if (self.CLOSE != null) {
		[].slice.call( self.CLOSE ).forEach( function( el, i ) {
			el.addEventListener('click', function(ev) {
				ev.stopPropagation();
				self._removeDialog();
			});
		});
	};

	self._element.addEventListener( 'click', function( ev ) {
		ev.stopPropagation();
		self._removeDialog();
	});

	self.INNER.addEventListener( 'click', function( ev ) {
		ev.stopPropagation();
	});
}

TeraDialog.prototype._addDialog = function () {
	var self = this;

	self.BODY.appendChild(self.OVERLAY);
	self._element.classList.add('dialog--open');
	setTimeout(function(){
		self.BODY.classList.add('body-dialog--open');
	}, 10);
	self.OVERLAY.addEventListener('click', function(ev) {
		ev.preventDefault();
		self._removeDialog();
	});
}

TeraDialog.prototype._removeDialog = function () {
	var self = this;

	self.BODY.classList.remove('body-dialog--open');
	self._element.classList.remove('dialog--open');
	self._element.classList.add('dialog--close');
	setTimeout(function(){
		self._element.classList.remove('dialog--close');
		self.BODY.removeChild(self.OVERLAY);
	}, 500);

}

TeraDialog.prototype.eventCallback = function (callback) {
	var self = this;


}



/*
	Invoke the obj instance
*/

// var TeraDialogInvoker = (function(){
// 	[].slice.call( document.querySelectorAll('[data-dialog-id]')).forEach( function( el, i ) {
// 		var dialog = new TeraDialog(el);
// 	});
// })();