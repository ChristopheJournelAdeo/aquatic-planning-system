# 📋 Système de Gestion de Planning

Une application full-stack complète pour gérer les plannings de 20 personnes avec backend Node.js et interface moderne responsive.

## 🚀 Fonctionnalités principales

### 👥 Gestion des équipes
- **20 personnes maximum** avec rôles (Manager, Employé, Stagiaire)
- **Gestion des profils** avec nom, email et fonction
- **Interface intuitive** pour visualiser et modifier les équipes

### 📅 Planning hebdomadaire
- **Vue semaine complète** du lundi au dimanche
- **Navigation temporelle** entre semaines (précédente/suivante)
- **4 créneaux maximum** par personne et par jour
- **Gestion des heures** de début et fin de mission
- **Assignment des lieux** pour chaque créneau

### 🏢 Gestion des lieux
- **Lieux de mission** configurables (Siège, Agences, Sites clients, Télétravail)
- **Adresses complètes** pour chaque lieu
- **Vue par lieu** pour voir qui travaille où

### 🔄 Double vue
- **Vue par personne** : Planning individuel de chaque employé
- **Vue par lieu** : Qui travaille dans chaque lieu par jour
- **Basculement instantané** entre les deux vues

### 📧 Export et communication
- **Génération PDF** avec mise en page professionnelle
- **Envoi automatique par email** avec destinataires multiples
- **Messages personnalisables** pour l'envoi
- **Export selon la vue** choisie (personne ou lieu)

## 🛠 Technologies utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web rapide et minimaliste
- **Moment.js** - Manipulation avancée des dates et semaines
- **UUID** - Génération d'identifiants uniques
- **CORS** - Gestion des requêtes cross-origin
- **Nodemailer** - Envoi d'emails (prévu)
- **Puppeteer** - Génération de PDF (prévu)

### Frontend
- **HTML5** - Structure sémantique moderne
- **CSS3** - Design system avec variables CSS et animations
- **JavaScript ES6+** - Programmation orientée objet moderne
- **Fetch API** - Communication asynchrone avec le backend
- **Font Awesome** - Icônes vectorielles

### Design & UX
- **Design System** - Variables CSS cohérentes  
- **Responsive Design** - Adaptation mobile-first
- **Animations CSS** - Transitions fluides et feedback visuel
- **Glassmorphism** - Effets de transparence modernes
- **Accessibilité** - Support des préférences utilisateur

## 📁 Structure du projet

```
/
├── server.js              # Serveur Express avec API REST
├── package.json           # Dépendances et scripts npm
├── README.md             # Documentation complète
├── public/               # Assets frontend
│   ├── index.html        # Interface utilisateur principale
│   ├── style.css         # Styles CSS avec design system
│   └── script.js         # Application JavaScript (POO)
└── .github/
    └── copilot-instructions.md  # Instructions de développement
```

## 🎯 Installation et démarrage

