/* *************** Mode classique ***************
 * Gère le jeu en mode classique
 * Tout les éléments de la page modifiés descendent de #mode-classique
 */

$(function() {
    $("#lancer-mode-classique").click(function() {
        $("#mode-classique").removeClass("hide");
        $("#configurer").addClass("hide");
        initChampionPool();
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
    var build = [ 1001 ];
    if($("#jungle").status()) build.push(1039);
    if(api.champion[champion].name == "Viktor") build.push(3200);
    for(i = 0 ; i < 6 ; i++) {
        if(typeof build[i] == "undefined") {
            var item = randomFullItem();
            if(!$("#repetition").status()) { // Resélectione en cas de répétiton
                while( build.indexOf(item) > -1 ) item = randomFullItem();
            }
            build.push(item);
        }
        else build[i] = finirItem(build[i]);
    }
    console.info(build);
    page.find(".cout-total").text(prixTotal(build));
    page.find(".cout-moyen").text(Math.trunc(prixTotal(build)/6));
    page.find(".tendance").setTendance(tendance(build));
    page.find(".build").setBuild(build);
}
