window.addEventListener("DOMContentLoaded", init);

// J'initialise les paramètres en lisant le localStorage
function init() {
    const stored = localStorage.getItem("parametres");

    if (stored) {
        try {
            const parametres = JSON.parse(stored);

            // Appliquer le thème si l'élément existe
            const selectTheme = document.querySelector('select[name="theme"]');
            if (selectTheme && parametres.theme) {
                selectTheme.value = parametres.theme;
            }

            // Appliquer le type d'affichage (on cible le formulaire pour éviter
            // les radios du header qui ont le même name)
            if (parametres.affichage) {
                const affich = String(parametres.affichage).toLowerCase();
                const radio = document.querySelector(
                    `form.parametres input[name="affichage"][value="${affich}"]`
                );
                if (radio) radio.checked = true;
            }
        } catch (erreur) {
            console.warn("parametres localStorage non valides :", erreur);
        }
    }

    // Enregistrer le listener après que le DOM soit prêt
    const saveBtn = document.getElementById("save");
    if (saveBtn) {
        saveBtn.addEventListener("click", savePreferences);
    } else {
        console.warn('Bouton "#save" introuvable.');
    }
}

// Sauvegarde des préférences dans le localStorage
function savePreferences(event) {
    if (event && typeof event.preventDefault === 'function') event.preventDefault();

    const select = document.querySelector('select[name="theme"]');
    const radio = document.querySelector('form.parametres input[name="affichage"]:checked');

    if (!select || !radio) {
        console.warn("Sélecteur de thème ou bouton radio introuvable / non sélectionné.");
        return;
    }

    const theme = select.value;
    const affichage = radio.value;

    const parametres = {
        theme,
        affichage
    };

    try {
        localStorage.setItem("parametres", JSON.stringify(parametres));
    } catch (erreur) {
        console.error("Impossible d'enregistrer dans localStorage :", erreur);
    }
}
