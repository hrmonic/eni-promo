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
        radio.checked = (radio.value === localStorage.getItem(CLE_AFFICHAGE));
    });

    formulaire.addEventListener("submit", event => {
        event.preventDefault();

        const themeChoisi = selectTheme.value;
        const affichageChoisi =
            formulaire.querySelector('input[name="affichage"]:checked')?.value || "liste";

        localStorage.setItem(CLE_THEME, themeChoisi);
        localStorage.setItem(CLE_AFFICHAGE, affichageChoisi);

        location.reload();
    });
}

/* ============================================================
   7) MISE À JOUR DES ICÔNES (BLANC / NOIR)
============================================================ */

function updateIconsTheme() {
    const isLightTheme = document.body.classList.contains("light-theme");

    document.querySelectorAll("img.icon").forEach(img => {

        if (img.src.includes("eye-solid-full")) {
            img.src = isLightTheme
                ? "images/eye-solid-full.svg"
                : "images/eye-solid-full-white.svg";
        }

        if (img.src.includes("pen-square-solid")) {
            img.src = isLightTheme
                ? "images/pen-square-solid.svg"
                : "images/pen-square-solid-white.svg";
        }

        if (img.src.includes("trash-solid")) {
            img.src = isLightTheme
                ? "images/trash-solid.svg"
                : "images/trash-solid white.svg";
        }
    });
}

/* ============================================================
   8) CHARGEMENT DES APPRENANTS – LISTE
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
                            <img src="images/eye-solid-full-white.svg" alt="voir profil" class="icon">
                        </a>
                        <a href="#" class="modifier" aria-label="Modifier ${apprenant.prenom} ${apprenant.nom}">
                            <img src="images/pen-square-solid-white.svg" alt="modifier profil" class="icon">
                        </a>
                        <a href="#" class="supprimer" aria-label="Supprimer ${apprenant.prenom} ${apprenant.nom}">
                            <img src="images/trash-solid-white.svg" alt="supprimer profil" class="icon">
                        </a>
                    </td>
                `;

                tbody.appendChild(tr);
            });

            updateIconsTheme(); // 🔹 synchronisation après création des icônes
        })
        .catch(err => console.error("Erreur JSON liste :", err));
}

/* ============================================================
   9) CHARGEMENT DES APPRENANTS – CARTES
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
   10) CHARGEMENT DE LA CARTE
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    // Affichage carte France
    const map = L.map("map", {
        zoomSnap: 0.25
    }).setView([47, 1.8883335], 5.6);

    // Fond de carte OpenStreetMap (récupéré via le tuto)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Mettre les coordonnées
    function coordonnee() {

        fetch("promo.json")
            .then(res => res.json())
            .then(data => {
                data.apprenants.forEach(apprenant => {
                    const latitude = apprenant.coordonnees.latitude;
                    const longitude = apprenant.coordonnees.longitude;
                    const marker = L.marker([latitude, longitude]).addTo(map);

                    marker.bindPopup(`${apprenant.prenom} ${apprenant.nom}`)

                });
            })
            .catch(err => console.error("Erreur Chargement du JSON", err));
    } coordonnee();
});


/* ============================================================
   11) INITIALISATION GLOBALE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    appliquerTheme();
    appliquerAffichage();
    synchroniserHeader();
    gererPagePreferences();
    chargerListe();
    chargerCartes();
});
