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
    var champion = randomChamp();
    $(".champ-loader").attr("src", champLoadingImg(api.champion[champion]));
    $(".champ-name").text(api.champion[champion].name);
    $(".champ-citation").text(api.champion[champion].title);
    $(".champ-tips").empty();
    for(var i in api.champion[champion].allytips) {
        $(".champ-tips").append("<li>" + api.champion[champion].allytips[i] + "</li>");
    }
    
    genItemsPool();
    $($(".build img")[0]).itemSlot(finirItem(1001));
    for(i = 1 ; i < 6 ; i++) {
        $($(".build img")[i]).itemSlot(randomFullItem());
    }
}

/* Generation des items */

var item_pool = [];

function genItemsPool() {
    /* Crée un liste des items réalisables
     *  /!\ Prend en compte la map sélectionnée
     */
    item_pool = [];
    var inMap = function(item) {
        var map = parseInt($('.carte-select[selected="selected"]').attr("mapid"));
        if( typeof item.maps == "undefined" ) return true;
        else if( typeof item.maps[map] == "undefined" ) return true;
        else return item.maps[map];
    };
    for(var i in api.item) {
        if( inMap(api.item[i]) && ( typeof api.inStore == "undefined" || api.inStore )) {
            item_pool.push(i);
        }
    }
}

function finirItem(item) {
    /* Prend l'id d'un item en argument
     * Retourne un item en fin d'arbre alléatoire
     */
    
    while( typeof api.item[item].into != "undefined" ) {
        item = randomElement(api.item[item].into);
    }
    return item;
}

function randomFullItem() {
    /* Donne un item fini alléatoire
     *  /!\ Les bottes ne peuvent pas être choisis
     *      Pas d'item jungle non plus -> finishItem(1039)
     *      Les items de moins de 1000po ne peuvent pas être choisis
     */
    var grosItems = [];
    for(var i in item_pool) {
        var item = item_pool[i];
        if( typeof api.item[item].into == "undefined" && !faitAvec(item, 1001) && !faitAvec(item, 1039) && api.item[item].gold.total > 1000 ) {
            grosItems.push(item);
        }
    }
    return randomElement(grosItems);
}

function randomElement(array) {
    var i = Math.trunc( Math.random() * array.length );
    return array[i];
}