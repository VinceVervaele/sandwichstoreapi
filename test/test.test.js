const request = require('supertest');
const mongoose = require('mongoose');
require('dotenv').config();
const { Customer} = require("../models/customer");
const { Sandwich} = require("../models/sandwich");
const { Order } = require("../models/order");
const { Drink } = require("../models/drink");
const app = require("../index");

//admin auth, deze kan gemaakt worden via auth.http als u de user naar admin verandert via de database
let adminAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkNGZhNDQ2MzhhMzc0OWExODYxNzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ5MjQyMDV9.1CiHpA-KXoA6VaX2Ycov5-WaWdkBQmV-MI3lta4CwW4";
//regular user auth
let regularUserAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZlMDliMWNkOGZhMDMyNmI2N2Q4ODQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg0OTMzMDQxfQ.DCw6eGy7loLrk2CzVW1NdVYv6ugiPCYkT2X0zQGv3Hs";


// -------------------------------- CUSTOMER --------------------------------------
//declaratie van customerId zodat we dit global kunnen gebruiken
let customerId

describe("GET /api/customers", () => {
  it('get all customers', async () => {
    const response = await request(app).get('/api/customers')
    .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(200);
  });

  it('get all customers -> no admin', async () => {
    const response = await request(app)
    .get('/api/customers')
    .set('x-auth-token', regularUserAuthToken);

    expect(response.status).toBe(403);
  });
});

describe("POST /api/customers", () => {
  it('create a new customer', async () => {
    customerData = {
      name: 'John Doe',
      address: '123 Main St',
      phone: '555-1234',
      email: 'vincevv@test.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/customers')
      .send(customerData);

    customerId = response.body._id
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(customerData.name);
    expect(response.body.address).toBe(customerData.address);
    expect(response.body.phone).toBe(customerData.phone);
    expect(response.body.email).toBe(customerData.email);
  });

  it('create a new customer -> not all required fiels in body', async () => {
    customerData = {
      name: 'John Doe',
      address: '123 Main St',
      phone: '555-1234',
      email: 'vincevv@test.com'
    };

    const response = await request(app)
      .post('/api/customers')
      .send(customerData);

    expect(response.status).toBe(400);
  });
});

describe("PUT /api/customers/:id", () => {
  it('update a customer by ID admintoken', async () => {
    const updatedCustomerData = {
      name: 'Vince',
      address: '123 Main St',
      phone: '555-1234',
      email: 'testput@test.com',
      password: 'password123',
    };

    const response = await request(app)
      .put(`/api/customers/${customerId}`)
      .set('x-auth-token', adminAuthToken) 
      .send(updatedCustomerData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedCustomerData.name);
  });

  it('should update a customer by ID regulartoken', async () => {
    const updatedCustomerData = {
      name: 'VinceTest',
      address: '123 Main St',
      phone: '555-1234',
      email: 'testput@test.com',
      password: 'password123',
    };

    const response = await request(app)
      .put(`/api/customers/${customerId}`)
      .set('x-auth-token', regularUserAuthToken) 
      .send(updatedCustomerData);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedCustomerData.name);
  });
  it('should update a customer by ID -> invalid token', async () => {
    const updatedCustomerData = {
      name: 'VinceTest',
      address: '123 Main St',
      phone: '555-1234',
      email: 'testput@test.com',
      password: 'password123',
    };

    const response = await request(app)
      .put(`/api/customers/${customerId}`)
      .set('x-auth-token', "test123") 
      .send(updatedCustomerData);

    expect(response.status).toBe(400);
  });

});

describe("PUT /api/customers/:id/isAdmin", () => {
  it('should update the isAdmin status of a customer by ID', async () => {
    const updatedAdminStatus = {
      isAdmin: true
    };

    const response = await request(app)
      .put(`/api/customers/changeToAdmin/${customerId}`)
      .set('x-auth-token', adminAuthToken)
      .send(updatedAdminStatus);

    expect(response.status).toBe(200);
    expect(response.body.isAdmin).toBe(updatedAdminStatus.isAdmin);
  });


  it('should not update the isAdmin status of a customer by ID because customer is not a admin', async () => {
    const updatedAdminStatus = {
      isAdmin: true
    };

    const response = await request(app)
      .put(`/api/customers/changeToAdmin/${customerId}`)
      .set('x-auth-token', regularUserAuthToken)
      .send(updatedAdminStatus);

    expect(response.status).toBe(403);
  });
});

