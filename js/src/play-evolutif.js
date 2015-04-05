$(function(){
    $("#lancer-mode-evolutif").click(function(){
        $("#mode-evolutif").removeClass("hide");
        $("#configurer").addClass("hide");
        lancerModeEvolutif();
    });
    $("#restart-champ-evolutif").click(function(){
        $(".champ-selector:not(.model)").champSelect();
    });
    $(".close-evolutif").click(function(){
        $("#mode-evolutif").addClass("hide");
        $("#configurer").removeClass("hide");
    });
    $(".mode-evolutif-step2").click(function(){
        $("#mode-evolutif-champ").addClass("hide");
        $("#mode-evolutif-items").removeClass("hide");
    })
});

function lancerModeEvolutif() {
    /* Débute le mode évolutif */
    var listeChampions = $("#mode-evolutif-champ");
    listeChampions.find(".champ-selector:not(.model)").remove();
    for(var i = 0 ; i < $("#nb-joueurs").status() ; i++) {
        var item = listeChampions.find(".model").clone().removeClass("model");
        item.champSelect().appendTo(listeChampions);
    }
}

$.fn.champSelect = function(champion) {
    /* Associe le noeud à une selection de champion
     * Peut être utilisé sur un groupe d'élément
     * Si aucun argument n'est donné, sélectionne un champion alléatoire
     */
    if(this.length > 1) {
        this.each(function() {
            $(this).champSelect(champion);
        });
    }
    else if(typeof champion == "undefined") this.champSelect(randomChamp());
    else {
        champion = typeof champion == "string" ? api.champion[champion] : champion;
        this.find(".champ-name").text(champion.name);
        this.find("img").attr("src", champLoadingImg(champion));
        this.find(".champ-description").html(champion.blurb);
        this.find(".commentaire").text(champion.title);
        for(var type in champion.info) {
            this.find(".info-"+type).attr("style", "width: " + champion.info[type]*10 + "%;");
        }
        this.find(".change").unbind("click").click(function() {
            $(this).parent().parent().parent().champSelect();
        });
    }
    return this;
};