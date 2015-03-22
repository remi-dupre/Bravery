# Bravery [![Build Status](https://travis-ci.org/remi100756/Bravery.svg)](https://travis-ci.org/remi100756/Bravery)

### Présentation

Bravery est un clone de [Ultimate Bravery](http://ultimate-bravery.com/), un générateur de builds aléatoires pour league of legends.
L'objectif est de reproduire le site tout en rajoutant de nouveaux modes de jeu.

### Dépendances

#### Inclus dans le site

* [jQuery](http://jquery.com/) - [github](http://github.com/jquery/jquery)
* [Materialize CSS](http://materializecss.com/) - [github](https://github.com/Dogfalo/materialize)
* WebUi Popover - [github](https://github.com/sandywalker/webui-popover)
* [L'api de riot games](https://developer.riotgames.com/api/methods)

#### Outils de développement

* L'ide [c9.io](c9.io) (hébergeur de l'éventuelle [béta](http://bravery-remi100756.c9.io/))
* [npm](https://www.npmjs.org/)
* [grunt](http://gruntjs.com/)

### Installation

Vous pouvez télécharger directement la dernière release dans [la section release](https://github.com/remi100756/Bravery/releases). Le site est purement statique et ne dépend d'aucun serveur particulier. Vous trouverez en téléchargement :
 1. Les sources
 2. Un version minifiée et complète
 3. Une version contenant toutes les ressources, pouvant ainsi fonctionner sans internet

#### Utiliser les sources

Commencez par télécharger grunt, puis installez les dépendances
```
npm install -g grunt-cli
npm update
```
Ensuite vous pouvez soit installer les fichiers nécessaires au développement avec la commande `grunt`, soit créer une version propre et minifié en tappant `grunt makebuild`. Cela aura pour effet de supprimer tous les fichiers inutiles au déploiement et créera une archive contenant les fichiers utiles.
