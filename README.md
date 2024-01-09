# Calculatrice HTML/CSS/JS
Dans le cadre d'une SAE Web, j'ai réalisé une calculatrice html/css/js ainsi qu'un mode graphique utilisant les canvas. Cela m'a permis de m'initier à Javascript pour avoir quelques bases. J'ai également du refaire l'équivalent de la fonction éval, à mon échelle.

# Fonctionnemment 
La calculatrice s’appuie sur 4 fonctions importantes : calcul(), calculParenthèses(), calculMultiplicationDivision(), calculAdditionSoustraction(). Ainsi que les fonctions dessinerFonction() et dessinerLeRepere(), qui concernent la partie graphique. Une fois que la fonction calcul() est appelée, elle va à son tour appeler la fonction calculParenthèses() qui va calculer le contenu des parenthèses à l'aide des fonctions calculMultiplicationDivision() et calculAdditionSoustraction(). Une fois les parenthèses disparues, la fonction calcul va rappeler les fonctions calculMultiplicationDivision() et calculAdditionSoustraction(). Voici un schéma ci-dessous qui donnera un exemple concret :

 => calcul()
 
 ===> calculParenthèses()
 
 ======> calculMultiplicationDivision()
 
 ======> calculAdditionSoustraction()
 
 ===> calculMultiplicationDivision()
 
 ===> calculAdditionSoustraction()


Les touches du claviers fonctionnent aussi. A l’aide d’un addEventListener de type keydown, on peut faire  ; entrée pour calculer ; Retour pour effacer un caractère ; ainsi que tous les opérateurs et les numéros. Pour stocker le calcul en cours, j’ai décidé d’utiliser une liste, par exemple 4+3 se représente par [‘’4’’,’’+’’,’’3’’], ce qui facilite la manipulation à l’aide de split(), join(), splice(), ect

Pour ce qui est du canvas, c’est vraiment la partie ou j’ai eu du mal, puisque je ne savais pas comment afficher une courbe d’une fonction mais en réfléchissant bien, le graphique c’est qu’une suite de points en fonction d’une fonction. Donc, j’ai d’abord tracé le repère en faisant simplement taille/2 et une ligne, et ensuite j’ai fait une boucle for pour calculer les X, ensuite le reste (pour zoomer) ça a été super intuitif puisqu’il fallait juste modifier ma boucle pour que le x et le y varient.

# Comme pour le calcul(), j’ai découpé en plusieurs fonctions :
=>dessinerFonction()
====> dessinerLeRepere()
======> boucle for qui appel en boucle la fonction calcul() (pour connaître y)
  
# Voici quelques fonctions qui font partie du projet qui sont utiles :
reset() => supprime tous les calculs et graph (sauf l’historique)
effacer() => enlève le dernier terme 
diminuerXY() => Diminuer l’intervalle XY
augmenterXY() => Augmenter l’intervalle XY
