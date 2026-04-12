
# Időpont foglalás

## Készítők

- Döbrössy Bálint
- Szüllő Zsolt
- Vatali Zsolt

## Feladat

Interneten tudja magát regisztrálni egy felhasználó,kitudja választani milyen szolgáltatást kér,és egyből láthatóak a szolgaltatasok ara ,fodrászt is tud választani és bejelölhet időpontot.A szolgáltatást a fodrásznak kell vissza igazolni

# Fodrász időpontfoglaló rendszer – Projekt specifikáció

## Projekt neve
Időpont Foglalás.

## Csapat tagjai 
- Döbrössy Bálint 
- Szüllő Zsolt 
- Vatali Zsolt 

## Inditás

A fájl letöltése Zip Fájlként vagy CMD-Be Git clone al bemásolni a tetszőleges mappába

<img width="1172" height="716" alt="image" src="https://github.com/user-attachments/assets/f1317f47-f312-49ce-996c-27ab2a09f2ce" />


```bash
git clone https://github.com/vataaly/Vizsgaremek_fodrasz
```


<img width="964" height="504" alt="image" src="https://github.com/user-attachments/assets/4f19a838-6065-4f2f-a64e-b6b1bae6d4f8" />







## Backend indítása
<img width="1913" height="1062" alt="image" src="https://github.com/user-attachments/assets/eb905b0c-a9fa-423b-be93-e29390eafae2" />

A konzolba ezt kell bemásolni:


```bash
npm i
```
```bash
npm start
```

## Frontend inditás
<img width="1910" height="1080" alt="image" src="https://github.com/user-attachments/assets/a1fd3e80-78e9-4446-a3cc-97d55cb61bef" />


A konzolba ezt kell bemásolni:

```bash
npm i 
```
```bash
npm run dev
```

## Sql inditás
<img width="671" height="428" alt="image" src="https://github.com/user-attachments/assets/36f3da65-b2ce-4b89-8d31-5acf00b3ba78" />


Ezt a kettőt kell elinditani utána



<img width="1903" height="1069" alt="image" src="https://github.com/user-attachments/assets/294c2d7a-f65d-43bf-aba6-380747e2bbcf" />


Az importátálásra kell kattintani majd bemásolni a fájlt


<img width="1324" height="317" alt="image" src="https://github.com/user-attachments/assets/09f8e966-d1ce-4b0d-b995-1f68f8bbb6c2" />


<img width="1904" height="1061" alt="image" src="https://github.com/user-attachments/assets/bdcfb222-e461-4d26-b18d-2b443bbe97fa" />

Majd a végén megint az importálásra kattintani az oldal alján

Majd megnyitni a frontendben a terminálban látható localhostot.

Aztán ha megnyilt ezt a felüleletet kell látni

<img width="2516" height="1286" alt="image" src="https://github.com/user-attachments/assets/f6a83fea-413d-482c-af94-ba7a557eab60" />

Akkor most jöjjön az útmutató



## Kezelési Útmutató: Fodrász Szalon Weboldal
Ez a dokumentum a felhasználók és adminisztrátorok számára nyújt segítséget a weboldal funkcióinak használatához.

1. Navigáció és Főoldal
A weboldal fejlécében található menüpontok segítségével érhetők el a fő funkciók:

Főoldal: Visszatérés a kezdőképernyőre.

Foglalás: Itt választható ki a kívánt időpont és szakember.

Bejelentkezés / Regisztráció: Saját fiók létrehozása a foglalások nyomon követéséhez.

2. Időpontfoglalás menete
Kattintson a főoldali "Időpontot foglalok" kék gombra vagy a menüben a Foglalás pontra.

Válassza ki a Mesterfodrászaink közül a szimpatikus szakembert (pl. Kiss Anna, Nagy Péter).

A Szolgáltatásaink listából válassza ki a kívánt kezelést (pl. Női hajvágás, Borotválás). Az árak és az időtartamok a lista mellett láthatóak.

Válassza ki a szabad időpontot a naptárban, majd véglegesítse a foglalást.

3. Regisztráció és Belépés
A foglaláshoz szükséges egy érvényes felhasználói fiók.

A regisztrációnál adja meg nevét, e-mail címét és egy jelszót.

Bejelentkezés után a profiljában megtekintheti eddigi és jövőbeli időpontjait.

4. Cookie-k (Sütik) elfogadása
Az oldal alján megjelenő fekete sávban tájékozódhat a süti-használatról. A zavartalan böngészéshez kattintson az "Elfogadom" gombra.

5. Felhasználói Fiók Kezelése
Regisztráció és Belépés
Regisztráció: Új felhasználóként az e-mail címed és egy választott jelszó megadásával hozhatsz létre fiókot.

Bejelentkezés: A már regisztrált adatokkal tudsz belépni. Sikeres belépés után a fejlécben megjelenik az üdvözlő szöveg (pl. "Szia, felhasznalo@email.com").

Profil és Kilépés: Bejelentkezett állapotban elérhetővé válik a Profil gomb (ahol a saját adataidat/foglalásaidat látod) és a piros Kilépés gomb a munkamenet lezárásához.

