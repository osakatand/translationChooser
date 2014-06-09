$(document).ready(function () {
    $('#source').bind('click',
        function () {
            $(this).attr('contentEditable', true);
        });
    $('#source').bind('keypress blur', function () {
        $('#toto').text($(this).text());
    });
});