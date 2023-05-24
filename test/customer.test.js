const request = require('supertest');
require('dotenv').config();
const { Customer} = require("../models/customer");
const express = require('express');
const app = require("../index");
const jwt = require('jsonwebtoken');

process.env.NODE_ENV = 'test';

describe("GET /api/customers", () => {
  it('should retrieve all customers', async () => {
    const response = await request(app)
    .get('/api/customers')
    .set('x-auth-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDZkNGZhNDQ2MzhhMzc0OWExODYxNzIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODQ5MjQyMDV9.1CiHpA-KXoA6VaX2Ycov5-WaWdkBQmV-MI3lta4CwW4");

    expect(response.status).toBe(200);
  });
});

describe("POST /api/customers", () => {
  it('should create a new customer', async () => {
    const customerData = {
      name: 'John Doe',
      address: '123 Main St',
      phone: '555-1234',
      email: 'johndoedaddddddddd@example.com',
      password: 'password123',
    };

    const response = await request(app)
      .post('/api/customers')
      .send(customerData);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(customerData.name);
    expect(response.body.address).toBe(customerData.address);
    expect(response.body.phone).toBe(customerData.phone);
    expect(response.body.email).toBe(customerData.email);
    
  });
});

