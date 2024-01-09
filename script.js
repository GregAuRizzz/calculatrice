// Déclaration des variables :
var listeDeTout = [];
var result = [];
var temp = "";
const allowedValues = ["x", ",", "+", "-", "*","x", "/", "%", "(", ")", "**"];
var historique = [];

var boutons = document.getElementsByClassName("addNum");



document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (key === "Enter") {
        calcul(listeDeTout);
    } else if (!isNaN(key) || allowedValues.includes(key)) {
        ajouternumero(key);
    } else if (key === "Backspace") {
        effacer();
    }
});

// Quelques event click pour les différents boutons :
document.getElementById("calculer").addEventListener("click", function (event) { calcul(listeDeTout); });
document.getElementById("effacer").addEventListener("click", function (event) { effacer(); });
document.getElementById("reload").addEventListener("click", function (event) { reset(); });
document.getElementById("diminuer").addEventListener("click", function (event) { diminuerX(); });
document.getElementById("augmenter").addEventListener("click", function (event) { augmenterX(); });
document.getElementById("dessiner").addEventListener("click", function (event) { dessinerFonction(); });
document.getElementById("x").addEventListener("click", function (event) { ajouternumero("x"); });

// la faut Faire une boucle pour éviter d'avoir a faire un addEventListener pour chaque bouton :
document.addEventListener("DOMContentLoaded", function () {
    for (let i = 0; i < boutons.length - 1; i++) {
        boutons[i].addEventListener("click", function (event) {
            var num = boutons[i].textContent;
            num.toString();
            ajouternumero(num);
        });
    }
});

// Fonction pour ajouter un numéro dans la liste :
function ajouternumero(caractere) {
    document.getElementById("operations").textContent += caractere;

    listeDeTout = document.getElementById("operations").textContent.split("");

    var scrollingContainer = document.querySelector(".scrolling-container");
    scrollingContainer.scrollLeft = scrollingContainer.scrollWidth;
}

// Fonction pour calculer tout ce qui est entre parenthèses :
function calculParentheses(listeDeTout) {

    while (listeDeTout.includes("(")) {
        var start = listeDeTout.lastIndexOf("(");
        var end = listeDeTout.indexOf(")", start);
        var sublist = listeDeTout.slice(start+1, end);
        var sublistLen = sublist.length;

        for (i=0; i<sublist.length; i+=1) {
            if (!isNaN(sublist[i])) {
                sublist[i] = parseFloat(sublist[i]);
            }
        }
        sublist = calculMultiplicationDivision(sublist);
        sublist = calculAdditionSoustraction(sublist);

        listeDeTout.splice(start, sublistLen+2, sublist);
    }
    return listeDeTout;
}


// Fonction pour calculer les multiplications ect ect a partir d"une liste :
function calculMultiplicationDivision(listeDeTout) {
    resultat = parseFloat(listeDeTout[0]);
    while (listeDeTout.includes("*") || listeDeTout.includes("/") || listeDeTout.includes("%") || listeDeTout.includes("^") || listeDeTout.includes("%")) {
        for (i= 1; i < listeDeTout.length; i+=1) {
            switch (listeDeTout[i]) {
                case "*":
                    listeDeTout[i-1] = listeDeTout[i-1] * listeDeTout[i + 1];
                    listeDeTout.splice(i,2);
                    break;
                case "/":
                    listeDeTout[i-1] = listeDeTout[i-1] / listeDeTout[i + 1];
                    listeDeTout.splice(i,2);
                    break;
                case "%":
                    listeDeTout[i-1] = listeDeTout[i-1] % listeDeTout[i + 1];
                    listeDeTout.splice(i,2);
                    break;
                case "^":
                    listeDeTout[i-1] = listeDeTout[i-1] ** listeDeTout[i + 1];
                    listeDeTout.splice(i,2);
                    break;
                case "%":
                    listeDeTout[i-1] = listeDeTout[i-1] % listeDeTout[i + 1];
                    listeDeTout.splice(i,2);
                    break;
            }
        }
    }
    return listeDeTout;
}

// Fonction pour calculer les additions ect ect a partir d"une liste :
function calculAdditionSoustraction(liste) {
    let resultat = parseFloat(liste[0]);

    for (let i = 1; i < liste.length; i += 2) {
        if (liste[i] == "-") {
            resultat -= parseFloat(liste[i + 1]);
        };
        if (liste[i] == "+") {
            resultat += parseFloat(liste[i + 1]);
        };
    };
    return resultat;
}

