# 📍 Promo ENI – Gestion des apprenants & carte interactive

Projet web **front-end** réalisé dans le cadre de la formation **Développeur Web & Web Mobile – ENI**.

Cette application permet de visualiser les apprenants d’une promotion :
- sous forme de **liste dynamique**
- sous forme de **cartes**
- et via une **carte interactive Leaflet**

Toutes les données sont chargées dynamiquement depuis un fichier **JSON**, sans back-end.

---

## 🎯 Objectifs pédagogiques

- Exploitation de données **JSON** en JavaScript
- Manipulation avancée du **DOM**
- Gestion de l’état utilisateur avec **localStorage**
- Implémentation d’une **carte interactive (Leaflet.js)**
- Mise en place d’une **interface responsive** (mobile-first)
- Respect des bonnes pratiques d’**accessibilité**

---

## 🗂️ Arborescence du projet

```
ENI-PROMO/
│
├── css/
│   └── style.css          # Styles globaux + responsive + thèmes
│
├── data/
│   └── promo.json         # Données des apprenants
│
├── images/
│   └── *.png / *.svg      # Logos, avatars, icônes
│
├── pages/
│   ├── carte.html         # Carte Leaflet
│   ├── informations.html # Page d’informations
│   ├── preferences.html  # Page préférences utilisateur
│
├── index.html             # Page principale (liste / cartes)
├── script.js              # Logique JavaScript globale
├── README.md
└── .gitignore
```

---

## ⚙️ Fonctionnalités principales

### 🔄 Affichage Liste / Cartes
- Sélecteur radio dans le header
- Choix sauvegardé dans **localStorage**
- Synchronisation automatique entre pages

### 🌗 Thème Clair / Sombre
- Sélection via la page **Préférences**
- Thème persistant grâce à **localStorage**
- Variables CSS pour un thème propre et maintenable

### 👁️ Modale apprenant (vue détail)
- Ouverture par **clic** sur l’icône « œil »
- Modale générée **100 % en JavaScript**
- Positionnement (relative à la ligne)
- Contenu structuré :
  - Avatar
  - Nom / Prénom / Ville (alignement type maquette)
  - Zone texte libre (anecdotes)

### 🗺️ Carte interactive (Leaflet)
- Carte centrée sur la France
- Marqueurs positionnés via coordonnées GPS
- Popup centrée contenant :
  - Nom et prénom
  - Ville affichée sur une ligne distincte
- Comportement mobile natif (auto-pan Leaflet)

---

## ♿ Accessibilité

- Préférence du **clic** plutôt que du hover
- Attributs `aria-label` sur les éléments interactifs
- Navigation clavier fonctionnelle
- Contrastes adaptés selon le thème

---

## 📱 Responsive design

- Approche **mobile-first**
- Adaptation automatique :
  - menu burger
  - tableau scrollable
  - cartes en grille fluide
  - modale lisible sur mobile

Breakpoints principaux :
- ≤ 575px (mobile)
- ≥ 576px (tablette)
- ≥ 992px (desktop)
- ≥ 1200px (large desktop)

---

## 🧠 Choix techniques notables

- Aucun framework (CSS et JavaScript natif)
- CSS structuré avec **variables globales**
- Séparation claire : données / logique / présentation
- Réutilisation des composants (modale, préférences, affichage)

---

## 🚀 Améliorations possibles

- Ouverture de la modale depuis la carte Leaflet
- Ajout d’un filtre / tri des apprenants
- Animation d’apparition de la modale
- Gestion du focus clavier dans la modale
- Tests d’accessibilité (ARIA avancé)

---

## 👨‍💻 Auteur

Projet réalisé par **Réda Touzani**
Dans le cadre de la formation **Développeur Web & Web Mobile – ENI**.

---

> Projet pédagogique – Front-end uniquement

