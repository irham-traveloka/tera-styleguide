var TeraStickyMessage = function (content, options) {
	this._content = content;

	var defaultOptions = {
			theme: 'is-normal',
			closeBehaviour: 'manual'
	};

	this._options = $.extend(defaultOptions, options);
	// this.options = options;

	this._init();
}

TeraStickyMessage.prototype._init = function () {
	var self = this;

	self.$body = $('body');
	self.$element = $(self.getTemplate(self._content));
	self.$close = $(self.$element).find('[data-sticky-message-close]');

	self.$element.addClass(self._options.theme);
	self.open();

	self._initEvent();
}

TeraStickyMessage.prototype._initEvent = function () {
	var self = this;

	self.$close.on('click', function (e) {
		e.preventDefault();
		self.remove();
	})
}

TeraStickyMessage.prototype.open = function () {
	var self = this;

	self.$element.addClass('is-enter');
	self.$body.append(self.$element);
}

TeraStickyMessage.prototype.remove = function () {
	var self = this;

  // Add class to hide
	self.$element.addClass('is-exit');

	// Remove div
	setTimeout(function () {
		self.$element.remove();
	}, 400);
}

TeraStickyMessage.prototype.getTemplate = function (content) {
	var self = this;
	var _content = content;

  return 	'<div class="sticky-message" data-sticky-message>' +
						'<div class="sticky-message__content" data-sticky-message-content>' +
							_content +
						'</div>' +
						'<div class="sticky-message__close" data-sticky-message-close>' +
							'<svg class="sticky-message__svg">' +
								'<use xlink:href="../../assets/icons/ui/svg-defs.svg#close"></use>' +
							'</svg>' +
						'</div>' +
					'</div>';
}