6. Részletes Foglalási Folyamat
Az Időpont foglalás kártyán az alábbi adatokat kell megadni:

Választható szolgáltatás: Gördülő menüből válaszd ki a kezelést (pl. hajvágás, festés).

Fodrász kiválasztása: Válaszd ki, melyik szakemberhez szeretnél menni.

Dátum: A naptár ikonra kattintva jelöld ki a napot.

Időpont (Kezdés): Állítsd be, hány órára érkeznél. A rendszer a szolgáltatás hossza alapján automatikusan kiszámítja a Vége (számított) időpontot.

Véglegesítés: A kék gombra kattintva rögzítheted a foglalást.


## Asztali Alkalmazás

1. Belépés a rendszerbe
A szoftver indításakor egy biztonsági hitelesítő ablak fogadja a felhasználót. A hozzáférés csak érvényes adminisztrátori adatokkal lehetséges.

Belépési felület: Letisztult, minimalista dizájn Email és Jelszó mezőkkel.

Alapértelmezett adatok:

Email: admin@szalon.hu

Jelszó: admin

2. Központi Adminisztrációs Felület
Sikeres belépés után a fővezérlő ablak nyílik meg, amely két fő részre oszlik:

Oldalsó navigációs sáv: Itt válthatunk a „Fodrászok” és „Időpontok” kezelése között. Itt található a hangsúlyos, piros Kijelentkezés gomb is a biztonságos kilépéshez.

Adatterület: Itt jelennek meg a táblázatok és a műveleti gombok (Hozzáadás, Szerkesztés, Törlés).

3. Funkcionális modulok
3.1. Időpontok kezelése
A rendszer legfontosabb része, ahol a foglalásokat követhetjük nyomon egy részletes táblázatban.

Megjelenített adatok: Időpont azonosító, dátum, kezdés/vége, vendég neve, fodrász neve, valamint a szolgáltatás típusa és ára.

Új időpont felvétele: Egy külön ablakban adható meg, ahol:

Naptár választó segíti a pontos dátum megadását.

Legördülő listákból választható ki a felhasználó, a fodrász és a szolgáltatás.

Az Ár mezőben rögzíthető a szolgáltatás ellenértéke.

3.2. Fodrászok nyilvántartása
Ebben a modulban a szalon alkalmazottait kezelhetjük.

Adatkezelés: Lehetőség van a fodrászok nevének, szakterületének (pl. festés, vágás), e-mail címének és telefonszámának rögzítésére vagy módosítására.

4. Biztonság és Hibakezelés
A programot felkészítettük a felhasználói tévedések elkerülésére:

Szelekció figyelése: Ha kijelölés nélkül próbálunk módosítani egy elemet, a rendszer figyelmeztető üzenetet küld: "Kérlek válassz ki egy elemet a szerkesztéshez!"

Adatintegritás: A legördülő menük biztosítják, hogy csak létező fodrászhoz vagy szolgáltatáshoz lehessen időpontot rendelni.







## A megoldandó probléma
A fodrászszalonok időpontkezelése gyakran telefonon vagy személyesen történik,
ami nehezen átlátható és időigényes. A cél egy online rendszer létrehozása,
amellyel az ügyfelek könnyen foglalhatnak időpontot, a fodrászok pedig
hatékonyan kezelhetik a foglalásokat.

## Célcsoport
- Szalon vendégek (felhasználók)
- Fodrászok
- Adminisztrátorok

## Fő funkciók (User Story-k)
- Felhasználóként szeretnék regisztrálni és bejelentkezni
- Felhasználóként szeretnék szolgáltatást és fodrászt választani
- Felhasználóként szeretnék időpontot foglalni
- Fodrászként szeretném visszaigazolni vagy lemondani a foglalásokat
- Adminisztrátorként szeretném kezelni a felhasználókat, szolgáltatásokat és fodrászokat

## Nem funkcionális követelmények
- Biztonságos adatkezelés
- Jogosultságkezelés (user, admin)
- Reszponzív webes felület
- REST API alapú kommunikáció

## Entitások
- Users
- Stylists
- Services
- Appointments
- TimeSlots

## Kapcsolatok
- Users 1:N Appointments
- Stylists 1:N Appointments
- Services 1:N Appointments
- Stylists 1:N TimeSlots
## ER-diagram

Az alábbi ábra a fodrász szalon adatbázisának entitás–kapcsolat (ER) diagramját mutatja.

<img width="1536" height="1024" alt="erdia" src="https://github.com/user-attachments/assets/fab94d5b-8689-40e0-8b0a-40adabd638f1" />

## Elérhető végpontok

<img width="3580" height="1380" alt="api_endpoints_table" src="https://github.com/user-attachments/assets/f47f7494-e144-40c1-a463-db7a32a730dc" />



## Normalizálás
Az adatbázis 3. normálformának megfelelően lett kialakítva.
Az adatok redundancia nélkül, külön táblákban kerültek tárolásra.
>>>>>>> a5e5ab0 (1.11)
