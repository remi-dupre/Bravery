function tendance(build) {
    /* Donne la tendance de l'item
    * Entrée : un item ou un build
    * Sortie : tendance sous la forme { tank : .., ad: 42, ap: .. }
    */
    var ratios = {
        tank: 0,
        ad: 0,
        ap: 0
    };
    if(typeof build != "object") {
        build = [build];
    }
    for(var i in build) {
        var item = build[i];
        var stats = api.item[item].stats || {};
        for(var stat in stats) {
            var carac = ratioStat[stat] || { type : "tank", ratio : 0 };
            ratios[carac.type] += carac.ratio * stats[stat];
        }
    }
    var total = ratios.tank + ratios.ad + ratios.ap;
    ratios.tank /= total;
    ratios.ad /= total;
    ratios.ap /= total;
    return ratios;
}

function prixTotal(build) {
    /* Retourne le prix total d'un build */
    var prix = 0;
    for(var i in build) {
        prix += api.item[build[i]].gold.total;
    }
    return prix;
}

var ratioStat = {
    "rFlatArmorModPerLevel": {
        type: "tank",
        ratio: 1/50
    },
    "rFlatArmorPenetrationMod":  {
        type: "ad",
        ratio: 1/10
    },
    "rFlatArmorPenetrationModPerLevel":  {
        type: "ad",
        ratio: 18/10
    },
    "rFlatCritChanceModPerLevel":  {
        type: "ad",
        ratio: 18/30
    },
    "rFlatCritDamageModPerLevel":  {
        type: "ad",
        ratio: 1/50
    },
    "rFlatHPModPerLevel":  {
        type: "tank",
        ratio: 18/300
    },
    "rFlatMagicDamageModPerLevel":  {
        type: "ap",
        ratio: 18/50
    },
    "rFlatMagicPenetrationMod":  {
        type: "ap",
        ratio: 1/10
    },
    "rFlatMagicPenetrationModPerLevel":  {
        type: "ap",
        ratio: 18/10
    },
    "rFlatMPModPerLevel":  {
        type: "ap",
        ratio: 1/600
    },
    "rFlatPhysicalDamageModPerLevel": {
        type: "ad",
        ratio: 18/30
    },
    "rFlatSpellBlockModPerLevel": {
        type: "tank",
        ratio: 1/40
    },
    "rPercentArmorPenetrationMod": {
        type: "ad",
        ratio: 1/35
    },
    "rPercentArmorPenetrationModPerLevel": {
        type: "ad",
        ratio: 1/40
    },
    "rPercentAttackSpeedModPerLevel": {
        type: "ad",
        ratio: 1/0.4
    },
    "rPercentCooldownMod": {
        type: "ap",
        ratio: 1/10
    },
    "rPercentCooldownModPerLevel": {
        type: "ap",
        ratio: 18/10
    },
    "rPercentMagicPenetrationMod": {
        type: "ap",
        ratio: 1/35
    },
    "rPercentMagicPenetrationModPerLevel": {
        type: "ap",
        ratio: 18/35
    },
    "FlatArmorMod": {
        type: "tank",
        ratio: 1/40
    },
    "FlatAttackSpeedMod": {
        type: "ad",
        ratio: 1/0.4
    },
    "FlatCritChanceMod": {
        type: "ad",
        ratio: 1/0.3
    },
    "FlatHPPoolMod": {
        type: "tank",
        ratio: 1/300
    },
    "FlatMPPoolMod": {
        type: "ap",
        ratio: 1/600
    },
    "FlatMagicDamageMod": {
        type: "ap",
        ratio: 1/50
    },
    "FlatPhysicalDamageMod": {
        type: "ad",
        ratio: 1/30
    },
    "FlatSpellBlockMod": {
        type: "tank",
        ratio: 1/40
    },
    "PercentArmorMod": {
        type: "tank",
        ratio: 1/40
    },
    "PercentAttackSpeedMod": {
        type: "ad",
        ratio: 1/0.4
    },
    "PercentHPPoolMod": {
        type: "tank",
        ratio: 1/0.25
    }
};
