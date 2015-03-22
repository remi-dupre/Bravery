$(function() {
    $("#skins").option({ defaut : true });
    $("#repetition").option({ defaut : false });
    $("#nb-joueurs").option({ defaut : 2 });
});

$.fn.option = function(params) {
    /* Identifie comme un élément de choix d'options
     * Enegistre automatiquement la valeur du formulaire
     * Dans params :
     *  - defaut : valeur par defaut
     */
    if(typeof params == "undefined") params = {};
    if(typeof params.defaut != "undefined") {
        this.status(params.defaut);
    }
    if(typeof localStorage[optionKey(this)] != "undefined") {
        this.status(localStorage[optionKey(this)]);
    }
    this.on("click", function() {
        localStorage[optionKey(this)] = $(this).status();
    });
};

$.fn.status = function(val) {
    if(this.attr("type") == "checkbox") {
        if(typeof val == "undefined") {
            return this.prop("checked")
        }
        else if(typeof val == "string") {
            return this.prop("checked", val=="true");
        }
        else return this.prop("checked", val);
    }
    else {
        return typeof val == "undefined" ? this.val() : this.val(val);
    }
};

function optionKey(element) {
    /* Retourne une chaine contenant la clé utiliser pour stocker l'option */
    var element = $(element);
    return "options/" + element.attr("id");
}