# 📍 ENI – Promo EDWM2511FT

Projet **front‑end** réalisé dans le cadre de la formation **Développeur Web & Web Mobile – ENI**.

Cette application permet de consulter les apprenants d’une promotion selon plusieurs modes de visualisation, avec une interface moderne, responsive et entièrement dynamique.

---

## 🎯 Objectifs pédagogiques

Ce projet a pour but de mettre en pratique :

* La manipulation du **DOM en JavaScript natif**
* Le chargement et l’exploitation de données **JSON**
* La gestion d’état via **localStorage**
* La mise en place d’une **carte interactive avec Leaflet.js**
* La création d’une interface **responsive (adaptée mobile/tablette/desktop)**
* Le respect des bonnes pratiques d’**accessibilité web**

---

## 🧩 Fonctionnalités principales

### 🔄 Affichage Liste / Cartes

* Sélecteur dans le header
* Choix mémorisé dans `localStorage`
* Synchronisation automatique entre les pages

### 🌗 Thème Clair / Sombre

* Sélection via la page Préférences
* Persistance du thème entre les sessions
* Implémentation via **variables CSS globales**

### 👁️ Fiche apprenant (modale)

* Générée dynamiquement en JavaScript
* Contenu structuré :

  * Avatar
  * Nom / Prénom / Ville
  * Zone de texte libre (anecdotes)
* Comportement adapté selon le support :

  * Desktop : interaction légère
  * Mobile : lecture confortable avec bouton de fermeture

### 🗺️ Carte interactive (Leaflet)

* Carte centrée sur la France
* Marqueurs positionnés à partir de coordonnées GPS
* Popup contenant :

  * Avatar
  * Nom / Prénom
  * Ville

---

## 📱 Responsive & UX

* Approche **responsive** (breakpoints mobile/tablette/desktop)
* Menu burger sur mobile avec fermeture automatique au clic extérieur
* Tableau scrollable
* Grille de cartes adaptative
* Modale lisible et non bloquante

Breakpoints principaux :

* ≤ 575px : mobile
* ≥ 576px : tablette
* ≥ 992px : desktop
* ≥ 1200px : large écran

---

## ♿ Accessibilité

* Utilisation du **clic** plutôt que du hover comme action principale
* Attributs `aria-label` sur les éléments interactifs
* Navigation clavier possible
* Contrastes adaptés selon le thème

---

## 🗂️ Arborescence du projet

```
ENI-PROMO/
│
├── css/
│   └── style.css          # Styles globaux, thèmes et responsive
│
├── data/
│   └── promo.json         # Données des apprenants
│
├── images/
│   ├── avatar/            # Avatars des apprenants
│   ├── icon/              # Icônes SVG
│   └── logo/              # Logos
│
├── pages/
│   ├── carte.html         # Carte Leaflet
│   ├── informations.html # Page d’informations
│   └── preferences.html  # Paramètres utilisateur
│
├── index.html             # Page principale
├── script.js              # Logique JavaScript globale
├── README.md
└── .gitignore
```

---

## 🧠 Choix techniques

* **Aucun framework** (JavaScript et CSS natifs)
* Séparation claire entre données, logique et présentation
* Code structuré et commenté
* Variables CSS pour faciliter la maintenance et l’évolution

---

## 🚀 Améliorations possibles

* Filtres et tris des apprenants
* Lien entre carte Leaflet et fiches détaillées
* Animations CSS sur l’ouverture des modales
* Gestion avancée du focus clavier
* Audit d’accessibilité (ARIA avancé)

---

## 👨‍💻 Auteur

**Réda Touzani**
Formation **Titre RNCP Niveau 5 (Bac+2) - Développeur Web & Web Mobile**
ECOLE **ENI École Informatique**

---

> Projet pédagogique – Front‑end uniquement