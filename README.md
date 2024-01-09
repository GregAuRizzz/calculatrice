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
