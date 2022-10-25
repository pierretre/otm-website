# otm
OTM project

**Installation du projet :**

Préalablement installer git et nodejs sur son pc.

Puis :
Dans le terminal git (Clic droit dans votre explorateur de fichier > Git bash here), exécuter la commande : _git clone git@github.com:out-the-mud/otm-website.git_.
Cela téléchargera le projet sur votre pc à l'endroit où vous vous êtes placé dans le terminal.



**Lancement du site web en local :**
- Se déplacer dans otm-website>src>webapp (dans un terminal)
- Exécuter la comande : _npm install_
- (Recommandé) Exécuter la commande : _npm -g install nodemon_
- Exécuter la commande : _nodemon server.js_


Le terminal doit afficher un message montrant bien que le serveur a démarré sur le port 8080
  
- Aller dans votre navigateur (Chrome ou Mozilla Firefox)
- Aller à l'url : _localhost:8080_

Voilà, le site web est lancé en local sur votre machine.


**Modification du site web : **

Pour effectuer des modifications dans le code source du programme, les deux grandes parties sont :
- Serveur : dans le dossier _webapp>app_
- Client (riche) : dans le dossier _webapp>public_ 

Les modifications côté serveur sont automatiquement prises en compte par nodejs lorsqu'on sauvegarde le fichier modifié, de même pour le coté client même si rien ne l'indique. Cependant, il est nécessaire de recharger la page web sur le navigateur pour voir les modifications apparaître à l'écran.

