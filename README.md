
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
## Backend indítása
<img width="1913" height="1062" alt="image" src="https://github.com/user-attachments/assets/eb905b0c-a9fa-423b-be93-e29390eafae2" />

A konzolba ezt kell bemásolni:
npm i

npm start

## Frontend inditás
<img width="1910" height="1080" alt="image" src="https://github.com/user-attachments/assets/a1fd3e80-78e9-4446-a3cc-97d55cb61bef" />


A konzolba ezt kell bemásolni:
npm i 


npm run dev


## Sql inditás
<img width="671" height="428" alt="image" src="https://github.com/user-attachments/assets/36f3da65-b2ce-4b89-8d31-5acf00b3ba78" />


Ezt a kettőt kell elinditani utána



<img width="1903" height="1069" alt="image" src="https://github.com/user-attachments/assets/294c2d7a-f65d-43bf-aba6-380747e2bbcf" />


Az importátálásra kell kattintani majd bemásolni a fájlt


<img width="1324" height="317" alt="image" src="https://github.com/user-attachments/assets/09f8e966-d1ce-4b0d-b995-1f68f8bbb6c2" />


<img width="1904" height="1061" alt="image" src="https://github.com/user-attachments/assets/bdcfb222-e461-4d26-b18d-2b443bbe97fa" />

Majd a végén megint az importálásra kattintani az oldal alján






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

| Művelet     | HTTP   | URL         |
| ----------- | ------ | ----------- |
| Összes adat | GET    | /users      |
| Egy adat    | GET    | /users/{id} |
| Új adat     | POST   | /users      |
| Módosítás   | PUT    | /users/{id} |
| Törlés      | DELETE | /users/{id} |


## Normalizálás
Az adatbázis 3. normálformának megfelelően lett kialakítva.
Az adatok redundancia nélkül, külön táblákban kerültek tárolásra.
>>>>>>> a5e5ab0 (1.11)
