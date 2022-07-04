# IPASS
SD Individual Propedeuse Assessment

Docent: Stef Joseph-Kruyswijk

Project wordt gehost op: https://ipassflashtattoo.herokuapp.com/

# Installatiehandleiding
## Benodigdheden
- Een ontwikkelomgeving zoals IntelliJ Idea of Visual Studio Code 
- Rudimentaire kennis van het gebruiken van Tomcat

## Installatie
1. Clone de repository naar de projecten map van je ontwikkelomgeving
2. Open de map in jouw ontwikkelomgeving als project

Om de applicatie te draaien met Tomcat (via IntelliJ Idea):

3. Navigeer in het menu naar Run > Edit Configurations, in venster: '+'; kies Tomcat Server > Local.
4. Tabblad 'Deployment': '+' > Artifact; selecteer het 'IPASS:war exploded' artifact en klik OK.
5. In hetzelfde menu, wijzig de application context naar '/' (zie screenshot hieronder):

<img src="https://i.imgur.com/nIuBUAq.png" width=600>

6. Optioneel kan je op tabblad 'Server' configureren dat wijzigingen in bijvoorbeeld HTML / JavaScript / CSS etc. meteen worden doorgegeven aan Tomcat:

<img src="https://i.imgur.com/2v93y1c.png" width=600>

7. Het project is nu klaar voor gebruik!

# Gebruikershandleiding
## Opstarten

1. Start de Tomcat server op
2. Als de installatie goed is verlopen zou je browser een nieuw tabblad moeten openen
3. In dat tabblad krijg je een scherm te zien:

<img src="https://i.imgur.com/jo50oCQ.png" width=600>

4. Voer "Welkom01" in en druk op "submit".
5. Vervolgens krijg je een scherm met producten te zien, de producten kunnen verschillen:

<img src="https://i.imgur.com/DEFgEgm.png" width=600>

6. Hiervandaan kun je zelf de site navigeren.

## Producten zoeken

1. Navigeer naar "Products":

<img src="https://i.imgur.com/KsQOYK4.png" width=600>

2. Vervolgens kom je op deze pagina terecht:

<img src="https://i.imgur.com/2K8ugn2.png" width=600>

3. Voer in de zoekbalk een woord in:

<img src="https://i.imgur.com/n8bEwvZ.png" width=600>

## Registreren

1. In de navigatie, selecteer "Register" en volg de stappen op het scherm:

<img src="https://i.imgur.com/DIgsWaK.png" width=600>

## Inloggen

1. In de navigatie, selecter "Login" en volg de stappen op het scherm:

<img src="https://i.imgur.com/JHPr6lM.png" width=600>

## Wachtwoord wijzigen

1. Als je bent ingelogd kun je jouw wachtwoord wijzigen door in de navigatie op "Account" te klikken.

<img src="https://i.imgur.com/YiWcqFL.png" width=600>

2. Volg de stappen op het scherm om je wachtwoord te wijzigen en probeer dan opnieuw in te loggen met je oude wachtwoord.

## Product in je verlanglijst stoppen

1. Als je bent ingelogd kun je een product in je verlanglijst stoppen door eerst een product te bekijken.
2. Navigeer naar "Products" en selecteer een product naar keuze.
3. Op je scherm zie je een aantal elementen, selecteer het vierkante vakje met het hartjesicoontje er in.

<img src="https://i.imgur.com/yEyaUbh.png" width=600>

4. De knop verandert nu van uiterlijk. Klik het nog een keer om de actie ongedaan te maken.

<img src="https://i.imgur.com/7bdyWfV.png" width=600>

### Producten uit je verlanglijst bekijken

1. Je kan je wishlist bekijken via "Account" > "Wishlist"

<img src="https://i.imgur.com/wIYlW5C.png" width=600>

## Product reserveren

1. Als je bent ingelogd kun je een product reserveren door een product te selecteren en op de product pagina de knop "Book this product" te klikken.

<img src="https://i.imgur.com/7WtIUiV.png" width=600>

2. De knop verandert nu van uiterlijk. Klik het nog een keer om de reservering ongedaan te maken.

<img src="https://i.imgur.com/0kx1HkY.png" width=600>

### Gereserveerde producten bekijken

1. Zodra je een product hebt gereserveerd kun je die terug vinden onder "Account" > "Reservations"

<img src="https://i.imgur.com/tCgYRfE.png" width=600>

### Alle gereserveerde producten bekijken

1. Als **administrator** kun je onder "Account" > "Reservations" alle gereserveerde producten bekijken

<img src="https://i.imgur.com/Hkx3Lh6.png" width=600>

## Product toevoegen

Als administrator kun je producten toevoegen en verwijderen.

1. Navigeer naar "Account" > "New product" en volg de stappen op het scherm.

<img src="https://i.imgur.com/wGyCoYF.png" width=600>

2. Als alles is ingevuld wordt je onmiddelijk doorverwezen naar de pagina van het zojuist gemaakte product:

<img src="https://i.imgur.com/kOLDp4h.png" width=600>

### Product verwijderen

1. Voor de administratoren staan op elke product pagina een rode knop. Zodra je die indrukt krijg je een bevestiging of je het product wilt verwijderen.

<img src="https://i.imgur.com/hEBl6qy.png" width=600>
