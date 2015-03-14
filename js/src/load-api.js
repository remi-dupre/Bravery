/*
 * Permet de télécharger l'api de lol
 */
 
var api = {
    champion : {
        nom : "Champions",
        description : "Liste et informations sur les champions",
        adresse : "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/champion?locale=fr_FR&champData=allytips,skins,altimages,image,tags&api_key=d19e6095-3a97-4721-b23d-a7710557acb1"
    },
    item : {
        nom : "Items",
        description : "Liste et informations sur les items",
        adresse : "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/item?locale=fr_FR&itemListData=all&api_key=d19e6095-3a97-4721-b23d-a7710557acb1"
    }/*,
    map : {
        nom : "Maps",
        description : "Informations sur les modes de jeu",
        adresse : "https://global.api.pvp.net/api/lol/static-data/euw/v1.2/map?locale=fr_FR&api_key=d19e6095-3a97-4721-b23d-a7710557acb1"
    }*/
};
var api_loaded = 0;
var api_after_loaded = function(){};

function chargerApi(onDone) {
    /* Charge l'API
     * Charge les pages d'api définis dans api
     * Une fois terminé, exécute la fonction passée en argument
     */
     
    api_after_loaded = onDone;
    $("#loading-api-container").removeClass("hide");
     
    for(var fichier in api) {
        var ligne = $(".fichier-api.model").clone().removeClass("model");
        ligne.find(".title").text(api[fichier].nom);
        ligne.find("p").text(api[fichier].description);
        ligne.attr("api-nom", fichier).appendTo($("#api-liste"));
        
        $.getJSON(api[fichier].adresse, function(data) {
            api[data.type] = data.data;
            $(".fichier-api[api-nom="+data.type+"] i").removeClass("mdi-action-autorenew").addClass("mdi-action-done");
            api_loaded++;
            if( api_loaded >= length(api) ) {
                $("#loading-api-container").addClass("hide");
                api_after_loaded();
            }
        });
    }
}

function length(e) {
  var i = 0;
  for ( var p in e ) i++;
  return i;
}
