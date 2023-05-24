# Broodjes zaak API

Mijn API bevat 4 models

- Customer
- Order
- Sandwich
- Drink

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

### 4. Klantgegevens admin gegevens bewerken

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

Dit eindpunt gaat de customer gaan deleten met het id die meegegeven wordt in de header. Hiervoor zijn authenticatie en admin rechten vereist

#### Response

```
    "name": "Naam van de klant",
    "address": "Adres van de klant",
    "phone": "Telefoonnummer van de klant",
    "email": "E-mailadres van de klant",
    "password": "Passwoord van de klant",
    "isAdmin": false
```

### 6. Klantegevens ophalen op basis van id

#### GET /api/customers/:id

Via dit eindpunt kunnen we gegevens opvragen van een specifieke customer. Dit wordt gedaan op basis van id. Het id wordt meegegeven in de header. Ook hier zijn authenticatie en admin rechten vereist

## Drink

Deze eindpunten stellen je in staat om met drinkgegevens te werken.

### 1. Drinkgegevens ophalen

#### GET /api/drinks

Met deze eindpunt zullen we all dranken die in de database zitten gaan opvragen.

### 2. Nieuwe drink toevoegen

#### POST /api/drinks

Dit eindpunt zorgt ervoor dat we een drankje kunnen toevoegen aan de database. Het vereist authenticatie en admin-bevoegdheden.

#### Body

```
    "name": "Naam van de toegevoegde drank",
    "price": "De prijs van de drank",
    "amountInStock": "Het aantal in voorraad"
```

#### Response

```
    "_id": "drink_id",
    "name": "Naam van de toegevoegde drank",
    "price": "De prijs van de drank",
    "amountInStock": "Het aantal in voorraad"
```

### 3. Drinkgegevens bijwerken

#### PUT /api/drinks/:id

Dit eindpunt werkt de gegevens van een bestaande drink bij. Het vereist ook authenticatie en admin-bevoegdheden.

#### Body

```
    "name": "Nieuwe naam",
    "price": "Nieuwe prijs",
    "amountInStock": "Nieuw aantal in voorraad"
```

#### Response

```
    "_id": "drink_id",
    "name": "Nieuwe naam",
    "price": "Nieuwe prijs",
    "amountInStock": "Nieuw aantal in voorraad"
```

### 4. Drinkgegevens bijwerken

#### DELETE /api/drinks/:id

Dit eindpunt verwijdert een drink op basis van het opgegeven ID. Het vereist authenticatie en admin-bevoegdheden.

#### Response

```
    "_id": "drink_id",
    "name": "Naam van de verwijderde drank",
    "price": "De prijs van de verwijderde drank",
    "amountInStock": "Het aantal in voorraad"
```

### 5. Drink verwijderen

#### GET /api/drinks/:id

Dit eindpunt geeft de gegevens van een drink op basis van het opgegeven ID.

#### Response

```
    "_id": "drink_id",
    "name": "Naam van de toegevoegde drank",
    "price": "De prijs van de drank",
    "amountInStock": "Het aantal in voorraad"
```

## Order

Deze eindpunten stellen je in staat om met ordergegevens te werken.

### 1. Ordergegevens ophalen

#### GET /api/orders

Dit eindpunt retourneert een lijst van alle orders, gesorteerd op naam. Het vereist admin rechten en authenticatie.

### 2. Nieuwe order toevoegen

#### POST /api/orders

Dit eindpunt maakt een nieuwe order aan. Het vereist authenticatie, dit omdat een klant een order moet plaatsen. Iemand die geen klant is mag geen order kunnen aanmaken. In de body moeten de volgende gegevens worden opgegeven.

#### Body

```
    "customer": "customer_id",
    "sandwiches": ["sandwich_id1", "sandwich_id2"],
    "drinks": ["drink_id1", "drink_id2"],
    "deliverDate": "2023-05-24T12:00:00.000Z"
```

#### Response

