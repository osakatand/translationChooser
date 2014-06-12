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

function creeAlternative() {
    insertTag('<span class="liste">', '<br>*</span>','zozo')
};

function insertTag(startTag, endTag, textareaId) {
    //var field  = document.getElementById(textareaId);
    var field = $('#'+textareaId);
    var scroll = field.scrollTop;
    field.focus();
    var startSelection   = field.text().substring(0, field.selectionStart);
    var currentSelection = field.text().substring(field.selectionStart, field.selectionEnd);
    var endSelection     = field.text().substring(field.selectionEnd);
    field.text(startSelection + startTag + currentSelection + endTag + endSelection);
//    field.value = "brrrrout" // test (inopérant)
    field.focus();
    //field.setSelectionRange(startSelection.length + startTag.length, startSelection.length + startTag.length + currentSelection.length);
    field.scrollTop = scroll; // et on redéfinit le scroll.
};

function ajouteProposition(endroit) {
    document.getElementById(endroit).innerHTML += "<br>nouveau texte"
};


