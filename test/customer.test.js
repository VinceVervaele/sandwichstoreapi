const request = require('supertest');
require('dotenv').config();
const { Customer} = require("../models/customer");
const express = require('express');
const app = require("../index");

process.env.NODE_ENV = 'test';
//admin auth
let adminAuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkNGZhNDQ2MzhhMzc0OWExODYxNzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ5MjQyMDV9.1CiHpA-KXoA6VaX2Ycov5-WaWdkBQmV-MI3lta4CwW4";
let customerId


describe("GET /api/customers", () => {
  it('should retrieve all customers', async () => {
    const response = await request(app)
    .get('/api/customers')
    .set('x-auth-token', adminAuthToken);

    expect(response.status).toBe(200);
  });
});

describe("POST /api/customers", () => {
  it('should create a new customer', async () => {
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
});

describe("PUT /api/customers/:id", () => {
  it('should update a customer by ID', async () => {
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
});

describe("DELETE /api/customers/:id", () => {
  it('should delete a customer by ID', async () => {
    const deleteResponse = await request(app)
    .delete(`/api/customers/${customerId}`)
    .set('x-auth-token', adminAuthToken);

    expect(deleteResponse.status).toBe(200);
  });
});