```
  "_id": "order_id",
  "customer": {
    "_id": "customer_id",
    "name": "Naam van de klant",
    "phone": "Telefoonnummer van de klant"
  },
  "sandwiches": [
    {
      "_id": "sandwich_id1",
      "name": "Naam van de sandwich",
      "price": 4.99,
      "ingredients": ["Ingrediënt 1", "Ingrediënt 2"]
    },
    ...
  ],
  "drinks": [
    {
      "_id": "drink_id1",
      "name": "Naam van de drink",
      "price": 2.99,
      "amountInStock": 10
    },
    ...
  ],
  "orderDate": "2023-05-23T12:34:56.789Z",
  "deliverDate": "2023-05-24T12:00:00.000Z"
```

### 3. Ordergegevens ophalen

#### GET /api/orders/:id

Dit eindpunt geeft de gegevens van een order op basis van het opgegeven ID. Het vereist admin rechten en authenticatie.

#### Response

```
  "_id": "order_id",
  "customer": {
    "_id": "customer_id",
    "name": "Naam van de klant",
    "phone": "Telefoonnummer van de klant"
  },
  "sandwiches": [
    {
      "_id": "sandwich_id1",
      "name": "Naam van de sandwich",
      "price": 4.99,
      "ingredients": ["Ingrediënt 1", "Ingrediënt 2"]
    },
    ...
  ],
  "drinks": [
    {
      "_id": "drink_id1",
      "name": "Naam van de drink",
      "price": 2.99,
      "amountInStock": 10
    },
    ...
  ],
  "orderDate": "2023-05-23T12:34:56.789Z",
  "deliverDate": "2023-05-24T12:00:00.000Z"
```

## Sandwich

### 1. Sandwichgegevens ophalen

#### GET /api/sandwiches

Dit eindpunt retourneert een lijst van alle sandwiches, gesorteerd op naam.

### 2. Nieuwe sandwich toevoegen

#### POST /api/sandwiches

Dit eindpunt maakt een nieuwe sandwich aan. Het vereist authenticatie en admin-rechten. In de body moeten de volgende gegevens worden opgegeven:

#### Body

```
    "name": "Naam van de sandwich",
    "price": 4.99,
    "ingredients": ["Ingrediënt 1", "Ingrediënt 2"]
```

#### Respons

```
    "_id": "sandwich_id",
    "name": "Naam van de sandwich",
    "price": 4.99,
    "ingredients": ["Ingrediënt 1", "Ingrediënt 2"]
```

### 3. Sandwichgegevens bijwerken

#### PUT /api/sandwiches/:id

Dit eindpunt bijwerken de gegevens van een sandwich op basis van het opgegeven ID. Het vereist authenticatie en admin-rechten. In de body moeten de bijgewerkte gegevens worden opgegeven:

#### Body

```
    "name": "Bijgewerkte naam van de sandwich",
    "price": 5.99,
    "ingredients": ["Ingrediënt 1", "Ingrediënt 2", "Ingrediënt 3"]
```

#### Respons

```
    "_id": "sandwich_id",
    "name": "Naam van de sandwich",
    "price": 4.99,
    "ingredients": ["Ingrediënt 1", "Ingrediënt 2"]
```

### 4. Sandwich verwijderen

#### DELETE /api/sandwiches/:id

Dit eindpunt verwijdert een sandwich op basis van het opgegeven ID. Het vereist authenticatie en admin-rechten.

#### Respons

```
    "_id": "sandwich_id",
    "name": "Naam van de sandwich",
    "price": 4.99,
    "ingredients": ["Ingrediënt 1", "Ingrediënt 2"]
```

### 5. Sandwichgegevens ophalen

#### GET /api/sandwiches/:id

Dit eindpunt geeft de gegevens van een sandwich op basis van het opgegeven ID.

#### Respons

```
    "_id": "sandwich_id",
    "name": "Naam van de sandwich",
    "price": 4.99,
    "ingredients": ["Ingrediënt 1", "Ingrediënt 2"]
```
