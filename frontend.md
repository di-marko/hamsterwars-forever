# HAMSTERWARS frontend

- [Backend](backend.md): REST API med Node.js, Express och Firestore/MongoDB
- Frontend: web app med React

Frontend-uppgiften handlar om att bygga en app, som använder backend från första uppgiften.

---

## Specifikation

Hamster-objekt och match-objekt finns beskrivna i [backend.md](backend.md).

---

#### Godkänt-nivå

Först ska du skriva i `README.md` om vad du har jobbat med.

Appen ska ha följande vyer:

| Vy                 | Frontend- route | Innehåll                                                                                                               |
| ------------------ | --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Startsida          | `/`             | Förklara hur man använder appen.                                                                                       |
| Tävla              | `/battle`       | Visa två slumpade hamstrar. Låt användaren välja den sötaste. Visa resultatet och initiera nästa match.                |
| Galleri            | `/gallery`      | Visa alla hamstrar som finns i databasen. Från galleriet ska man även kunna lägga till nya hamstrar och ta bort gamla. |
| Statistik (**VG**) | `/statistics`   | Visa de 5 hamstrar som vunnit respektive förlorat mest.                                                                |
| Historik (**VG**)  | `/history`      | Visa resultatet från alla matcher. Ta bort resultat.                                                                   |

##### Startsida

Här ska du förklara för användaren hur man använder appen. Länka till vyerna _Tävla_ och _Galleri_. (Med React Router-länkar, `<Link />`.)

Om det av någon anledning inte går att nå backend-servern så ska du visa ett _användarvänligt felmeddelande_ här. Användaren ska också få möjligheten att försöka igen.

##### Tävla

När battle-vyn visas ska du slumpa två hamstrar, som visas för användaren. Användaren ska klicka för att rösta på den sötaste. Man ska kunna se bilderna och information om varje hamster - men inte hur många vinster/förluster hamstern har. (Det kan påverka hur man röstar!)

När användaren klickar ska båda hamster-objekten uppdateras: vinnaren får +1 vinst och förloraren +1 förlust. Nu ska du visa hur många vinster och förluster respektive hamster har. Användaren ska få möjligheten att starta en ny match, med två slumpade hamstrar.

_Tänk på att uppdatera alla dokument i databasen där vinst och förlust lagras._

##### Galleri

Här ska appen visa alla hamstrars namn och bild, i ett CSS grid.

Man ska kunna ta bort en hamster från galleriet.

Man ska kunna lägga till en ny hamster via ett formulär. Formuläret ska använda validering.

_Tänk på att inte visa för mycket information direkt. Låt användaren klicka/hovra över en bild för att visa mer information._

---

## Bedömning och återkoppling

För G krävs:

- alla vyer på G-nivå finns och fungerar
- appen är publicerad online
- korrekt inlämning med zip-fil, länk till repot, och länk till appen

---

## Inlämning

Du ska lämna in på Learnpoint: ditt repo och länkar till GitHub och din publicerade app. Observera att repot måste vara _publikt_ för att inlämningen ska kunna bedömas.

1. ladda upp repot som en zip-fil
2. skriv de två länkarna
3. skriv om du har gjort några level ups, eller om du vill ha feedback på något särskilt (ja, både på Learnpoint och i README.md)

Exempel - så här kan du skriva:

```
https://github.com/my-github-username/hamsterwars-fullstack
https://my-hamsterswars-submission.herokuapp.com


_Lycka till!_
```
