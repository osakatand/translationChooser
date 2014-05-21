$( document ).ready(function(){
$('#source').bind('dblclick',
               function(){
                   $(this).attr('contentEditable',true);
               });
$('#source').bind('keypress blur', function() {
    $('#toto').text($(this).text());
});
});