describe('GET /api/customers/:id', () => {
  it('update customer by ID', async () => {  
    const response = await request(app)
    .get(`/api/customers/${customerId}`)
    .set('x-auth-token', adminAuthToken);

    const customer = await Customer.findById(customerId);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(customer.name);
    expect(response.body.address).toBe(customer.address);
    expect(response.body.phone).toBe(customer.phone);
    expect(response.body.email).toBe(customer.email);
  });
});

describe("DELETE /api/customers/:id", () => {
  it(' delete a customer by ID', async () => {
    const deleteResponse = await request(app)
    .delete(`/api/customers/${customerId}`)
    .set('x-auth-token', adminAuthToken);

    expect(deleteResponse.status).toBe(200);
  });

  it('delete a customer by ID -> no admin', async () => {
    const deleteResponse = await request(app)
    .delete(`/api/customers/${customerId}`)
    .set('x-auth-token', regularUserAuthToken);

    expect(deleteResponse.status).toBe(403);
  });
});

// ---------------------------------------- SANDWICH ----------------------------------------
//declaratie van sandwichId zodat we dit global kunnen gebruiken
let sandwichId

describe('GET /api/sandwiches', () => {
  it('getall sandwiches', async () => {
    const response = await request(app)
    .get('/api/sandwiches');
    expect(response.status).toBe(200);
  });
});

describe('POST /api/sandwiches', () => {
  it('create a new sandwich', async () => {
    const sandwichData = {
      name: 'Ham and Cheese',
      price: 5.99,
      ingredients: ['ham', 'cheese'],
    };

    const response = await request(app)
      .post('/api/sandwiches')
      .set('x-auth-token', adminAuthToken)
      .send(sandwichData);
    
    sandwichId = response.body._id;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(sandwichData.name);
    expect(response.body.price).toBe(sandwichData.price);
    expect(response.body.ingredients).toEqual(sandwichData.ingredients);
  });

  it('create a new sandwich -> no admin', async () => {
    const sandwichData = {
      name: 'Ham and Cheese',
      price: 5.99,
      ingredients: ['ham', 'cheese'],
    };

    const response = await request(app)
      .post('/api/sandwiches')
      .set('x-auth-token', regularUserAuthToken)
      .send(sandwichData);
  
    expect(response.status).toBe(403);
  });
});

describe('PUT /api/sandwiches/:id', () => {
  it('update a sandwich by ID', async () => {
    const updatedData = {
      name: 'Ham and Swiss',
      price: 7.99,
      ingredients: ['ham', 'swiss'],
    };

    const response = await request(app)
      .put(`/api/sandwiches/${sandwichId}`)
      .set('x-auth-token', adminAuthToken)
      .send(updatedData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(response.body.name);
    expect(response.body.price).toBe(response.body.price);
    expect(response.body.ingredients).toEqual(response.body.ingredients);
  });

  it('update a sandwich by ID -> no admin', async () => {
    const updatedData = {
      name: 'Ham and Swiss',
      price: 7.99,
      ingredients: ['ham', 'swiss'],
    };

    const response = await request(app)
      .put(`/api/sandwiches/${sandwichId}`)
      .set('x-auth-token', regularUserAuthToken)
      .send(updatedData);

    expect(response.status).toBe(403);
  });
});

describe('GET /api/sandwiches/:id', () => {
  it('get sandwich by ID', async () => {  
    const response = await request(app)
    .get(`/api/sandwiches/${sandwichId}`
    );
    const sandwich = await Sandwich.findById(sandwichId);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toEqual(sandwich.name);
    expect(response.body.price).toBe(sandwich.price);
    expect(response.body.ingredients).toEqual(sandwich.ingredients);
  });

  it('get sandwich by ID -> invalid id', async () => {  
    const response = await request(app)
    .get(`/api/sandwiches/test`
    );
    expect(response.status).toBe(400);
  });
});

describe('DELETE /api/sandwiches/:id', () => {
  it('delete sandwich by id', async () => {
     const response = await request(app)
     .delete(`/api/sandwiches/${sandwichId}`)
     .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(200);
  });

  it('delete sandwich by id -> no admin', async () => {
    const response = await request(app)
    .delete(`/api/sandwiches/${sandwichId}`)
    .set('x-auth-token', regularUserAuthToken);

   expect(response.status).toBe(403);
 });
});

// ------------------------------- ORDER -----------------------------------------------
let orderId;

describe('GET /api/orders', () => {
  it('get all orders', async () => {
    const response = await request(app)
      .get('/api/orders')
      .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(200);
  });
});

describe('POST /api/orders', () => {
  it('create a new order', async () => {
    const customer = new Customer({
      name: 'John Doe',
      phone: '555-1234',
      address: "test 12",
      email: 'johndoe@test.com',
      password: 'password123',
    });
    await customer.save();

    const sandwich = new Sandwich({
      name: 'Ham and Cheese',
      price: 5.99,
      ingredients: ['ham', 'cheese'],
    });
    await sandwich.save();

    const drink = new Drink({
      name: 'Coke',
      price: 1.99,
      amountInStock: 10,
    });
    await drink.save();

    const orderData = {
      customer: customer._id,
      sandwiches: [sandwich._id],
      drinks: [drink._id],
      deliverDate: Date.now(),
    };

    const response = await request(app)
      .post('/api/orders')
      .set('x-auth-token', adminAuthToken)
      .send(orderData);
  
    orderId = response.body._id;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.customer._id).toBe(customer._id.toString());
    expect(response.body.sandwiches[0]._id).toBe(sandwich._id.toString());
    expect(response.body.drinks[0]._id).toBe(drink._id.toString());
  });
});

