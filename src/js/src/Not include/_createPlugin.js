        
;( function( $ ){
        $.fn.extend( {
                testPlugin: function( options ) {
                        this.defaults = {
                                var1 : 'hello world' 
                        };
                        
                        var settings = $.extend( {}, this.defaults, options );
                        var _this, _el;
 
                        var testPlugin = {
                                init: function($el) {
                                        _this = this;
                                        _el = $el;

                                        this.setup();
                                },
                                setup: function() {
                                       
                                }                               
                        }
                        
                        return this.each( function() {
                                var $this = $( this );
                                testPlugin.init($this);
                        });
                }
        });
})( jQuery );