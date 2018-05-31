//GLOBAL VARIABLES AND SCRIPTS
var homeServer= "https:///www.boscovs.com";

      function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        var isFilteredUserName=false;
        if (getParameterByName('fu').toLowerCase() == 'y')
        {
                isFilteredUserName=true;
        }
        if (isFilteredUserName == false)
        {
                var utag_data={
                        page_name       : "HomePage",
                        page_type       : "homepage"
                };

                var fileref=document.createElement("script");
                fileref.setAttribute("type", "text/javascript");
                fileref.setAttribute("src", "//www.boscovs.com/store/content/js/tealium.js");
                document.getElementsByTagName("head")[0].appendChild(fileref);
        }

function sliScriptLoad(staticHttpContentPrefix, storeContentPrefix)
        {
                if (navigator.userAgent.indexOf("Firefox/1.0.7") === -1)
                {
                        Modernizr.load([,storeContentPrefix+'/js/jquery-ui-1.9.2.min.js']);
                }

        }

function mainScriptLoad(staticHttpContentPrefix, storeContentPrefix)
{
Modernizr.load([storeContentPrefix+'/js/jquery.jsonp-2.1.2.min.js',
                storeContentPrefix+'/js/jquery-jtemplates-0.8.1.min.js', storeContentPrefix+'/js/plugins.js',
                storeContentPrefix+'/js/jquery.multiselect.min.js', storeContentPrefix+'/js/superfish.js']);
}

        
//onload features
$(document).ready(function() 
{
	//global ajax setup
	$.ajaxSetup({timeout:120000});
    sliScriptLoad("//www.boscovs.com/wcsstore/boscovs","//www.boscovs.com/store/content");
    mainScriptLoad("//www.boscovs.com/wcsstore/boscovs","//www.boscovs.com/store/content");
	$.get("/shop/Header.bos", function(data) { $('#header').html(data); });
	$.get("/shop/Footer.bos", function(data) { $('#footer').html(data); });
   	setTimeout(initRenderingJS, 1500);

	$( "#cart_toggle" ).click(function() {
        if ($("#cart_flyout").is(":visible"))
        {
            $( "#cart_flyout" ).hide();
            $( "#cart_toggle" ).removeClass( "border-dark-blue" );   
        } else {
			$( "#cart_flyout" ).show();
			$( "#cart_toggle" ).addClass( "border-dark-blue" );
	    	$( "#close_flyout" ).click(function() {
	            $( "#cart_flyout" ).hide();
	            $( "#cart_toggle" ).removeClass( "border-dark-blue" );
	        });
        } 
    });
	$(document).on('click', function(event) {
    	if (!$(event.target).closest('#cart_flyout').length && !$(event.target).closest('#cart_toggle').length) {
		    $( "#cart_flyout" ).hide();
            $( "#cart_toggle" ).removeClass( "border-dark-blue" );
        }
   	});
	/* Scrolling functions for header */
	$(window).scroll(function(){
        if ($(this).scrollTop() > 1) {
            $('.fixed-header').addClass('fixed');
        } else {
            $('.fixed-header').removeClass('fixed');
        }
        if ($(this).scrollTop() > 1) {
            $('.fixed-show-scrolling').addClass('show');
            $('.fixed-hide-scrolling').addClass('hide');
            $('.fixed-secondary-header').addClass('fixed-padding');
            $('.fixed-header-padding').addClass('fixed-padding-on');
        } else {
            $('.fixed-show-scrolling').removeClass('show');
            $('.fixed-hide-scrolling').removeClass('hide');
            $('.fixed-secondary-header').removeClass('fixed-padding');
            $('.fixed-header-padding').removeClass('fixed-padding-on');
        }
    });

	$.holdReady( true );
	$.getScript( "//" + sliEnvironment + "/autocomplete/sli-rac.config.js", function() {
	$.holdReady( false );
	});
	
});



function initCartToggle()
{
$( "#cart_toggle" ).click(function() {
        if ($("#cart_flyout").is(":visible"))
        {
            $( "#cart_flyout" ).hide();
            $( "#cart_toggle" ).removeClass( "border-dark-blue" );
        } else {
            $( "#cart_flyout" ).show();
            $( "#cart_toggle" ).addClass( "border-dark-blue" );
        }
    });

}


function tealiumMiniCartTag() {
	utag.link({
        event_type:"mini_click_to_edit"
    });
    //alert("end minicart");
    return true;
}

function initHoverAdjust(){
	$('.menuItems li ul').each(function(){  
        var liItems = $(this);
        var Sum = 0;
        if(liItems.children('li').length >= 1){
            $(this).children('li').each(function(i, e){
                Sum += $(e).outerWidth(true);
            });
            $(this).width(Sum+1);
        } 
    });
    $(function () {
        $(".menuItems li").on('mouseenter', function (e) {
            if ($('ul', this).length) {
                var elm = $('ul:first', this);
                var pageOff = elm.offset().left;
                var off = elm.parent().position();
                var l = off.left;
                var w = elm.width();
                var docH = $("#main_menu").height();
                var docW = $("#main_menu").width();
                var isEntirelyVisible = (l + w <= docW);
                if (!isEntirelyVisible) {
                    if (pageOff >= w) {
                        $(this).addClass('rightedge');
                    } else {
                        $(this).addClass('leftedge');
                    }
                } else {
                    $(this).addClass('nonedge');
                }
            }
        });
        $(".menuItems li").on('mouseleave', function (e) {
            $(this).removeClass('edge nonedge rightedge leftedge');
        });
    });
}

function initPDFModal() {
	/*Modal for PDFs*/
	$(".pdfLinkModalOpen").bind('click', function(){
		var linkAddress = $(this).attr("href");
		var linkTitle = $(this).text();
		if ($("#pdfIframe").length) {
			$("#pdfIframe").attr("src", linkAddress);
			$("#pdfLinkModal .modal-header h4").text(linkTitle);
			$('#pdfLinkModal').modal({show: true});	
			return false;
		}
		return true;
	});
}


function initRenderingJS(){
	initHoverAdjust();       
	initCartToggle();
	initPDFModal();
}



