/* ============================================================
   1) CLÉS LOCALSTORAGE
============================================================ */

const CLE_THEME = "site-theme";
const CLE_AFFICHAGE = "site-display";

/* ============================================================
   2) VALEURS PAR DÉFAUT
============================================================ */

if (!localStorage.getItem(CLE_THEME)) {
    localStorage.setItem(CLE_THEME, "sombre");
}

if (!localStorage.getItem(CLE_AFFICHAGE)) {
    localStorage.setItem(CLE_AFFICHAGE, "liste");
}

/* ============================================================
   3) APPLICATION DU THÈME
============================================================ */

function appliquerTheme() {
    const theme = localStorage.getItem(CLE_THEME);
    document.body.classList.remove("light-theme", "sombre-theme");

    if (theme === "clair") {
        document.body.classList.add("light-theme");
    } else {
        document.body.classList.add("sombre-theme");
    }
}

/* ============================================================
   4) APPLICATION DU MODE D’AFFICHAGE
============================================================ */

function appliquerAffichage() {
    const mode = localStorage.getItem(CLE_AFFICHAGE);

    const blocListe = document.querySelector(".tableau-scroll");
    const blocCartes = document.getElementById("cartes-apprenants");

    if (!blocListe || !blocCartes) return;

    if (mode === "cartes") {
        blocListe.style.display = "none";
        blocCartes.style.display = "grid";
    } else {
        blocCartes.style.display = "none";
        blocListe.style.display = "block";
    }
}

/* ============================================================
   5) SYNCHRO DES RADIOS DU HEADER
============================================================ */

function synchroniserHeader() {
    const radiosHeader = document.querySelectorAll(
        'header input[type="radio"][name="affichage"]'
    );

    const mode = localStorage.getItem(CLE_AFFICHAGE);

    radiosHeader.forEach(radio => {
        radio.checked = (radio.value.toLowerCase() === mode);

        radio.addEventListener("change", () => {
            localStorage.setItem(CLE_AFFICHAGE, radio.value.toLowerCase());
            appliquerAffichage();
        });
    });
}

/* ============================================================
   6) PAGE PRÉFÉRENCES
============================================================ */

function gererPagePreferences() {
    const formulaire = document.getElementById("preferencesForm");
    if (!formulaire) return;

    const selectTheme = document.getElementById("themeSelect");
    const radiosAffichage = formulaire.querySelectorAll(
        'input[name="affichage"]'
    );

    selectTheme.value = localStorage.getItem(CLE_THEME);

    radiosAffichage.forEach(radio => {
        radio.checked =
            radio.value === localStorage.getItem(CLE_AFFICHAGE);
    });

    formulaire.addEventListener("submit", event => {
        event.preventDefault();

        const themeChoisi = selectTheme.value;
        const affichageChoisi = formulaire.querySelector(
            'input[name="affichage"]:checked'
        )?.value || "liste";

        localStorage.setItem(CLE_THEME, themeChoisi);
        localStorage.setItem(CLE_AFFICHAGE, affichageChoisi);

        location.reload();
    });
}

/* ============================================================
   7) CHARGEMENT DES APPRENANTS – LISTE
============================================================ */

function chargerListe() {
    const tbody = document.getElementById("liste-apprenants");
    if (!tbody) return;

    fetch("promo.json")
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";
            data.apprenants.forEach(apprenant => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${apprenant.nom}</td>
                    <td>${apprenant.prenom}</td>
                    <td>${apprenant.ville}</td>
                    <td class="actions">
                        <a href="#" class="voir" aria-label="Voir ${apprenant.prenom} ${apprenant.nom}">
                            <i class="fa-solid fa-eye"></i>
                        </a>
                        <a href="#" class="modifier" aria-label="Modifier ${apprenant.prenom} ${apprenant.nom}">
                            <i class="fa-solid fa-square-pen"></i>
                        </a>
                        <a href="#" class="supprimer" aria-label="Supprimer ${apprenant.prenom} ${apprenant.nom}">
                            <i class="fa-solid fa-trash"></i>
                        </a>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        })
        .catch(err => console.error("Erreur JSON liste :", err));
}

/* ============================================================
   8) CHARGEMENT DES APPRENANTS – CARTES
============================================================ */

function chargerCartes() {
    const container = document.getElementById("cartes-apprenants");
    if (!container) return;

    fetch("promo.json")
        .then(res => res.json())
        .then(data => {
            container.innerHTML = "";
            data.apprenants.forEach(apprenant => {
                const carte = document.createElement("a");
                carte.href = "#";
                carte.className = "carte";
                carte.setAttribute(
                    "aria-label",
                    `Voir les détails de ${apprenant.prenom} ${apprenant.nom}`
                );

                carte.innerHTML = `
                    <h3>${apprenant.prenom} ${apprenant.nom}</h3>
                    <p>Ville : ${apprenant.ville}</p>
                    <span class="bouton">Détails</span>
                `;

                container.appendChild(carte);
            });
        })
        .catch(err => console.error("Erreur JSON cartes :", err));
}

/* ============================================================
   9) INITIALISATION GLOBALE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    appliquerTheme();
    appliquerAffichage();
    synchroniserHeader();
    gererPagePreferences();
    chargerListe();
    chargerCartes();
});
