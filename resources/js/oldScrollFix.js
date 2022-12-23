(function() {
	if (typeof(jQuery) === 'undefined') { return; }
  
	// ScrollFixed plugin by daved
	(function ($) {
		var ScrollFix = function ($ele, opts) {
			var sf = this;
			sf.offset = opts.offSet || 0;
			sf.spacer = $('<div/>').addClass('scrollFix-spacer').attr('class', $ele.attr('class'));
			sf.window = $(window).on('scroll', $.proxy(checkPos, this));
			function checkPos() {
				var scrollTop = sf.window.scrollTop
				, totalOffset = $ele.offset().top - sf.offset
				, fixed
				;
				if (this.fixed && this.limit != null && (scrollTop <= this.limit)) {
					sf.spacer.remove();
					$ele.css({
						'position': ''
						, 'top': ''
						, 'z-index': ''
						, 'width': ''
					}).removeClass('scrollFixed');
					fixed = false;
				}
				else if (!this.fixed && scrollTop >= totalOffset) {
					sf.spacer.css({
						'height': $ele.outerHeight(),
						'width': $ele.outerWidth()
					});
					$ele.before(sf.spacer);
					$ele.css({
						'position': 'fixed'
						, 'top': 0 + sf.offset
						, 'z-index': opts.zIndex
						, 'width': $ele.width()
					}).addClass('scrollFixed');
					fixed = true;
				}
				if (typeof (fixed) !== 'undefined') {
					if (this.fixed == fixed) { return; }
					this.fixed = fixed;
					this.limit = (this.fixed ? totalOffset : null);
				}
			}
			this.checkPosition = function() {
				checkPos();
			};		
		};
		$.fn.scrollFix = function (options) {
			return $(this).each(function () {
				var $ele = $(this),
				opts = $.extend({
					offSet: 0
				, zIndex: 9
				}, options);
				var sf = new ScrollFix($ele, opts);
				sf.checkPosition();
				$(this).data('ScrollFix', sf);
			});
		};
	})(jQuery);

	// startup script
	(function($) {
	  $(function() {
		$('.tabs-outer').scrollFix({zIndex: 999}); // scrollfix top nav
		//$('.column-right-inner').scrollFix({offSet: 65});  // scrollfix right bar
	  });
	})(jQuery);
})();