describe('GET /api/orders/:id', () => {
  it('get order by ID', async () => {
    const response = await request(app)
      .get(`/api/orders/${orderId}`)
      .set('x-auth-token', adminAuthToken);

    const order = await Order.findById(orderId);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.customer._id).toBe(order.customer._id.toString());
    expect(response.body.sandwiches[0]._id).toBe(order.sandwiches[0]._id.toString());
    expect(response.body.drinks[0]._id).toBe(order.drinks[0]._id.toString());

    await Order.findByIdAndDelete(response.body._id);
  });

  it('get order by ID -> invalid ID', async () => {
    const response = await request(app)
      .get('/api/orders/invalid-id')
      .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(400);
    
  });
});
// ------------------------------------------------------------- DRINK ---------------------------------------------------
let drinkId;
describe('GET /api/drinks', () => {
  it('get all drinks', async () => {
    const response = await request(app)
      .get('/api/drinks')
      .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(200);
  });
});

describe('POST /api/drinks', () => {
  it('create a new drink', async () => {
    const drinkData = {
      name: 'New Drink',
      price: 2.99,
      amountInStock: 5
    };

    const response = await request(app)
      .post('/api/drinks')
      .set('x-auth-token', adminAuthToken)
      .send(drinkData);
    drinkId = response.body._id;
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(drinkData.name);
    expect(response.body.price).toBe(drinkData.price);
    expect(response.body.amountInStock).toBe(drinkData.amountInStock);
  });
});

describe('GET /api/drinks/:id', () => {
  it('get drink by ID', async () => {

    const response = await request(app)
      .get(`/api/drinks/${drinkId}`)
      .set('x-auth-token', adminAuthToken);

    const drink = await Drink.findById(drinkId)
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(drink.name);
    expect(response.body.price).toBe(drink.price);
    expect(response.body.amountInStock).toBe(drink.amountInStock);
  });

  it('get drink by ID -> invalid id', async () => {
    const response = await request(app)
      .get('/api/drinks/test');

    expect(response.status).toBe(400);
  });
});

describe('PUT /api/drinks/:id', () => {
  it('should update drink by ID', async () => {
    const newDrink = new Drink({
      name: 'New Drink',
      price: 2.99,
      amountInStock: 5
    });
    await newDrink.save();

    const updatedDrinkData = {
      name: 'Updated Drink',
      price: 3.99,
      amountInStock: 10
    };

    const response = await request(app)
      .put(`/api/drinks/${newDrink._id}`)
      .set('x-auth-token', adminAuthToken)
      .send(updatedDrinkData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(updatedDrinkData.name);
    expect(response.body.price).toBe(updatedDrinkData.price);
    expect(response.body.amountInStock).toBe(updatedDrinkData.amountInStock);

    await Drink.findByIdAndDelete(newDrink._id);
  });

  it('get drink ID -> invalid ID', async () => {
    const response = await request(app)
      .put('/api/drinks/testt')
      .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(400);
  });
});

describe('DELETE /api/drinks/:id', () => {
  it('delete drink by id', async () => {
    const newDrink = new Drink({
      name: 'New Drink',
      price: 2.99,
      amountInStock: 5
    });
    await newDrink.save();

    const response = await request(app)
      .delete(`/api/drinks/${newDrink._id}`)
      .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(newDrink.name);
    expect(response.body.price).toBe(newDrink.price);
    expect(response.body.amountInStock).toBe(newDrink.amountInStock);

    const deletedDrink = await Drink.findById(newDrink._id);
    expect(deletedDrink).toBeNull();
  });

  it('delete drink by id -> invalid ID', async () => {
    const response = await request(app)
      .delete('/api/drinks/invalid-id')
      .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(400);
  });
});
