# Choix Technique

- API : Expressjs
- ORM: Squelize
- BDD: PostgreSQL
- FRONT: Angular
- OTHERS: Docker, Docker Compose

# Difficultés rencontrées

- Le faible typage de JS
- L'architecture du projet ExpressJS et Angular
- La communication entre les dockers

# Solutions adoptées

- Utilisation de TS
- Lecture de documentation sur l'architecture
- Désactivation des CORS

# Fonctionnalités réalisées :

- API :
    - Ajout et suppression de destinations
    - Mise à jour des informations de destinations
    - Récupération de la liste des destinations avec filtrage par nom
    - Ajout et suppression de trains
    - Récupération de la liste des trains avec filtrage par destination et/ou heure de départ

- FRONT : 
    - L'ajout et la suppression de trains avec une validation côté client des données saisies.
    - La visualisation des 10 prochains trains en gare à un temps donné avec leur heure de départ prévue et destination.
    - Filtrage des trains affichés par destination et/ou heure de départ.

- Fonctionnalités bonus :
    - Réassignation automatique des trains entre les quais, tout en respectant les contraintes d’heure et de disponibilité des quais

- AUTRES :
    - Mise en place de Docker
    - Mise en place de Swagger pour tester l'API (http://localhost:3000/api-docs/)

# Comment lancer le projet :

- Installer Docker et Docker Compose
- Renommer `.env.example` en `.env`
- A la racine du projet, lancer la commande `docker-compose up --build`
