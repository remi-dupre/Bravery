/* *************** Mode classique ***************
 * Gère le jeu en mode classique
 * Tout les éléments de la page modifiés descendent de #mode-classique
 */

$(function() {
    $("#lancer-mode-classique").click(function() {
        $("#mode-classique").removeClass("hide");
        $("#configurer").addClass("hide");
        genClassique();
    });

    $("#close-classique").click(function() {
        $("#mode-classique").addClass("hide");
        $("#configurer").removeClass("hide");
    });

    $("#restart-classique").click(genClassique);
});

function genClassique() {
    /* Crée un build en mode classique
     * Sortie : modifie la page héritant de #build-classique
     */
    var page = $("#mode-classique");
    var champion = randomChamp();
    page.find(".champ-loader").attr("src", champLoadingImg(api.champion[champion]));
    page.find(".champ-name").text(api.champion[champion].name);
    page.find(".champ-citation").text(api.champion[champion].title);
    page.find(".champ-tips").empty();
    for(var i in api.champion[champion].allytips) {
        page.find(".champ-tips").append("<li>" + api.champion[champion].allytips[i] + "</li>");
    }

    genItemsPool();
    var faits = [ $(page.find(".build img")[0]).itemSlot(finirItem(1001)) ];
    for(i = 1 ; i < 6 ; i++) {
        var item = randomFullItem();
        if(!$("#repetition").status()) { // Reselectione en cas de répétiton
            while( faits.indexOf(item) > -1 ) item = randomFullItem();
        }
        faits.push(item);
    }
    page.find(".build").setBuild(faits);
}
