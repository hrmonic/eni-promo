/* ============================================================
   1) CLÉS DU LOCALSTORAGE
   Ces constantes servent à stocker les préférences du site.
============================================================ */

const THEME_KEY = "site-theme";
const DISPLAY_KEY = "site-display";

/* ============================================================
   2) VALEURS PAR DÉFAUT
   Si aucune préférence n’existe encore, on en crée une.
============================================================ */

// Thème
let savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === null) {
    savedTheme = "sombre";
    localStorage.setItem(THEME_KEY, savedTheme);
}

// Affichage
let savedDisplay = localStorage.getItem(DISPLAY_KEY);
if (savedDisplay === null) {
    savedDisplay = "liste";
    localStorage.setItem(DISPLAY_KEY, savedDisplay);
}

/* ============================================================
   3) APPLICATION DU THÈME
============================================================ */

// On nettoie d’abord les classes existantes
document.body.classList.remove("light-theme", "sombre-theme");

// Puis on applique le bon thème
if (savedTheme === "clair") {
    document.body.classList.add("light-theme");
} else {
    document.body.classList.add("sombre-theme");
}

/* ============================================================
   4) APPLICATION DU MODE D’AFFICHAGE
============================================================ */

// On enlève les anciennes classes
document.body.classList.remove("display-liste", "display-cartes");

// Puis on applique la bonne
if (savedDisplay === "cartes") {
    document.body.classList.add("display-cartes");
} else {
    document.body.classList.add("display-liste");
}

/* ============================================================
   5) SYNCHRONISATION DES RADIOS DU HEADER
   (si présents sur la page)
============================================================ */

const headerRadios = document.querySelectorAll('input[name="affichageHeader"]');

headerRadios.forEach(function (radio) {
    radio.checked = (radio.value === savedDisplay);
});

/* ============================================================
   6) PAGE PRÉFÉRENCES
   Synchroniser le formulaire et enregistrer les choix
============================================================ */

const form = document.getElementById("preferencesForm");

if (form !== null) {

    const themeSelect = document.getElementById("themeSelect");

    // Mettre le thème actuel dans le select
    themeSelect.value = savedTheme;

    // Synchroniser les radios du formulaire
    const formRadios = form.querySelectorAll('input[name="affichage"]');
    formRadios.forEach(function (radio) {
        radio.checked = (radio.value === savedDisplay);
    });

    // Quand on clique sur "Enregistrer"
    form.addEventListener("submit", function (event) {

        event.preventDefault(); // empêche le rechargement automatique

        const selectedTheme = themeSelect.value;

        const checkedRadio = form.querySelector('input[name="affichage"]:checked');
        const selectedDisplay = checkedRadio ? checkedRadio.value : "liste";

        // Sauvegarde dans le localStorage
        localStorage.setItem(THEME_KEY, selectedTheme);
        localStorage.setItem(DISPLAY_KEY, selectedDisplay);

        // Recharge la page pour appliquer les préférences
        location.reload();
    });
}

/* ============================================================
    7) PAGE LISTE DES APPRENANTS
Charger les apprenants depuis le fichier JSON et les insérer
============================================================ */

fetch("promo.json")
    .then(response => response.json())
    .then(data => {
        const tbody = document.getElementById("liste-apprenants");
        data.apprenants.forEach(apprenant => {
            const tr = document.createElement("tr");

            tr.innerHTML = 
                `<td>${apprenant.nom}</td>
                <td>${apprenant.prenom}</td>
                <td>${apprenant.ville}</td>
                <td class="actions"> 
                    <a href="#" title="Voir" aria-label="Voir ${apprenant.prenom} ${apprenant.nom}"> 
                    <i class="fa-solid fa-eye"></i>
                    </a>
                    <a href="#" title="Modifier" aria-label="Modifier ${apprenant.prenom} ${apprenant.nom}">
                    <i class="fa-solid fa-square-pen"></i>
                    </a>
                    <a href="#" title="Supprimer" aria-label="Supprimer ${apprenant.prenom} ${apprenant.nom}">
                    <i class="fa-solid fa-trash"></i>
                    </a>
                </td>`;
            tbody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error("Erreur lors du chargement du fichier JSON :", error);
    });
