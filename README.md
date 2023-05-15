# Real Time Web

## Angrezi?
<img width="1000" alt="Schermafbeelding 2023-05-13 om 06 37 59" src="https://github.com/laibaaac/rtw/assets/94360732/91fb5e9b-e790-4d18-b691-889c92429aa1">
Angrezi? (english translated in urdu) is een chat applicatie die ik heb gemaakt voor het vak Real Time Web. 
Door middel van socket.io verstuur ik en ontvang ik real time data (data die je meteen ziet).
Zie hier de proces achter het bouwen van de applicatie!


## Demo
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
- [Gekozen concept](#gekozen-concept)
- [Used Tools](#used-tools)
- [App installation](#app-installation)
  * [Clone repo](#clone-repo)
  * [NPM](#npm)
  * [Express](#express)
  * [Socket.io](#socketio)
  * [EJS](#ejs)
- [App Deploy](#app-deploy)
- [Alex.js](#alexjs)
  * [Install](#install)
  * [Config file](#config-file)
  * [Server side](#server-side)
  * [Structure](#structure)
  * [Error](#error)
- [Core functionaliteiten](#core-functionaliteiten)
- [MoSCoW](#moscow)
  * [Must have](#must-have)
  * [Should have](#should-have)
  * [Could have](#could-have)
  * [Would have](#would-have)
- [App Explanation](#app-explanation)
  * [User name](#user-name)
  * [Chat](#chat)
  * [Bericht sturen](#bericht-sturen)
  * [Scheldwoord](#scheldwoord)
  * [Offline](#offline)
- [Data model](#data-model)
- [Data lifecycle model](#data-lifecycle-model)
- [Real time events](#real-time-events)
- [Peer review](#peer-review)
- [Bronnen](#bronnen)



## Job story
Als een gebruiker, wil ik met andere mensen in een veilige omgeving (zonder beledigingen) kunnen chatten. 

Als een gebruiker, wil ik met meerdere mensen van verschillende landen kunnen chatten. (de chat wordt in engels gehouden)

## Proof of concept

### 1e concept 
De trivia app
De gebruiker wordt een vraag gesteld door de trivia api.  Er worden een aantal opties gegeven en de gebruiker moet een van de opties kiezen. 
De trivia api bevat verschillende topics en of je kan algemene onderwerpen gebruiken of je kan specifieke onderwerpen laten terug komen uit de api. 
De score van de gebruikers worden bijgehouden en de gebruiker die 5 keer een antwoord goed heeft wint de match. 

**Schets**

<img width="500" alt="Schermafbeelding 2023-05-15 om 09 30 22" src="https://github.com/laibaaac/rtw/assets/94360732/106e2368-0a8f-4ff3-8945-57403e9bebba">



### 2e concept
Gifs app 
In deze app kan je met gebruikers chatten en ook gifs sturen vanuit de giphy api. 
De giphy api bestaat uit een zoekbalk en de content die erin wordt geladen en gefilterd. 
Zo kan de gebruiker extra emoties in de app betrekken.

**Schets**

<img width="500" alt="Schermafbeelding 2023-05-15 om 09 26 21" src="https://github.com/laibaaac/rtw/assets/94360732/6839f1ad-0094-4938-9663-eceafbf2909f">




### 3e concept 
Angrezi? 
Engels leren kan best moeilijk zijn. Om een taal te leren is de handigste manier om ermee te oefenen met personen, dus in geprek proberen te gaan. 
Hierdoor heb ik de angrezi app bedacht, hier kan de gebruiker engels proberen te leren, zonder dat de gebruiker geintimideerd voelt. Het is een safe space, waardoor de gebruiker niet aarzelt om met andere te spreken. 
Ik ga de api / npm tool Alex.js gebruiken die let op verschillende soorten scheldwoorden in het engels, gender insensitief woorden en ook kan je zelf woorden wel en niet toelaten. 
Verder als het mij lukt om een betrouwbare language detector  te vinden, ga ik die proberen te implementeren, zo kan er gecheckt worden wie wel en niet engels praat. 

**Schets**


<img width="500" alt="Schermafbeelding 2023-05-15 om 09 30 22" src="https://github.com/laibaaac/rtw/assets/94360732/ad462fca-64ce-4914-a7fe-a8acbe568402">






## Gekozen concept
Uiteindelijk heb ik voor de 3e concept gekozen, het is een origineel idee en ook te doen met mijn skills die ik op dit moment beheers.
Alleen moet ik het idee wat aanpassen, ik wou een language detector proberen in te zetten, maar die zijn niet 100% accuraat. Ze werken niet zo goed en zijn niet zo betrouwbaar. Ik heb er voor gekozen om alleen alex.js te gebruiken en in de app ga ik aangeven dat het een striclty only english speaking app is. Als ik nog meer de tijd, de skills en een beter language detector heb, dan zou ik de app zeker aanpassen. 
Voor nu maak ik de app een safe space om engels met andere personen proberen te leren, met een safe space bedoel ik dat de gebruiker niet uitgescholden kan worden en alles schoon wordt gehouden in de chat.   


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

## App Deploy 
Ik gebruik de live platform Railway en ook Adaptable, beide zijn heel fijn om te gebruiken. Je kan je github repo erbij linken en worden de meest recente updates meteen gedployed

**Railway** (is stabieler)
[Railway live link](https://rtw-production.up.railway.app/)

**Adaptable** (Als de bovenste link niet werkt)
[Adaptable live link](https://chat-rtw.adaptable.app)


## Alex.js
Alex.js is mijn api / npm tool die gebruik ik om de uitscheldwoorden te filteren in mijn chat.

De api werkt als volgt:

### Install
```
npm install alex --global
```

### Config file
Hier maak ik een config file, in mijn client side aan, ik laat profanity words (uitscheld woorden) niet toe. Verder hbe je 2 andere variable de allow, hier kan ik zelf toevoeg wat ik wel toe laat en no Binary kijkt naar gender insensitive woorden. 
```
export const allow = [
    "hostesses-hosts" // name of the rule you want to allow
];

export const noBinary = false;


export const profanitySureness = 1;
``` 


### Server side
Ik spreek alex via de server aan, ik heb het het onder messages erin gezet, bij elke bericht checkt alex als er een scheld woord aanwezig is. 

```
// Handel 'message'-events af, zo kan de gberuiker berichten sturen 
    socket.on('message', (message) => {

        // Controleer de berichten met Alex.js, basically hier worden de berichte gefilterd, zie mijn .alexrc.js (config file)
        const result = alex(message.message, {
            allow: allow,
            noBinary: noBinary,
            profanitySureness: profanitySureness
        }).messages;
        // Als het bericht niet aan de criteria voldoet, kan de gebruiker het bericht niet door sturen
        if (result.length > 0) {
            console.log('failed!');
            socket.emit('error', 'Please watch your language.');
            // Als het bericht wel aan de criteria voldoet, kan de gebruiker het bericht doorsturen naar andere 
        } else {
            console.log('success!: ' + message.message);
            socket.emit('success', { message: 'Thank you for your message.' });
      }
        });

```

### Structure

```
{
  "include": ["test/**/*.js", "*.js"],
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020"],
    "module": "ES2020",
    "moduleResolution": "node",
    "allowJs": true,
    "checkJs": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "strict": true
  }
}

```

### Error 
Tijdens het implementen van alex.js kreeg ik steeds error, later kwam ik er achter dat alex.js geen requires toe laat in de server.js. 
Hierdoor moest ik mijn server file helemaal omzetten naar de ESmodule (ipv require, imports gebruiken). 
Verder moest ik de config file ook apart in de server zetten, de data werd niet meteen uit de config file gehaald.
(Zie hierboven mijn server.js code)

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
- language detector (er zijn geen stabiele language detectors, waardoor ik heb gekozen om dit niet te implementeren)


### Would have 
- Zien welke gebruiker zit te typen 
- Verschillende chatrooms 

## App Explanation
Ik ga heel kort hier vertellen hoe mijn app precies werkt. 

### User name
Het begin scherm is meteen waar de gebruiker een user name kan aanmaken. 
<img width="500" alt="Schermafbeelding 2023-05-13 om 06 37 59" src="https://github.com/laibaaac/rtw/assets/94360732/91fb5e9b-e790-4d18-b691-889c92429aa1">

### Chat 
Na het invullen van de user name kom je terecht bij de chatroom. 
Hier zie je de datum, een go back button om je username aan te passen, een inputfield om een bericht te typen en een send button om het bericht te sturen.

<img width="500" alt="Schermafbeelding 2023-05-13 om 08 30 06" src="https://github.com/laibaaac/rtw/assets/94360732/5cff6319-8b9c-47fe-b44b-ebd0bbacd29a">




### Bericht sturen 
In de chatroom kan je naar de gebruikers een bericht sturen en krijg je ook berichtjes te zien van andere. 
Verder kan je ook de vorige berichten zien na het refreshen. 

<img width="500" alt="Schermafbeelding 2023-05-13 om 06 37 59" src="https://github.com/laibaaac/rtw/assets/94360732/9bee80b8-ff8e-4189-a65e-fbad034a40bc">



### Scheldwoord 
Wanneer een gebruiker uitscheld, dan wordt het woord niet weergeven in de chat en krijgt de gebruiker een waarschuwing. 


![Group 1](https://github.com/laibaaac/rtw/assets/94360732/f4a82d49-7217-40e6-8b59-0b353f44ad22)





### Offline
Soms kan het zijn dat de server geen connectie krijgt, hiervoor heb ik een offline mode. De gebruiker krijgt duidelijk te zien dat hij of zij offline is. 

<img width="500" alt="Schermafbeelding 2023-05-13 om 09 08 44" src="https://github.com/laibaaac/rtw/assets/94360732/a351974e-5e22-49ef-bf80-b75d43bb43d4">






## Data model
Zoals ik al eerder zei, ik gebruik een npm tool die data krijgt en verstuurd. Hiervoor maak ik zelf een config file wat ik wel en niet toe laat in mijn applicatie. Op dit moment heb ik alleen de profanitySureness aan, dit let op scheldwoorden. 

**config file**
```
export const allow = [
    "hostesses-hosts" // name of the rule you want to allow
];

export const noBinary = false;


export const profanitySureness = 1;
``` 

**Schets**

<img width="500" alt="Schermafbeelding 2023-05-13 om 09 26 33" src="https://github.com/laibaaac/rtw/assets/94360732/689bd441-1925-447c-9838-5718ae0b7415">



## Data lifecycle model

Dit is mijn Data lifecycle model, ik laat hier precies zien hoe mijn applicatie werkt. De model bestaat uit 4 compontenten. De gebruiker,  de server, de client en de API/ npm tool. De gebruiker stuurt een gebruikersnaam, kan berichten sturen en stuurt zelf een uitscheldwoord.  In de client wordt de gebruikersnaam gemaakt en in de server opgeslagen en via de server wordt het naar alle verbonden clients gestuurd.
Wanneer de gebruiker een  bericht stuurt, wordt er vanuit de server het bericht doorgestuurd naar de api/ npm tool samen met een config file. De api/ npm tool stuurt dan terug naar de server als het wel of geen uitscheldwoord is. De server stuurt dan naar de client als het wel of geen clean message, als het een clean message is dan stuurt de client het weer terug naar de gebruiker. Als het bericht niet een clean message is (dus er bevat een uitscheldwoord), stuurt de client het niet door naar de gebruiker. 
Verder worden er verschillende real time events verstuurd en ontvangen tussen de client en de server .

![datalifecycle](https://github.com/laibaaac/rtw/assets/94360732/c3910f69-2223-485e-96f2-04e2ec4326f0)

## Real time events 
Voor het communicatie tussen de server en de clients. Heb ik verschillende real time events gemaakt.

`connection Event` wordt uitgevoerd wanneer de gebruiker verbinding maakt met de server

`chat message Event` waar de gebruikers met elkaar berichten kan sturen in een chat room

`chat history` Maximaal 50 berichten worden opgeslagen, de nieuwe gebruikers die nog binnen komen kunnen alsnog de oude berichten zien.

`Connect` De event ga checken of de applicatie verbinding heeft met de server. Als er geen verbinding is wordt een bericht gestuurd naar de gebruiker dat hij offline is. 

`Error` geeft een offline functie door en ook een bericht wanneer de gebruiker zit uit te schelden. 

`Disconnect` Event die aangeeft dat de client niet meer verbonden is met de server.


## Peer review 
Ik had gevraagd aan verschillende of zij feedback konden geven op mijn werk.
Hiernaar moesten de studenten bekijken om mij een peer review te geven.

Scan your buddy's repository
Does the repo have an apt description?
Is there a link to the live demo at the top?
Are any files in the repo that shouldn't be there like an .env file or node_modules?
Is there a section about the concept, install notes, data life cycle, external API, and real-time events?
Try to understand the concept
Read about the concept in the readme, do you understand what the app does?
Open up the live link (if it's already alive) and play around with the app
Review the app's functions in an issue, feel free to add cool new ideas in an issue
Test the app in multiple tabs, does multi-user functionality work as expected?
Understand the data life cycle
Are all the app's components present in a visual diagram?
Is it clear what data is stored for each component?
Is it clear how components communicate with each other? (socket, polling, OAuth)
Can you follow where real-time data is created?
Check the real-time events
Are all custom events described?
Can you imagine how the client-server communication works now that you know which events are used?
Review the API info
Is it clear what data the external API offers?
Are instructions present on how to get a key from the API and how to connect to it?

De volgende studenten gaven mij feedback die ik meteen heb verwerkt. 

Peer review #1
Hilal: 
De repo heeft geen description.
Ja er is een live link, twee zelfs!
Er is geen onnodige files want ze heeft een gitignore
Nee er is helemaal geen readme, ook geen wiki.

De app ziet er leuk uit. Het lijkt op een chat voor web girls. Multi user functie werkt. Ik merkte als je veel chats stuurt dat de css glitcht. Je gaat zo naar beneden soortvan. zie foto

De api is voor scheldwoorden. Als je een curse word zegt krijg je een waarschuwing

Peer review #2 
Keisha:
Ja de repo heeft een description, er is ook een live link!
Nee de bestandenstructuur klopt allemaal
Ja de readme heeft veel informatie
De concept is matig beschreven
Live link en app werkt!
Data model en data lifecycle zijn goed uitgebreid beschreven!
Ook al haar events zijn beschreven, misschien kon ze de code erbij zetten om het nog meer uit te leggen. 
Haar api is geen api maar meer een npm tool, ze legt het best goed uit 

Jevona:
Yes the repo has an description 
yes there is a live link 
no everything looks alright in the file structure
yes she has a really extensive readme
yes i kinda understand her concept
the live link does certainly work also multiple users can use the app, the app is easy to follow!
The data lifecycle of hers looks different because she uses a npm tool instead of an api, but it is easy to follow
All the component that she mentioned are also mentioned in the data life cycle 
Yes kinda, i think she stores the chat history 
Yes she uses sockets
i think it is created in her client and server, but it doesn't really mention so in the readme 
all the custom events are described, only if she could put her code there so i can understand furthermore 
The api is described nice and tightly, really nice api!




## Bronnen
- https://www.npmjs.com/package/alex#configuration
- https://alexjs.com/ 
- https://adaptable.io/
- https://railway.app/ 
- https://socket.io/get-started/chat/
- https://www.npmjs.com/package/nodemon 


