$(function() {
    $("#recherche-champ").on("input", trierChampions);
});


function listerChampions() {
    /* Crée la liste des champions
     * Dépend de l'api */
    
    var enregistres = localStorage["champions_desactives"].split(","); // Les champions a désactiver
    for(var champ in api.champion) {
        var icone = $(".champion-img.model").clone().removeClass("model");
        icone.find("img").attr("src", imgUrl(api.champion[champ].image));
        icone.attr("nom", champ);
        icone.attr("ignorer", ""+(enregistres.indexOf(champ)>-1));
        icone.appendTo($("#champions-possedes"));
        icone.click(function() {
            switcherChampion($(this).attr("nom"));
        });
    }
    $("#recherche-champ").val("");
    $("#champions-possedes > .champion-img:not(.model)").sort(comparerChampions).appendTo("#champions-possedes");
}

function switcherChampion(champion) {
    /* ignore ou non le champion */
    var element = $(".champion-img[nom="+champion+"]");
    element.attr( "ignorer", ""+!(element.attr("ignorer") == "true") );
    localStorage["champions_desactives"] = championsDesactives();
}

function trierChampions() {
    /* N'affiche que les champions correspondant à la recherche */
    $("#champions-possedes > .champion-img:not(.model)").each(function(i, e) {
        var element = $(e);
        if( (element.attr("nom")).toUpperCase().contains($("#recherche-champ").val().toUpperCase()) ) {
            element.show();
        }
        else element.hide();
    });
}

function championsDesactives() {
    /* Retourne la liste des noms des champions désactivés */
    var listeChamps = [];
    $('.champion-img[ignorer="true"]').each(function(i, e){
        listeChamps.push( $(e).attr("nom") );
    });
    return listeChamps;
}

function comparerChampions(a, b) {
    /* Donne l'odre des deux champions passés en argument */
    return $(a).attr("nom") > $(b).attr("nom");
}