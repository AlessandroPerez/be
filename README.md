# BestPosts progetto ingegneria del softaware

Alessandro Perez, matricola: 185247

Una webapp che permette di condividire i propri post con chiunque. 
Una volta fatto il log in o il sign up l'utente sara' in grado di vedere i post di chiunque e creare modificare e rimuovere i prori.

La documentazione del progetto si puo vederea al link: https://bestposts.herokuapp.com/api-docs/

L'app inoltre ha un sisteama di CI e viene deploiata su Heroku al link: https://bestposts.herokuapp.com

Il progetto e' cosi strutturato:

- app.js = creazione server, connessione a mongoDB e creazione middlware

- models = creazione dei mongoose schema di post e user

- routes = roter per user e post

- controller = logica per le diverse route

- public = pagine html

- workflow = logica della CI

- test = end point testing con Jest

- coverage = coverage del testing auto generato da Jest

La strategia di branching usata e' quella di master only branching essendo io l'unico autore.

Il product backlog e' possibile vederlo al link: https://docs.google.com/spreadsheets/d/1Tpy1qh_slZI2_upM3QbwYIhepA7w_PiJ0yiZHid5Q9s/edit#gid=0

La definition of done utilizzata e' la seguente:

Tutte le stories o task accettano un livello minimo di qualita' al interno del progetto

Il goal dello sprint e' quello di implementare le user story dalla 1 alla 6

Qui ci sono i test fatti per il progetto: https://docs.google.com/spreadsheets/d/1AAgIv2aTDOEMbgNZbiebZhNQRz8qRiSYKaVsbWsuj08/edit?usp=sharing

Per questo sprint ho utilizzato un metodo kanban il qual mi ha aiutato a capire su quale task impegarmi ogni giorno

Lo stack utilizzato e' quello di nodejs express mongoDB per il bakend e pagine html per il front il prodotto viene automaticamente deployed su Heroku ad ogni cambiamento alla main branch
