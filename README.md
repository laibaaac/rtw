# Real Time Web

## Angrezi
<img width="1000" alt="Schermafbeelding 2023-05-13 om 06 37 59" src="https://github.com/laibaaac/rtw/assets/94360732/91fb5e9b-e790-4d18-b691-889c92429aa1">
Angrezi (english translated in urdu) is een chat applicatie die ik heb gemaakt voor het vak Real Time Web. 
Door middel van socket.io verstuur ik en ontvang ik real time data (data die je meteen ziet).
Zie hier de proces achter het bouwen van de applicatie!

## App Deploy 
Ik gebruik de live platform Railway en ook Adaptable, beide zijn heel fijn om te gebruiken. Je kan je github repo erbij linken en worden de meest recente updates meteen gedployed

**Railway** (is stabieler)
[Railway live link](https://rtw-production.up.railway.app/)

**Adaptable** (Als de bovenste link niet werkt)
[Adaptable live link](https://chat-rtw.adaptable.app)


## Inhoudsopgave
- [Job story](#job-story)
- [Proof of concept](#proof-of-concept)
  * [1e concept](#1e-concept)
  * [2e concept](#2e-concept)
  * [3e concept](#3e-concept)
- [Used Tools](#used-tools)
- [App installation](#app-installation)
  * [NPM](#npm)
  * [Express](#express)
  * [Socket.io](#socketio)
  * [EJS](#ejs)
- [App Deploy](#app-deploy)
- [Alex.js](#alexjs)
- [Core functionaliteiten](#core-functionaliteiten)
- [MoSCoW](#moscow)
- [Data model](#data-model)
- [Data lifecycle model](#data-lifecycle-model)
- [Real time events](#real-time-events)
- [Bronnen](#bronnen)

## Job story
Als een gebruiker, wil ik met andere mensen in een veilige omgeving (zonder beledigingen) kunnen chatten. 

Als een gebruiker, wil ik met meerdere mensen van verschillende landen kunnen chatten. (de chat wordt in engels gehouden)

## Proof of concept

### 1e concept 

### 2e concept

### 3e concept 

## Used Tools 

- NPM
- Node 
- Express
- EJS
- Socket.io 
- Alex.js (api/ npm tool)

## App installation
Zie hier onder hoe mijn applicatie te installeren is.

### Clone repo
Ten eerste om mijn code te kunnen krijgen vanuit github, moet de repo gecloned worden. Open uw terminal en zet u dit erin. 

```
git clone https://github.com/laibaaac/rtw.git
```
### NPM
Om de project te laten draaien en een server hebben (zet dit in terminal). Dit project wordt geopend in localhost:4545

```
nvm Install
```

### Express



```
npm install express 
```

### Socket.io 

```
npm install socket.io 
```

### EJS


```
npm install ejs 
```


## Alex.js
Alex.js is mijn api / npm tool die ik gebruik om te filteren in mijn chat.

```
npm install alex --global
```


## Core functionaliteiten
- Berichten kunnen sturen naar andere gebruikers
- Berichten kunnen ontvangen van andere gebruikers
- Username kunnen doorgeven 
- Verder met de username kunnen chatten
- Scheldwoorden in het engels kunnen filteren 
- De scheldwoorden worden niet ind e chat gedisplayed 

## MoSCoW
### Must have
- Berichten kunnen sturen naar andere gebruikers
- Berichten kunnen ontvangen van andere gebruikers
- Username kunnen doorgeven
- Verder met de username kunnen chatten
- Scheldwoorden in het engels kunnen filteren 
- De scheldwoorden worden niet ind e chat gedisplayed 

### Should have 
- Berichten beter kunnen volgen (de berichten worden vanuit rechts ingeladen)
- Vorige berichten kunnen terug zien

### Could have 
- Als een gebruiker meer dan een paar keer uitscheld dan wordt de gebruiker eruit gekickt

### Would have 
- Zien welke gebruiker zit te typen 


## Data model

## Data lifecycle model

Dit is mijn Data lifecycle model, ik laat hier precies zien hoe mijn applicatie werkt. De model bestaat uit 4 compontenten. De gebruiker,  de server, de client en de API/ npm tool. De gebruiker stuurt een gebruikersnaam, kan berichten sturen en stuurt zelf een uitscheldwoord.  In de client wordt de gebruikersnaam gemaakt en in de server opgeslagen en via de server wordt het naar alle verbonden clients gestuurd.
Wanneer de gebruiker een  bericht stuurt, wordt er vanuit de server het bericht doorgestuurd naar de api/ npm tool samen met een config file. De api/ npm tool stuurt dan terug naar de server als het wel of geen uitscheldwoord is. De server stuurt dan naar de client als het wel of geen clean message, als het een clean message is dan stuurt de client het weer terug naar de gebruiker. Als het bericht niet een clean message is (dus er bevat een uitscheldwoord), stuurt de client het niet door naar de gebruiker. 
Verder worden er verschillende real time events verstuurd en ontvangen tussen de client en de server .

![datalifecycle](https://github.com/laibaaac/rtw/assets/94360732/c3910f69-2223-485e-96f2-04e2ec4326f0)

## Real time events 
Voor het communicatie tussen de server en de clients. Heb ik verschillende real time events gemaakt.

`connection Event` wordt uitgevoerd wanneer de gebruiker verbinding maakt met de server
new-user Event` wordt uigevoerd Wanneer de gebruiker een nieuwe gebruiker aanmaakt

`chat message Event` waar de gebruikers met elkaar berichten kan sturen in een chat room

`chat history` Maximaal 50 berichten worden opgeslagen, de nieuwe gebruikers die nog binnen komen kunnen alsnog de oude berichten zien.

`Connect` De event ga checken of de applicatie verbinding heeft met de server. Als er geen verbinding is wordt een bericht getsuurd naar de gebruikers dat hij offline is.

`Error` geeft een offline functie door en ook een bericht wanneer de gebruiker zit uit te schelden. 

`Disconnect` Event die aangeeft dat de client niet meer verbonden is met de server.


## Bronnen
- https://www.npmjs.com/package/alex#configuration
- https://alexjs.com/ 
- https://adaptable.io/
- https://railway.app/ 
- https://socket.io/get-started/chat/
- https://www.npmjs.com/package/nodemon 


