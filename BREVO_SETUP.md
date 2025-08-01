# Configuration Brevo pour Zolar

## Variables d'environnement requises

Ajoutez ces variables à votre fichier `.env.local` :

```env
# Brevo (ex-Sendinblue) Configuration
BREVO_API_KEY=votre_cle_api_brevo_ici
BREVO_LIST_ID=2
```

## Configuration Brevo

### 1. Obtenir votre clé API Brevo

1. Connectez-vous à votre compte [Brevo](https://app.brevo.com)
2. Allez dans **Paramètres** → **Clés API**
3. Créez une nouvelle clé API avec les permissions :
   - **Contacts** : Lecture et écriture
   - **Emails transactionnels** : Envoi
4. Copiez la clé API dans `BREVO_API_KEY`

### 2. Configurer la liste de contacts

1. Dans Brevo, allez dans **Contacts** → **Listes**
2. Créez une nouvelle liste nommée "Liste d'attente Zolar" (ou utilisez une existante)
3. Notez l'ID de la liste et mettez-le dans `BREVO_LIST_ID`

### 3. Créer les champs personnalisés

Dans **Contacts** → **Paramètres** → **Attributs de contact**, créez ces champs :

- **WHATSAPP** (Texte) : Pour stocker le numéro WhatsApp
- **SMS** (Texte) : Pour stocker le numéro de téléphone
- **SOURCE** (Texte) : Pour identifier la source d'inscription
- **SIGNUP_DATE** (Date) : Date d'inscription
- **LANGUAGE** (Texte) : Langue du contact

## Fonctionnalités

### ✅ API Endpoint : `/api/whitelist`

**POST** - Ajouter un contact à la liste d'attente :
```json
{
  "email": "contact@example.com",    // Optionnel
  "phone": "0612345678"             // Optionnel (+212 sera ajouté automatiquement)
}
```

**GET** - Obtenir les statistiques de la liste :
```json
{
  "message": "API de la liste d'attente Zolar (Brevo)",
  "service": "Brevo (Sendinblue)",
  "stats": {
    "listId": 2,
    "totalContacts": 150,
    "listName": "Liste d'attente Zolar"
  }
}
```

### ✅ Email automatique de bienvenue

Quand un email est fourni, un email de bienvenue personnalisé est automatiquement envoyé avec :
- Message de bienvenue en français
- Avantages de la liste d'attente
- Design responsive et professionnel
- Lien vers les réseaux sociaux

### ✅ Gestion des doublons

- Si un contact existe déjà, ses informations sont mises à jour
- Gestion intelligente des erreurs Brevo
- Messages d'erreur en français

### ✅ Validation des données

- Email : Format email valide
- Téléphone : Format marocain (+212 ou 0)
- Au moins un champ requis (email OU téléphone)
- Formatage automatique du téléphone vers +212

## Installation

1. **Aucun package supplémentaire requis !** ✨  
   L'intégration utilise les API natives `fetch` de Node.js

2. Configurer les variables d'environnement dans `.env.local` :
```env
BREVO_API_KEY=votre_cle_api_brevo_ici
BREVO_LIST_ID=2
```

3. Redémarrer votre serveur de développement :
```bash
npm run dev
```

## Test de l'API

```bash
# Test d'ajout d'un contact
curl -X POST http://localhost:3000/api/whitelist \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","phone":"0612345678"}'

# Test des statistiques
curl http://localhost:3000/api/whitelist
```

## Avantages de Brevo

- ✅ **Gratuit** jusqu'à 300 emails/jour
- ✅ **Interface intuitive** pour gérer les contacts
- ✅ **Emails transactionnels** inclus
- ✅ **Templates d'emails** professionnels
- ✅ **Statistiques** détaillées
- ✅ **API robuste** et bien documentée
- ✅ **Conformité RGPD** européenne

## Migration depuis l'ancien système

L'ancien système utilisant Prisma/MongoDB/File Storage a été complètement remplacé. Les nouvelles inscriptions sont maintenant gérées uniquement par Brevo, ce qui offre :

- Réponses plus rapides (pas de timeout MongoDB)
- Interface d'administration intégrée
- Emails automatiques inclus
- Meilleure délivrabilité des emails
- Synchronisation automatique des contacts

---

**Support technique** : Consultez la [documentation officielle Brevo](https://developers.brevo.com/) pour plus d'informations. 