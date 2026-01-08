# 📍 Promo ENI – Gestion des apprenants & carte interactive

Projet web réalisé dans le cadre de la formation **Développeur Web & Web Mobile (ENI)**.
Cette application permet d’afficher les apprenants d’une promotion sous forme de **liste**, de **cartes**, et de les localiser sur une **carte interactive Leaflet**, à partir de données JSON.

---

## 🎯 Objectifs du projet

- Manipuler des données **JSON** côté client
- Générer dynamiquement du contenu HTML en **JavaScript**
- Implémenter une **carte interactive** avec Leaflet
- Gérer les préférences utilisateur (thème, affichage) via **localStorage**
- Structurer un projet front-end clair, lisible et maintenable

---

## 🚀 Fonctionnalités

- ✅ Affichage des apprenants :
  - en **liste** (tableau)
  - en **cartes**
- ✅ Carte interactive (Leaflet + OpenStreetMap) :
  - marqueurs générés depuis les coordonnées du JSON
  - popup avec nom et prénom au clic
- ✅ Thème **clair / sombre** persistant
- ✅ Choix du mode d’affichage (liste ou cartes)
- ✅ Navigation multi-pages :
  - Accueil
  - Carte
  - Préférences
  - Informations

---

## 🗂️ Structure du projet

```
├── index.html            # Page d’accueil (liste / cartes)
├── carte.html            # Carte Leaflet
├── preferences.html      # Préférences utilisateur
├── informations.html     # Informations générales
│
├── promo.json            # Données des apprenants
├── script.js             # Logique JavaScript (DOM, Leaflet, localStorage)
├── style.css             # Styles CSS (thèmes, responsive)
│
├── images/               # Logos et icônes
└── README.md
```

---

## 🧠 Données utilisées

Les données proviennent d’un fichier `promo.json` contenant pour chaque apprenant :

- nom / prénom
- ville
- anecdotes
- coordonnées géographiques (latitude / longitude)

Ces coordonnées sont utilisées pour positionner les marqueurs sur la carte.

---

## 🛠️ Technologies utilisées

- **HTML5**
- **CSS3** (responsive, thèmes)
- **JavaScript (ES6+)**
- **Leaflet.js** (OpenStreetMap)
- **LocalStorage**
- **Git / GitHub**

---

## ▶️ Lancer le projet

1. Cloner le dépôt :
```bash
git clone https://github.com/votre-compte/nom-du-repo.git
```

2. Ouvrir le projet dans un navigateur :
- soit via un serveur local (Live Server recommandé)
- soit en ouvrant directement `index.html`

---

## 📌 Remarques

- Projet **100 % front-end**, sans framework
- Code volontairement structuré et commenté à des fins pédagogiques
- Compatible desktop / tablette / mobile

---

## 👤 Auteur

Projet réalisé par **Réda Touzani** dans le cadre de la formation ENI – Développeur Web & Web Mobile.