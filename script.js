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
                ? "images/icon/eye-solid-full.svg"
                : "images/icon/eye-solid-full-white.svg";
        }
    });
}

/* ============================================================
   8) CHARGEMENT DES APPRENANTS – LISTE
============================================================ */

function chargerListe() {
    const tbody = document.getElementById("liste-apprenants");
    if (!tbody) return;

    fetch("../data/promo.json")
        .then(res => res.json())
        .then(data => {
            tbody.innerHTML = "";

            data.apprenants.forEach(apprenant => {
                const tr = document.createElement("tr");

                tr.innerHTML = `
                    <td>${apprenant.nom}</td>
                    <td>${apprenant.prenom}</td>
                    <td>${apprenant.ville}</td>
                    <td class="action">
                        <a href="#" class="voir" aria-label="Voir ${apprenant.prenom} ${apprenant.nom}">
                            <img src="../images/icon/eye-solid-full-white.svg" alt="voir profil" class="icon">
                        </a>
                        <div class="modale-info-apprenant"></div>
                    </td>
                `;

                const boutonVoir = tr.querySelector(".voir");
                const modale = tr.querySelector(".modale-info-apprenant")

                boutonVoir.addEventListener("click", () => {
                    afficherModaleApprenant(apprenant, modale);
                });

                if (window.innerWidth > 576) {
                    boutonVoir.addEventListener("mouseleave", () => {
                        cacherModaleApprenant(modale);
                    });
                }

                tbody.appendChild(tr);
            });
            updateIconsTheme();
        })
        .catch(err => console.error("Erreur JSON liste :", err));
}


/* ============================================================
   9) CHARGEMENT DES APPRENANTS – CARTES
============================================================ */

function chargerCartes() {
    const container = document.getElementById("cartes-apprenants");
    if (!container) return;

    fetch("../data/promo.json")
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
                    <div class="modale-info-apprenant"></div>
                `;

                const boutonDetails = carte.querySelector(".bouton");
                const modale = carte.querySelector(".modale-info-apprenant");

                boutonDetails.addEventListener("click", (e) => {
                    afficherModaleApprenant(apprenant, modale);
                });

                if (window.innerWidth > 576) {
                    carte.addEventListener("mouseleave", () => {
                        cacherModaleApprenant(modale);
                    });
                }

                container.appendChild(carte);
            });
        })
        .catch(err => console.error("Erreur JSON cartes :", err));
}

/* ============================================================
   10) AFFICHAGE DU CONTENU JSON – VUE MODALE
============================================================*/

function afficherModaleApprenant(apprenant, modale) {
    if (!modale) return;

    document.querySelectorAll(".modale-info-apprenant.visible").forEach(otherModale => {
        if (otherModale !== modale) {
            cacherModaleApprenant(otherModale);
        }
    });

    modale.innerHTML = `
    <div class="fiche-header">
        <img src="../images/avatar/${apprenant.avatar}" alt="Avatar de ${apprenant.prenom}">
        <div class="infos-principales">
            <div class="ligne-info">
                <span class="label">Nom</span>
                <span class="valeur">${apprenant.nom}</span>
            </div>
            <div class="ligne-info">
                <span class="label">Prénom</span>
                <span class="valeur">${apprenant.prenom}</span>
            </div>
            <div class="ligne-info">
                <span class="label">Ville</span>
                <span class="valeur">${apprenant.ville}</span>
            </div>
        </div>
    </div>

    <div class="zone-texte">
        ${apprenant.anecdotes || "Aucune information disponible."}
    </div>
    
    <button class="modale-fermer" aria-label="Fermer la fenêtre">Fermer la fiche</button>
`;


    modale.classList.add("visible");

    const boutonFermer = modale.querySelector(".modale-fermer");
    if (boutonFermer) {
        boutonFermer.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            cacherModaleApprenant(modale);
        });
    }
}

function cacherModaleApprenant(modale) {
    if (!modale) return;
    modale.classList.remove("visible");
}



/* ============================================================
   11) CHARGEMENT DE LA CARTE DE FRANCE
============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       SÉCURITÉ : vérifier que la page contient une carte
       et que la librairie Leaflet est bien chargée
    ============================================================ */
    const mapContainer = document.getElementById("map");
    if (!mapContainer || typeof L === "undefined") return;

    // Affichage carte France
    const map = L.map("map", {
        zoomSnap: 0.25
    }).setView([47, 1.8883335], 5.6);

    // Fond de carte OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Mettre les coordonnées
    function coordonnee() {

        fetch("../data/promo.json")
            .then(res => res.json())
            .then(data => {
                data.apprenants.forEach(apprenant => {
                    const latitude = apprenant.coordonnees.latitude;
                    const longitude = apprenant.coordonnees.longitude;
                    const marker = L.marker([latitude, longitude]).addTo(map);

                    marker.bindPopup(`
                        <div><img src="../images/avatar/${apprenant.avatar}" style="max-width: 100%; height: auto;</div><br>
                        <div style="text-align: center;">
                            <strong>${apprenant.prenom} ${apprenant.nom}</strong><br>
                            ${apprenant.ville}
                        </div>
                    `);
                });
            })
            .catch(err => console.error("Erreur Chargement du JSON", err));
    } coordonnee();
});

/* ============================================================
   12) FERMETURE AUTO DU MENU BURGER AU CLIC AILLEURS (MOBILE)
============================================================ */
function activerFermetureBurger() {
    const menuToggle = document.getElementById("menu-toggle");
    const menuLabel = document.querySelector('label[for="menu-toggle"]');
    const nav = document.querySelector("nav.header-droite");

    if (!menuToggle || !menuLabel || !nav) return;

    document.addEventListener("click", (e) => {
        if (!menuToggle.checked) return;

        const clicDansMenu = nav.contains(e.target);
        const clicSurBurger =
            menuLabel.contains(e.target) || menuToggle.contains(e.target);

        if (clicDansMenu || clicSurBurger) return;

        menuToggle.checked = false;
    });
}

/* ============================================================
   13) INITIALISATION GLOBALE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    appliquerTheme();
    appliquerAffichage();
    synchroniserHeader();
    gererPagePreferences();
    chargerListe();
    chargerCartes();
    activerFermetureBurger();
});

