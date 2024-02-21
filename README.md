# Projet Red/Blue Team

## En cas de rebuild
- Vérifier le .htaccess
- Il doit être comme suit :
    RewriteEngine On
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
    RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
    RewriteRule ^ - [L]
    RewriteRule ^ ./index.html

## token a utiliser via postman
- sur postman il faut créer un nouveau token dans le header
- il faut ensuite mettre ce token : eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0.eyJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4NTQ0NDEyfQ.

## les tokens JWT se compose en 3 éléments qui sont séparer par des points dans le token : 
- le header : eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0
- le payload : eyJ1c2VyX2lkIjoxLCJ1c2VyX3JvbGUiOiJ1c2VyIiwiaWF0IjoxNzA4NTQ0NDEyfQ
- la signature : (qui dans ce cas-ci n'existe pas et nous permet donc de changer le payload)

### Les tokens JWT sont viennent normalement avec une signature qui permet une sécurisation des données cryptées dans le payload 

### la signature qui se trouve dans le fichier .env est cryptée et est envoyé avec le token se qui ne permet la protection des données, sans la signature (non-cryptée), le hackeur ne peut pas changé le payload sans la signature, ce qui n'est pas le cas dans notre faille, la signature n'étant pas fournie, le hackeur peut changer à sa guise le payload.

# les changements majeur du code sont au niveau du dataController.js et du authorize.js : 
### ligne 26 du dataController.js: 
- const token = jwt.sign({ user_id: user.id, user_role: user.role }, null, { algorithm: 'none' }); , dans cette fonction sign, nous avons mis le 2iéme attribut sur null (ce qui veut dire pas de signature) et algorithm sur none (qui ne demande donc pas de signature)
### ligne 4 du authorize.js:
- jwt.verify(req.headers.token, null, (error, payload) => { , dans cette fonction verify, l'attribut null nous dit qu'on ne vérifie pas si il y a une signature
