//for the loading animation
//$body = $("body");

$(document).on({
    ajaxStart: function() { $("body").addClass("loading");    },
    ajaxStop: function() { $("body").removeClass("loading"); }
});


$( "#search-form" ).submit(function( event ) {
  alert( "Handler for .submit() called." );
  event.preventDefault();
});
