$(function() {
    $("[carte]").each(function() {
        var base = (typeof OFFLINE == "undefined") ? "http://cdn.leagueoflegends.com/game-info/1.1.9/images/content" : "lol-api/map";
        $(this).attr("src", base + "/modes-" + $(this).attr("carte") + ".jpg");
    });
})

function imgUrl(img) {
    /* Donne l'url d'une image
     * Entrée : json décrivant l'image
     * Sortie : l'url de l'image
	 */
    var base = (typeof OFFLINE == "undefined") ? "http://ddragon.leagueoflegends.com/cdn/5.5.2/img/" : "lol-api/";
    return base + img.group +"/"+ img.full;
}

function champLoadingImg(champ, randomSkin) {
    /* Donne l'url de l'image de chargement d'un champion */
	randomSkin = randomSkin || true;
	var skinPool = champ.skins;
	for(var i = 0 ; i < 9 ; i++) skinPool.push(champ.skins[0]);
	var skin = randomSkin ? randomElement(skinPool) : champ.skins[0];
    var base = (typeof OFFLINE == "undefined") ? "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" : "lol-api/champion/loading/";
    return base + champ.key + "_" + skin.num + ".jpg";
}

function uiImg(img) {
    var base = (typeof OFFLINE == "undefined") ? "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/" : "lol-api/ui/";
    return base + img + ".png";
}

function faitAvec(item, fils) {
    /* Retourne vrai si l'item (id) est réalisé avec l'item fils (id) */
    if(parseInt(item) == parseInt(fils)) return true;
    
    var avec = false;
    item = api.item[item];
    if( typeof item.from != "undefined" ) {
        for(var i in item.from) {
            avec = faitAvec(item.from[i], fils) || avec;
        }
    }
    return avec;
}

function fullItemDescription(item) {
    /* Retourne la description complète de l'item
	 * Entrée : Un item (nombre ou objet)
	 * Sortie : Le html de la description
	 *          Le texte sortis est différent de celui qui est fournis par l'api
	 */
    item = api.item[item] || item;
    var description = item.description;
    if((item.depth || 0) == 3 && faitAvec(item.id, 1001)) { // Concaténation des enchantements de bottes
        item = api.item[item.from[0]];
        description += item.description;
    }
	
    var descriptionHtml = $("<div><div class='item-description'>"+ description +"</div></div>");
    descriptionHtml.find("calc").replaceWith("...");
    descriptionHtml.find("i:not(:last-child)").remove();
    descriptionHtml.find("grouplimit:not(:first-child)").remove();
    descriptionHtml.find(".tem-description > br:last-child").remove();
    descriptionHtml.find("font").attr("color", "#b71c1c");
    while((i || 0) != descriptionHtml.html().length) {
        var i = descriptionHtml.html().length;
        descriptionHtml.html(descriptionHtml.html().replace("<br><br><br>", "<br><br>"));
    }
    
    return descriptionHtml.html();
}

$.fn.itemSlot = function(newItem) {
    /* Définis l'élément du DOM passé en argument comme un affichage d'item
	 * Entrée : l'id de l'item (facultatif)
	 * Sortie : la page est modifiée :
	 *  - L'attribut src est changé vers la bonne image
	 *  - Un popover affichant la description de l'item est configuré
	 */
	newItem = newItem || 1001;
    if( typeof newItem == typeof {} ) {
	    newItem = newItem.id;
	}
	if( typeof this.attr("item") == "undefined" ){
		this.webuiPopover({
			title: "Nom",
			content: "Description",
			width: 450,
			animation: "pop",
			closeable: true
		});
		this.on("shown.webui.popover", function(e) {
			var element = $("#"+$(e.target).attr("data-target"));
			var item = api.item[$(this).attr("item")];
			element.find(".webui-popover-title").html(item.name + " - " + item.gold.total+'<img src="'+uiImg('gold')+'" />');
			element.find(".webui-popover-content").html(fullItemDescription(item));
		});
	}
	this.attr("item", newItem);
	this.attr("src", imgUrl(api.item[newItem].image));
};