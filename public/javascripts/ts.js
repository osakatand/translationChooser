$(document).ready(function () {
    $('#source').bind('click',
        function () {
            $(this).attr('contentEditable', true);
        });
    $('#source').bind('keypress keyup blur', function (e) {
        if (e.keyCode == 13) { // Si c'est la touche entrée
            this.blur(); // On enlève le focus
            return false; // On termine la fonction pour pas que le retour à la ligne soit pris en compte
        } else {
            $('#toto').text($(this).text()); // Si ce n'est pas entrée on recopie le texte dans la boite d'en dessous
        }
    });
});