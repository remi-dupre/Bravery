function imgUrl(img) {
    /* Donne l'url d'une image
     * Entrée : json décrivant l'image
     * Sortie : l'url de l'image */
     
    return "http://ddragon.leagueoflegends.com/cdn/5.2.1/img/"+ img.group +"/"+ img.full;
}