$.fn.setBuild = function(build) {
    /* Affiche un build sur la page
     * Entrée : un build [.., .., etc ...]
     * Sortie :
     *  - modifie la liste des items du build
     *  - modifie les affichages contenant l'attribut for=idbuild
     */
    for(var i = 0 ; i < build.length ; i++) {
        var item = build[i];
        $($(this).find("img")[i]).itemSlot(item);
    }
};

$.fn.setTendance = function(tendance) {
    /* Prend en argument un array décrivant la tendance */
    $(this).find(".tank").attr("style", "width:" + Math.trunc(tendance.tank*100) + "%;");
    $(this).find(".ad").attr("style", "width:" + Math.trunc((tendance.ad+tendance.tank)*100) + "%;");
}

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
     *  /!\ Utilise item_pool  et le modifie
     *      Les bottes ne peuvent pas être choisis
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
