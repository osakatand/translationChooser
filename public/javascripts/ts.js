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


// AJOUTER UNE PROPOSITION AU SEIN D'UNE ALTERNATIVE

//function ajouteProposition(endroit) {
//    document.getElementById(endroit).innerHTML += "<li>nouvelle proposition</li>"
//};
// problème : le nouvel élément de la liste s'insère après le </ul>. Ce qui ne posait pas de problème avec <br>...

/*function ajouteProposition(endroit) {
    $('ul').append('<li>nouvelle proposition</li>');
}; // problème de cette nouvelle version : ajoute dans toutes les listes !
*/

function ajouteProposition(endroit) {
    var zone = document.getElementById('treo');
    zone.innerHTML += '<li>nouvelle proposition</li>';
};


// Les fonctions suivantes sont (en fait ne sont pas) utilisées dans ajouteProposition
var divisionduclic;
function clickHandler(e){
 var elem, evt = e ? e:event;
 elem = evt.target.innerHTML;

// alert (''
//  +'You clicked the following HTML element: \n <'
//  +elem.tagName.toUpperCase()
//  +'>'
// )
 divisionduclic = elem;
 return true;
};

document.onclick=clickHandler;
 // Voir si ça aide à définir où se trouve le bouton...







// CRÉER UNE ALTERNATIVE AU TEXTE

function creeAlternative() {
//    insertTag('<span class="liste">', '<br>alternative...</span>','zozo')
//    insertTag('<b>','</b>','zozo')
    var texte = getSelectedText();
    replaceSelection('<span class="liste"><ul><li>' + texte + '</li><li>nouvelle proposition</li></ul></span>',true);
};

// Les 2 fonctions suivantes sont utilisées dans creeAlternative()
function replaceSelection(html, selectInserted) {
    var sel, range, fragment;

    if (typeof window.getSelection != "undefined") {
        // IE 9 and other non-IE browsers
        sel = window.getSelection();

        // Test that the Selection object contains at least one Range
        if (sel.getRangeAt && sel.rangeCount) {
            // Get the first Range (only Firefox supports more than one)
            range = window.getSelection().getRangeAt(0);
            range.deleteContents();

            // Create a DocumentFragment to insert and populate it with HTML
            // Need to test for the existence of range.createContextualFragment
            // because it's non-standard and IE 9 does not support it
            if (range.createContextualFragment) {
                fragment = range.createContextualFragment(html);
            } else {
                // In IE 9 we need to use innerHTML of a temporary element
                var div = document.createElement("div"), child;
                div.innerHTML = html;
                fragment = document.createDocumentFragment();
                while ( (child = div.firstChild) ) {
                    fragment.appendChild(child);
                }
            }
            var firstInsertedNode = fragment.firstChild;
            var lastInsertedNode = fragment.lastChild;
            range.insertNode(fragment);
            if (selectInserted) {
                if (firstInsertedNode) {
                    range.setStartBefore(firstInsertedNode);
                    range.setEndAfter(lastInsertedNode);
                }
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.type != "Control") {
        // IE 8 and below
        range = document.selection.createRange();
        range.pasteHTML(html);
    }
};

function getSelectedText(){
    if (window.getSelection){
    var str = window.getSelection();
    }else if (document.getSelection){
    var str = document.getSelection();
    }else {
    var str = document.selection.createRange().text;
    }
    return str;
};