/* Des fonctions générales javascript */

function randomElement(array) {
    /* Retourne un élément aléatoire dans un array */
    var i = Math.trunc( Math.random() * array.length );
    return array[i];
}
