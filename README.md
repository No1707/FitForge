# FitForge

Application Nuxt de suivi de musculation, centrée sur la séance à réaliser : préparer un programme, l’adapter au temps disponible, noter ses performances et retrouver la prochaine séance.

## Démarrage

Node.js 22 ou 24 et npm sont nécessaires. Copier `.env.example` vers `.env` puis renseigner l’URL et la clé **publique/publishable** Supabase. Ne jamais utiliser une clé `secret` ou `service_role` côté client.

```sh
npm ci
npm run dev
```

La clé Gemini est facultative. Sans elle, la création des programmes fonctionne avec les règles et le catalogue intégrés. Le mode IA, désactivé par défaut dans le formulaire, ajoute uniquement des explications ; il ne choisit pas les exercices et ne reçoit ni le nom du programme, ni les notes, ni l’historique.

## Installation de la base de données

La migration `supabase/migrations/202610050001_training.sql` est fournie mais **n’a pas été exécutée sur le projet distant** durant cette refonte.

Depuis le SQL Editor du projet Supabase concerné, examiner puis exécuter cette migration, ou utiliser le processus habituel de migrations Supabase. Elle :

- conserve les programmes existants et ajoute leurs préférences de matériel/niveau ;
- crée les séances terminées sous forme de copies indépendantes du programme ;
- limite l’accès aux données à leur propriétaire avec les règles RLS ;
- rend l’activation d’un programme atomique et unique par compte. Si plusieurs programmes étaient actifs, le plus récemment modifié reste actif.

Les séances fonctionnent localement avant cette installation. Un compte connecté conserve les séances non synchronisées dans une file locale et signale l’indisponibilité. La synchronisation reprend à l’ouverture de l’historique, au retour de la connexion ou avec le bouton « Synchroniser ». L’édition d’un programme distant nécessite une connexion ; un message d’erreur conserve les modifications à l’écran.

Dans Supabase Authentication > URL Configuration, configurer l’URL du site et autoriser les retours vers `/confirm` et `/reset-password` pour les origines réellement utilisées, y compris les paramètres de redirection de `/confirm`. Configurer le service d’envoi des e-mails avant un lancement public. Aucun compte, e-mail réel ou mot de passe n’a été modifié pendant les tests.

Avant ouverture aux utilisateurs, vérifier avec deux comptes de test distincts qu’un compte ne peut pas lire, modifier ou supprimer les programmes et séances de l’autre. Les échanges authentifiés et les règles de la base distante n’ont pas pu être testés ici.

## Comportement des données

- Sans compte, les programmes, la séance en cours et l’historique sont stockés dans le navigateur. Effacer les données du site les efface aussi. L’historique peut être exporté en JSON.
- Les espaces locaux sont séparés par compte. Après connexion, « Récupérer mes données » permet de copier volontairement les programmes et séances terminées créés sans compte. La copie d’origine est conservée.
- Le brouillon de création survit au passage par la connexion ou l’inscription.
- « Rester connecté » est coché par défaut. Les cookies de session expirent après 30 jours sans renouvellement ; Supabase peut mettre fin à la session plus tôt. Décoché, les cookies n’ont pas de date d’expiration persistante et suivent la session du navigateur, y compris son éventuelle restauration des fenêtres. Le choix s’applique aussi au renouvellement des jetons côté serveur. Aucun mot de passe n’est enregistré par l’application.
- La durée estimée comprend l’échauffement, les repos, les transitions et une marge de 20 %. Le générateur et l’adaptation au temps disponible utilisent cette même estimation. La durée réellement enregistrée reste celle du chronomètre.
- Une adaptation ou un remplacement ne modifie que la séance en cours. L’historique conserve son propre contenu même si le programme change ou disparaît.
- Une séance partielle compte uniquement les séries validées et fait avancer à la prochaine séance après confirmation.
- Les chronomètres reposent sur les horodatages. Ils supportent le rechargement et la mise en arrière-plan ; la précision de l’affichage dépend du navigateur.
- L’application conserve les données localement, mais n’installe pas de service worker : le premier chargement ou un rechargement hors connexion n’est pas garanti.

Le catalogue d’origine conserve ses noms et fiches en anglais, signalés dans la fiche. Les filtres et parcours sont en français et la recherche comprend plusieurs synonymes français. Les démonstrations ouvrent une recherche YouTube, sans prétendre constituer une sélection de vidéos vérifiées.

## Validation et production

```sh
npm test
npm run typecheck
npm run build
node .output/server/index.mjs
```

Les tests couvrent les contraintes de génération, les équipements de support, les priorités musculaires, les remplacements, les adaptations, les valeurs saisies, l’isolation des sauvegardes, les suppressions synchronisées, la reprise et les redirections de connexion. Les parcours principaux ont également été exercés dans le navigateur sur mobile et ordinateur avec des données explicitement nommées « Vérification FitForge ».

Le déploiement doit fournir ses variables d’environnement. Pour remplacer la clé Gemini au démarrage de la version compilée, utiliser `NUXT_GEMINI_API_KEY`. Ne pas publier le serveur de développement.

## Dépendances et limites connues

L’audit npm du 7 octobre 2026 remonte 15 signalements dans les dépendances : 6 critiques, 8 élevés et un modéré. Plusieurs sont propagés depuis une même dépendance ; ces nombres ne correspondent pas à 15 failles distinctes et ne prouvent pas leur exploitabilité dans cette application. Nuxt est verrouillé en 3.21.11 dans le fichier de dépendances.

Les signalements concernent les chaînes `simple-git/@simple-git/argv-parser` via les outils de développement Nuxt, `braces/micromatch/fast-glob/globby` et `node-forge/listhen`, ainsi que `@nuxt/ui` 3. Les DevTools Nuxt sont désactivés. Les formulaires de connexion utilisent des éléments natifs avec `method="post"`, et non les composants `UForm`/`UAuthForm` concernés par l’avis Nuxt UI. Les correctifs de dépendances et la migration majeure de Nuxt UI devront être évalués et testés avant une mise en production publique. La correction automatique proposée par npm implique notamment un retour à Nuxt 3.7.4 : elle n’a pas été appliquée.

La limitation des appels Gemini existante est en mémoire, par instance serveur. Un déploiement multi-instance devra utiliser une limite partagée. L’option IA reste facultative ; le fonctionnement principal ne dépend pas de ce service.
