

/** 
* ==============================================
* INIT BASE
* ==============================================
*/

(function ($, window, document, undefined) {

    /** 
    * INITIALIZE ALL PLUGINS
    */
    var app = {
    	init: function() {
            fancy.init();
            form.init();
    	}
    }

    /** 
    * INITIALIZE FORM PLUGINS
    */
    var form = {
        init: function() {
            $(document).find('.validate').validate();
            this.ajaxSubmit();
        },
        ajaxSubmit: function() {
            $(document).on('submit', '.ajaxSubmit', function(event) {
                event.preventDefault ? event.preventDefault() : event.returnValue = false;
                
                var $url,$data;
                $data = $(this).serialize();

                $.ajax({
                        url: document.URL, 
                        type: "post",
                        dataType: "html",
                        data: $data,
                        complete: function(){

                        },
                        
                        success: function( strData ){
                            $.fancybox.close();
                            $.fancybox( '<p>'+strData+'</p>' );
                        }
                });
            
      })
        }
    }

    /** 
    * INITIALIZE FANCYBOX
    */
    var fancy = {
        fancyAddDots: function() {
                if(this.group.length < 2) return;
                var list = $("#fancy-dots");
                if (!list.length) {    
                    list = $('<ul id="fancy-dots">');                
                    for (var i = 0; i < this.group.length; i++) {
                        $('<li data-index="' + i + '"><label></label></li>').click(function() { $.fancybox.jumpto( $(this).data('index'));}).appendTo( list );
                    }                    
                    list.appendTo( 'body' );
                }
                list.find('li').removeClass('active').eq( this.index ).addClass('active');
        },
        fancyRemoveDots: function() {
            $("#fancy-dots").remove();  
        },
        init: function() {
            $('.zoom').fancybox({
                padding : 0,
                margin: 40,
                afterLoad   : fancy.fancyAddDots,
                beforeClose : fancy.fancyRemoveDots
            });

            $('.ajax-load').fancybox({
                padding : 0,
                margin: 40,
                type: 'ajax',
                afterShow: form.init
            });
            
        }
    }
    
    /*
    var slider = {
        init: function() {
            $('#slider').slick({
                dots: true,
                infinite: false,
                speed: 300,
                slidesToShow: 5,
                touchMove: false,
                slidesToScroll: 1
            });
        }
    }
    */



  $(document).ready(app.init)

})(jQuery, window, document);