### Prérequis
- Node.js (version 14 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Démarrer le serveur de développement**
   ```bash
   npm run dev
   ```
   ou pour la production :
   ```bash
   npm start
   ```

3. **Ouvrir l'application**
   Rendez-vous sur [http://localhost:3000](http://localhost:3000)

## 🔌 API Endpoints

### Gestion des personnes
- **GET** `/api/people` - Liste toutes les personnes
- **POST** `/api/people` - Ajouter/modifier une personne
- **DELETE** `/api/people/:id` - Supprimer une personne

### Gestion des lieux
- **GET** `/api/locations` - Liste tous les lieux
- **POST** `/api/locations` - Ajouter/modifier un lieu

### Gestion des plannings
- **GET** `/api/schedule/:week` - Récupérer le planning d'une semaine
- **POST** `/api/schedule/:week` - Sauvegarder le planning d'une semaine
- **GET** `/api/current-week` - Informations sur la semaine courante

### Export et email
- **POST** `/api/export-pdf` - Générer un PDF du planning
- **POST** `/api/send-email` - Envoyer le planning par email

**Exemple de données de planning :**
```json
{
  "week": "2025-39",
  "schedules": {
    "person-id": {
      "2025-09-27": [
        {
          "id": "slot-1",
          "startTime": "09:00",
          "endTime": "17:00",
          "locationId": "location-1",
          "description": "Mission client"
        }
      ]
    }
  }
}
```

## 🎨 Interface utilisateur

### Navigation et vues
- **Basculement de vue** : Boutons pour passer de la vue personne à la vue lieu
- **Navigation temporelle** : Boutons précédent/suivant pour les semaines
- **Indicateur de semaine** : Affichage clair de la période consultée

### Grille de planning (Vue personne)
- **Grid responsive** : 20 personnes × 7 jours avec défilement optimisé  
- **Créneaux visuels** : Cartes colorées avec heures et lieux
- **Ajout intuitif** : Zones cliquables pour ajouter des créneaux
- **Limite de 4 créneaux** par personne et par jour

### Vue par lieu  
- **Groupement par lieu** : Sections distinctes pour chaque lieu
- **Planning journalier** : Visualisation des personnes par jour et lieu
- **Code couleur** : Différenciation visuelle des types de lieux

### Modales d'édition
- **Formulaire complet** : Tous les champs nécessaires (personne, horaires, lieu)
- **Validation** : Contrôles de cohérence des horaires
- **Actions** : Création, modification, suppression de créneaux

### Export et communication
- **Configuration email** : Interface pour destinataires et message
- **Feedback visuel** : Notifications de succès/erreur
- **Gestion d'état** : Indicateurs de progression pour les opérations longues

## 🔧 Scripts disponibles

- `npm start` - Démarre le serveur en mode production
- `npm run dev` - Démarre le serveur avec nodemon (redémarrage automatique)

## 🚦 Guide d'utilisation

### Première utilisation
1. **Accéder à l'application** : Ouvrir http://localhost:3000
2. **Découvrir l'interface** : 20 personnes et 6 lieux sont pré-configurés
3. **Ajouter un créneau** : Cliquer sur une zone vide dans le planning
4. **Remplir le formulaire** : Personne, horaires, lieu, description optionnelle

### Gestion quotidienne
1. **Naviguer entre les semaines** : Boutons précédent/suivant
2. **Basculer les vues** : "Par Personne" ou "Par Lieu" selon le besoin
3. **Modifier un créneau** : Cliquer sur un créneau existant
4. **Supprimer** : Utiliser le bouton "Supprimer" dans le formulaire d'édition

### Export et diffusion
1. **Préparer l'export** : Choisir la vue souhaitée (personne ou lieu)
2. **Configurer l'email** : Cliquer sur "Export PDF + Email"
3. **Renseigner les destinataires** : Emails séparés par des virgules
4. **Personnaliser le message** : Objet et contenu de l'email
5. **Envoyer** : Le PDF sera généré et envoyé automatiquement

## 🌟 Fonctionnalités avancées

### Déjà implémentées
- ✅ **Stockage automatique** : Sauvegarde en temps réel des modifications
- ✅ **Interface responsive** : Adaptation automatique mobile/desktop  
- ✅ **Gestion des weekends** : Distinction visuelle samedi/dimanche
- ✅ **Validation des données** : Contrôles de cohérence des horaires
- ✅ **Navigation temporelle** : Calcul automatique des semaines ISO
- ✅ **Double vue** : Basculement instantané personne/lieu

### En cours de développement  
- 🔄 **Génération PDF** : Mise en page professionnelle avec Puppeteer
- 🔄 **Envoi d'emails** : Integration Nodemailer avec SMTP
- 🔄 **Authentification** : Gestion des utilisateurs et permissions
- 🔄 **Base de données** : Persistance avec MongoDB/PostgreSQL

### Roadmap future
- 📋 **Import/Export Excel** : Intégration avec les tableurs existants
- 🔔 **Notifications** : Alertes automatiques pour les conflits
- 📊 **Statistiques** : Tableaux de bord et rapports d'activité
- 🌐 **Multi-tenant** : Support de plusieurs équipes/organisations
- 📱 **App mobile** : Version native iOS/Android
- 🔄 **Synchronisation** : API pour systèmes RH existants
- 🎨 **Thèmes** : Mode sombre et personnalisation visuelle
- ♿ **Accessibilité** : Conformité WCAG 2.1 AA

## 📝 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

---

**Développé avec ❤️ en utilisant Node.js et les technologies web modernes**