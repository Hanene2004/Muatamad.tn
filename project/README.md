# Muatamad.tn – Plateforme Nationale Commerçants

Ce projet est une application web moderne développée avec **React**, **TypeScript** et **Vite**, utilisant le design Soft UI et TailwindCSS. Il propose un dashboard administrateur, un dashboard commerçant, un annuaire de commerçants, des filtres avancés, des statistiques interactives, et bien plus.

## Fonctionnalités principales
- Tableau de bord administrateur (gestion vendeurs, avis, litiges, badges, équipe, FAQ, etc.)
- Tableau de bord commerçant (gestion produits, commandes, avis, statistiques)
- Annuaire des commerçants avec recherche, filtres, tri, badges, et thèmes personnalisés
- Page d'accueil interactive (statistiques animées, témoignages, villes populaires, call-to-action)
- Authentification, gestion des rôles (admin, commerçant, utilisateur)
- Design Soft UI moderne et responsive

## Prérequis
- Node.js >= 16
- npm >= 8

## Installation
```bash
npm install
```

## Lancement en développement
```bash
npm run dev
```

## Build pour production
```bash
npm run build
```

## Structure du projet
- `src/pages/` : Pages principales (AdminDashboard, Merchants, Home, etc.)
- `src/components/` : Composants réutilisables (UI, layout, home, merchant, etc.)
- `src/data/` : Données mock pour le développement
- `src/context/` : Contexts React (authentification, etc.)
- `src/hooks/` : Hooks personnalisés pour la gestion des données
- `src/types/` : Types TypeScript partagés

## Personnalisation
- Les couleurs et thèmes Soft UI sont configurés dans `tailwind.config.js`.
- Les données mock peuvent être modifiées dans `src/data/mockData.ts`.

## Bonnes pratiques
- Les fichiers sensibles (`.env`, `node_modules`, etc.) sont ignorés grâce au `.gitignore`.
- Le projet est prêt à être déployé sur GitHub ou Vercel/Netlify.

## Dépendances principales
- React, React Router, TypeScript, Vite
- TailwindCSS, Framer Motion, Lucide React
- Recharts (pour les graphiques)

## Remarques
- Pour utiliser les graphiques, assurez-vous d'avoir la bonne version de `recharts` (>=2.1.0).
- Si vous connectez une API, adaptez les hooks et endpoints dans `src/hooks/`.

---

**Développé pour Muatamad.tn – Plateforme nationale de valorisation des commerçants tunisiens.** 