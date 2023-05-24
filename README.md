

# Broodjes zaak API


Mijn API bevat 4 models
* Customer
* Order
* Sandwich
* Drink



## Customer

Dit zijn de eindpunten van customer. Hiermee gaan we customers aanmaken, gegevens van huidige customers aanpassen, customers deleten of gegevens gaan opvragen.

### 1. Gegevens ophalen
#### GET /api/customers

Hiermee ga je alle customers die in de database gaan opvragen. Dit eindpunt vereist authenticatie en admin-bevoegdheden. 

### 2. Nieuwe klant toevoegen

#### POST /api/customers

Dit eindpunt maakt een nieuwe klant aan. In de body zal je dan de gegevens moeten meegeven. Zoals je ziet in onderstaand voorbeeld moet je, name, address, phone en email invullen.

#### Body
```
    "name": "Naam van de klant",
    "address": "Adres van de klant",
    "phone": "Telefoonnummer van de klant",
    "email": "E-mailadres van de klant",
    "password": "Passwoord van de klant"
```
#### Response
```
    "name": "Naam van de klant",
    "address": "Adres van de klant",
    "phone": "Telefoonnummer van de klant",
    "email": "E-mailadres van de klant",
    "password": "Passwoord van de klant",
    "isAdmin": false
```
### 3. Klantgegevens bijwerken

#### PUT /api/customers/:id

Dit eindpunt bijwerken de gegevens van een bestaande klant. Dit kan worden gedaan met authenticatie, admin rechten zijn hiervoor niet nodig. Want een customer moet zijn eigen gegevens kunnen aanpassen.

#### Body
```
    "name": "Naam van de klant",
    "address": "Adres van de klant",
    "phone": "Telefoonnummer van de klant",
    "email": "E-mailadres van de klant",
    "password": "Passwoord van de klant"
```
#### Response
```
    "name": "Naam van de klant",
    "address": "Adres van de klant",
    "phone": "Telefoonnummer van de klant",
    "email": "E-mailadres van de klant",
    "password": "Passwoord van de klant",
    "isAdmin": false
```

### 4. Klantgegevens bijwerken naar admin

#### PUT /api/customers/changeToAdmin/:id

Dit eindpunt wijzigt de admin-status van een klant. Hiervoor is ook weer een vereiste van authenticatie en admin rechten

#### Body
```
    "isAdmin": true or false
```

#### Response
```
    "name": "Naam van de klant",
    "address": "Adres van de klant",
    "phone": "Telefoonnummer van de klant",
    "email": "E-mailadres van de klant",
    "password": "Passwoord van de klant",
    "isAdmin": true or false (depends on the body)
```

### 5. Klant verwijderen

#### DELETE /api/customers/:id

Dit eindpunt gaat de customer gaan deleten met het id die meegegeven wordt in de header.

#### Response
```
    "name": "Naam van de klant",
    "address": "Adres van de klant",
    "phone": "Telefoonnummer van de klant",
    "email": "E-mailadres van de klant",
    "password": "Passwoord van de klant",
    "isAdmin": false
```