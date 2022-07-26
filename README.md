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