// Fonction calcul (un peu comme la fonction main) :
function calcul(listeDeTout, graph = false) {
    temp = "";
    let isNegative = false;

    // combine les chiffres :
    for (let i = 0; i < listeDeTout.length; i++) {
        if (typeof listeDeTout[i] === "string") {
            listeDeTout[i] = listeDeTout[i].replace(/,/g, ".");
        }
        if (listeDeTout[i] === "-" && (i === 0 || isNaN(listeDeTout[i - 1]))) {
            // Gérer les nombres négatifs
            isNegative = true;
        } else if (!isNaN(listeDeTout[i]) || listeDeTout[i] === "." || listeDeTout[i] === ",") {
            // Gérer les chiffres et les séparateurs décimaux
            temp += listeDeTout[i];
        } else {
            // Gérer les opérateurs et autres caractères
            if (temp !== "") {
                result.push(isNegative ? -parseFloat(temp) : parseFloat(temp));
                temp = "";
                isNegative = false;
            }
            result.push(listeDeTout[i]);
        }
    }
    // Ajoute le dernier chiffre :
    if (temp !== "") {
        result.push(temp);
    }
    temp = "";
    listeDeTout = result;
    result = [];

    // Supprime les espaces vides :
    listeDeTout = listeDeTout.filter((element)=> element !== "");

    // Tout calculer :
    listeDeTout = calculParentheses(listeDeTout);
    listeDeTout = calculMultiplicationDivision(listeDeTout)
    let resultat = calculAdditionSoustraction(listeDeTout);

    // Afficher le résultat :
    var resultatElement = document.getElementById("resultat");
    if (listeDeTout.length == 0) {
        resultatElement.innerHTML = "";
    }
    else if (isNaN(resultat) == true ) {
        resultatElement.innerHTML = "Format Invalide";
    }
    else {
        resultatElement.innerHTML = resultat;
    }
    var calculcomplet = document.getElementById("operations").textContent + " = " + resultat + " ; ";

    // Ajouter le calcul au historique :
    if (!historique.includes(calculcomplet) && graph == false && isNaN(resultat) == false) {
        historique.push(calculcomplet);
        document.getElementById("historique").innerHTML += historique[historique.length -1];
    }
    return isNaN(resultat) ? false : resultat;
}


// Fonction pour reset tout :
function reset() {
    listeDeTout = [];
    document.getElementById("operations").textContent = "" ;
    document.getElementById("resultat").textContent = "";
    dessinerLeRepere(AxeXY);
    result = [];
    temp = "";
}

// Fonction pour effacer le dernier caractère (le dernier élément de la liste):
function effacer(){
    listeDeTout.pop();
    document.getElementById("operations").textContent = listeDeTout.join("") ;
    if (listeDeTout.length == 0) {
        document.getElementById("resultat").textContent = "";
    }
}


// Dessiner le repère X et Y avec les numéros
function dessinerLeRepere(AxeXY) {
    var canvas = document.getElementById("graphCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";

    // Axe Horizontal (X)
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Axe vertical (Y)
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();


    // Graduations sur l'axe x (voir doc pour re comprendre)
    for (let x = -AxeXY; x <= AxeXY; x += 10) {
        const text = x.toString();
        const textMetrics = ctx.measureText(text);
        const textWidth = textMetrics.width;
        const textHeight = textMetrics.actualBoundingBoxAscent;

        ctx.fillText(
            text,
            canvas.width / 2 + x * (canvas.width / (2 * AxeXY)) - textWidth / 2,
            canvas.height / 2 + textHeight + 5  // Ajustez la position verticale pour éviter le chevauchement
        );
    }
    // Graduations sur l'axe y
    for (let y = -AxeXY; y <= AxeXY; y += 10) {
        if (y !== 0) {
            ctx.fillText(y, canvas.width / 2 + 10, canvas.height / 2 - y * (canvas.height / (2 * AxeXY)));
        }
    }
}

var AxeXY = 20;
dessinerLeRepere(AxeXY);

function augmenterX() {
    AxeXY += 50;
    dessinerLeRepere(AxeXY);
    dessinerFonction();
}
function diminuerX() {
    if (AxeXY > 50) {
        AxeXY -= 50;
        dessinerLeRepere(AxeXY);
        dessinerFonction();
    }
    else {
        dessinerLeRepere(AxeXY);
        dessinerFonction();
    }
}

// Dessiner la fonction :
function dessinerFonction() {
    var canvas = document.getElementById("graphCanvas");
    var ctx = canvas.getContext("2d");
    var couleur = "red";

    // Effacer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner les axes
    dessinerLeRepere(AxeXY);

    // Dessiner la fonction
    ctx.beginPath();
    ctx.strokeStyle = couleur;
    ctx.lineWidth = 2;
    if (listeDeTout.length > 0) {
        for (let x = -AxeXY; x <= AxeXY; x += 0.1) {
            const y = -calcul(listeDeTout.map(element => (element === "x") ? x : element), true);
            if (y == false && y != -0) {
                document.getElementById("resultat").textContent = "La fonction rentré est invalide"
                break;
            }
            const canvasX = canvas.width / 2 + x * (canvas.width / (2 * AxeXY));
            const canvasY = canvas.height / 2 + y * (canvas.height / (2 * AxeXY));

            document.getElementById("resultat").textContent = ""
            if (x === -AxeXY) {
                ctx.moveTo(canvasX, canvasY);
            } else {
                ctx.lineTo(canvasX, canvasY);
            }
        }
    }
    ctx.stroke();
}