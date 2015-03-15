function imgUrl(img) {
    /* Donne l'url d'une image
     * Entrée : json décrivant l'image
     * Sortie : l'url de l'image */
     
    return "http://ddragon.leagueoflegends.com/cdn/5.5.2/img/"+ img.group +"/"+ img.full;
}

function champLoadingImg(champ) {
    return "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champ.key + "_" + champ.skins[0].num + ".jpg";
}