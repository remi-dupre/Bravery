# coding=utf-8

import os, sys
import urllib.request as url
import json

INSTALL_DIRECTORY = "lol-api"
CDN_URL = "http://ddragon.leagueoflegends.com/cdn"
API_URL = "https://global.api.pvp.net/api/lol/static-data/euw/v1.2"
API_KEY = "d19e6095-3a97-4721-b23d-a7710557acb1"

def creerDossier(fichier) :
    if not os.path.exists(fichier) :
        os.makedirs(fichier)
        
def imgUrl(img) :
    return CDN_URL +"/5.5.2/img/"+ img["group"] + "/" + img["full"]
    
def imgFolder(img) :
    creerDossier(INSTALL_DIRECTORY + "/" + img["group"])
    return INSTALL_DIRECTORY +"/"+ img["group"] + "/" + img["full"]
    
def skinFile(champ, skin) :
    return champ["key"] +"_"+ str(skin["num"]) + ".jpg"
    
def skinUrl(champ, skin) :
    return CDN_URL + "/img/champion/loading/" + skinFile(champ, skin)
    
def startProgress(title):
    global progress_x
    sys.stdout.write(title + ": [" + "-"*40 + "]" + chr(8)*41)
    sys.stdout.flush()
    progress_x = 0

def progress(x):
    global progress_x
    avant = int(progress_x * 40)
    progress_x = progress_x + x
    x = int(progress_x * 40) - avant
    sys.stdout.write("#" * x)
    sys.stdout.flush()

def endProgress():
    sys.stdout.write("#" * (40 - int(progress_x*40)) + "]\n")
    sys.stdout.flush()

creerDossier(INSTALL_DIRECTORY)

print("Téléchargement de item.json ...")
url.urlretrieve(API_URL + "/item?locale=fr_FR&itemListData=all&api_key="+API_KEY, INSTALL_DIRECTORY+"/item.json")

print("Téléchargement de champion.json ...")
url.urlretrieve(API_URL + "/champion?locale=fr_FR&champData=all&api_key="+API_KEY, INSTALL_DIRECTORY+"/champion.json")

# Téléchargement des icones d'items

startProgress("Icones des items")
fichier = open(INSTALL_DIRECTORY+"/item.json")
items = json.load(fichier)
fichier.close()

for item in items["data"] :
    item = items["data"][item]
    url.urlretrieve(imgUrl(item["image"]), imgFolder(item["image"]))
    progress(1/len(items["data"]))
    
endProgress()

# Téléchargement des icones de champions

startProgress("Icones champions")
fichier = open(INSTALL_DIRECTORY+"/champion.json")
champions = json.load(fichier)
fichier.close()

for champ in champions["data"] :
    champ = champions["data"][champ]
    url.urlretrieve(imgUrl(champ["image"]), imgFolder(champ["image"]))
    progress(1/len(champions["data"]))
    
endProgress()


# Téléchargement des icones de champions

creerDossier(INSTALL_DIRECTORY + "/champion/loading")
startProgress("Images champions")
failed = []

for champ in champions["data"] :
    champ = champions["data"][champ]
    for skin in champ["skins"] :
        try :
            url.urlretrieve(skinUrl(champ, skin), INSTALL_DIRECTORY + "/champion/loading/" + skinFile(champ, skin))
        except :
            failed += [ skinFile(champ, skin) ]
            
    progress(1/len(champions["data"]))
    
endProgress()
print("Liste des échecs :")
for fich in failed :
    print(" - " + fich)


# Téléchargements à l'unité

print("Téléchargement des icones de cartes ...")
creerDossier(INSTALL_DIRECTORY + "/map")
url.urlretrieve("http://cdn.leagueoflegends.com/game-info/1.1.9/images/content/modes-sr.jpg", INSTALL_DIRECTORY + "/map/modes-sr.jpg")
url.urlretrieve("http://cdn.leagueoflegends.com/game-info/1.1.9/images/content/modes-tt.jpg", INSTALL_DIRECTORY + "/map/modes-tt.jpg")
url.urlretrieve("http://cdn.leagueoflegends.com/game-info/1.1.9/images/content/modes-ha.jpg", INSTALL_DIRECTORY + "/map/modes-ha.jpg")
url.urlretrieve("http://cdn.leagueoflegends.com/game-info/1.1.9/images/content/modes-cs.jpg", INSTALL_DIRECTORY + "/map/modes-cs.jpg")

print("Téléchargement des icones de l'ui ...")  
creerDossier(INSTALL_DIRECTORY + "/ui")
url.urlretrieve("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/champion.png", INSTALL_DIRECTORY + "/ui/champion.png")
url.urlretrieve("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/gold.png", INSTALL_DIRECTORY + "/ui/gold.png")
url.urlretrieve("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/items.png", INSTALL_DIRECTORY + "/ui/items.png")
url.urlretrieve("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/minion.png", INSTALL_DIRECTORY + "/ui/minion.png")
url.urlretrieve("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/score.png", INSTALL_DIRECTORY + "/ui/score.png")
url.urlretrieve("http://ddragon.leagueoflegends.com/cdn/5.2.1/img/ui/spells.png", INSTALL_DIRECTORY + "/ui/spells.png")