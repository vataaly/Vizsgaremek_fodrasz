<<<<<<< HEAD
# Időpont foglalás

## Készítők

- Döbrössy Bálint
- Szüllő Zsolt
- Vatali Zsolt

## Feladat

Interneten tudja magát regisztrálni egy felhasználó,kitudja választani milyen szolgáltatást kér,és egyből láthatóak a szolgaltatasok ara ,fodrászt is tud választani és bejelölhet időpontot.A szolgáltatást a fodrásznak kell vissza igazolni
=======
# Fodrász időpontfoglaló rendszer – Projekt specifikáció

## Projekt neve
Időpont Foglalás.

## Csapat tagjai DD
- Döbrössy Bálint 
- Szüllő Zsolt 
- Vatali Zsolt 
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

## Normalizálás
Az adatbázis 3. normálformának megfelelően lett kialakítva.
Az adatok redundancia nélkül, külön táblákban kerültek tárolásra.
>>>>>>> a5e5ab0 (1.11)
