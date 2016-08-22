/**
 *
 * @param {arrray} triggers
 * @param {string} content
 * @constructor
 */
var TeraModal = function (triggers, content) {
	this._triggers = triggers;
	this._content = content;
	this.duration = 300;

	this._init();
}

TeraModal.prototype._init = function () {
	var self = this;

	self.$body = $('body');
	self.$element = $(self.getTemplate(self._content));
	self.$overlay = $(self.getTemplateOverlay());

	self.$content = self.$element.find('[data-modal-content]');
	self.$close = self.$element.find('[data-modal-close]').toArray();

	self.$header = self.$element.find('[data-modal-header]');
	// self.$body = self.$element.find('[data-modal-body]');
	// self.$footer = self.$element.find('[data-modal-footer]');

	self.open();

	self._initEvent();
}

TeraModal.prototype._initEvent = function () {
	var self = this;

	if (self.$close) {
		self.$close.forEach( function (el) {
			$(el).on('click', function (ev) {
				ev.stopPropagation();
				self.remove();
			});
		});
	};

	self.$element.on( 'click', function (ev) {
		ev.stopPropagation();
		self.remove();
	});

	self.$content.on( 'click', function (ev) {
		ev.stopPropagation();
	});
}

TeraModal.prototype.open = function () {
	var self = this;

	self.$body.append(self.$overlay);
	self.$body.append(self.$element);

	self.$body.addClass('body--modal-open');
	self.$element.addClass('modal--open');

	self.$overlay.addClass('is-enter');
	self.$content.addClass('is-enter');
}

TeraModal.prototype.remove = function () {
	var self = this;

	self.$body.removeClass('body--modal-open');
	self.$element.removeClass('modal--open');

	self.$overlay.removeClass('is-enter');
	self.$content.removeClass('is-enter');

	self.$overlay.addClass('is-exit');
	self.$content.addClass('is-exit');

	setTimeout(function (){
		self.$element.remove();
		self.$overlay.remove();
	}, 500);
}

TeraModal.prototype.openNotification = function (status, jQueryContent) {
	var self = this;
	var _content = jQueryContent;

	if(self.$notification) {
		self.removeNotification();
		setTimeout(function() {
			openSequence();
		}, self.duration);
	} else {
		openSequence();
	}

	function openSequence() {
		self.$notification = $(self.getTemplateNotification());
		self.$notification.addClass('is-hide');
		self.$notification.append(_content);

		switch (status) {
			case 'success': self.$notification.addClass('is-success');
			case 'warning': self.$notification.addClass('is-warning');
			case 'error': self.$notification.addClass('is-error');
		}

		self.$header.after(self.$notification);
		self.$notification.velocity('slideDown', self.duration);
	}
}

TeraModal.prototype.removeNotification = function () {
	var self = this;

	if(self.$notification) {
		self.$notification.velocity('slideUp', self.duration, function() {
		 $(this).remove();
		});
	}
}

TeraModal.prototype.getTemplate = function (content) {
	var self = this;
	var _content = content;

	return	'<article class="modal">' +
					  '<div class="modal-flex">' +
							_content +
					  '</div>' +
					'</article>';
}

TeraModal.prototype.getTemplateOverlay = function () {
	var self = this;

	return	'<div class="modal-overlay"></div>';
}

TeraModal.prototype.getTemplateNotification = function () {
	var self = this;

	return	'<div class="modal-content__notification"></div>';
}

TeraModal.prototype.getElement = function (name, jQuerySelector) {
	var self = this;

	// set element name
	self[name] = self.$element.find(jQuerySelector);
}