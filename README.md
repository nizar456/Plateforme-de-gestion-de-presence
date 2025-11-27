# SYSTÈME DE GESTION DE PRÉSENCE UNIVERSITAIRE

## Problématique / Contexte

Dans notre université, la gestion des présences est encore majoritairement manuelle. La grande majorité des professeurs utilisent des feuilles de présence papier, ce qui entraîne de
nombreux problèmes : Risques élevés de perte, d’oubli ou de détérioration des
documents, Manque de centralisation des informations,
Délai important entre la saisie de l’absence et son traitement ou sa justification,
Aucune traçabilité ou historique fiable pour les absences. Cette situation complique aussi bien le travail administratif, que la communication entre étudiants et enseignants, et empêche la mise
en place de statistiques fiables.
🔹 80% des professeurs utilisent encore exclusivement les feuilles papier pour gérer les présences.
🔹 Plus de 50% des feuilles collectées présentent des données erronées ou incomplètes (noms mal écrits, absences non justifiées, feuilles égarées, etc.).
🔹 Aucun système centralisé ne permet actuellement de croiser les absences avec les justificatifs ou les statistiques.
🔹 La consultation des feuilles nécessite souvent un délai de 2 à 5 jours pour obtenir une information simple.
Données observées (indicatives)
Conséquences de l'absence de digitalisation
❌ Difficulté à vérifier ou contester une absence par l'étudiant,
❌ Aucune alerte automatique en cas de nombreuses absences non justifiées,
❌ Travail supplémentaire pour les enseignants et les agents administratifs,
❌ Impossibilité de générer des statistiques précises par filière, module, ou période,
❌ Perte de transparence et de fiabilité dans la gestion des présences.

# Frontend – React

Backend – Spring Ecosystem
MongoDB (NoSQL)

![image.png](images/image.png)

# Interface administrateur

![image.png](images/image%201.png)

![image.png](images/image%202.png)

## Interface professeur

![image.png](images/image%203.png)

![image.png](images/image%204.png)

![image.png](images/image%205.png)

![image.png](images/image%206.png)

![image.png](images/image%207.png)

## Interface étudiant

![image.png](images/image%208.png)

![image.png](images/image%209.png)

![image.png](images/image%2010.png)

## **Déploiement avec Docker Compose**

- **Construire et lancer tous les services (reconstruction forcée)** :

```powershell
cd "e:\Spring_ Nosql\Plateforme-de-gestion-de-presence"
docker compose up --build
```

- **Lancer en arrière-plan (detached)** :

```powershell
docker compose up -d --build
```

- **Voir les logs combinés** :

```powershell
docker compose logs -f
```

- **Voir les logs d'un service (ex. backend)** :

```powershell
docker compose logs -f backend
```

- **Arrêter et supprimer les conteneurs (et réseaux)** :

```powershell
docker compose down
```

- **Supprimer volumes (pour réinitialiser la base de données)** :

```powershell
docker compose down -v
```

## **URLs après démarrage**

- **Frontend (UI)** : `http://localhost:3000`
- **Backend API** : `http://localhost:8082/api`
- **MongoDB (local depuis l'hôte)** : `mongodb://localhost:27017` (DB name: `university_auth`)

Si vous souhaitez que le frontend appelle le backend via le réseau Docker (ex. `http://backend:8082/api`) pour ne pas exposer le backend sur l'hôte, je peux rendre l'URL de l'API configurable au runtime dans le frontend.
