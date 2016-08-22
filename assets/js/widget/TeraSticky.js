
// var stickyParent = stickyTarget.parentNode;
// stickyParent.innerHTML = '<div class="teraSticky js-sticky">' + stickyParent.innerHTML + '</div>';
// var stickyContainer = stickyParent.childNodes[0];

// var stickyTop = stickyTarget.offsetTop;



var TeraSticky = function (element) {
	this._element = element;

	this.SELECTOR = {
		container : 'data-sticky',
		target : '[data-sticky-target]',
	};

	this._init();
}

TeraSticky.prototype._init = function () {
	var self = this;

	self.TARGET = self._element.querySelector(self.SELECTOR.target);

	self.width = self.TARGET.offsetWidth;
	self.height = self.TARGET.offsetHeight;
	self.top = self.TARGET.offsetTop;

	self._element.style.width = self.width + 'px';
	self._element.style.height = self.height + 'px';

	self.block = document.createElement('div');
	self.block.style.width = self.width + 'px';
	self.block.style.height = self.height + 'px';

	// self._element.classList.add('js-sticky');

	// console.log(self.top);

	window.onscroll = function() {
	    var y = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
	    if (y >= self.top) {
	        self._element.className = 'js-sticky';
	        self._element.parentNode.insertBefore(self.block, self._element);
	        self.block.style.display = 'block';
	    } else {
	    	self._element.className = '';
	    	self.block.style.display = 'none';
	    }
	};

}

/*
	Invoke the obj instance
*/

var TeraStickyInvoker = (function(){
	[].slice.call( document.querySelectorAll('[data-sticky]')).forEach( function( el, i ) {
		var sticky = new TeraSticky(el);
	});
})();