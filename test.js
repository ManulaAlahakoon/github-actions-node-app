const request = require('supertest');
const createApp = require('./app');
const { expect } = require('chai');

describe('Node App Tests', () => {

  it('should return false if SECRET_KEY not set', async () => {
    delete process.env.SECRET_KEY; // remove any previous secret

    const app = createApp(false); // do NOT load .env in test
    const res = await request(app).get('/');

    expect(res.status).to.equal(200);
    expect(res.body.secret_set).to.equal(false);
  });

  it('should return true if SECRET_KEY is set', async () => {
    process.env.SECRET_KEY = "mytestsecret";

    const app = createApp(false); // do not reload .env
    const res = await request(app).get('/');

    expect(res.status).to.equal(200);
    expect(res.body.secret_set).to.equal(true);
  });

  it('health endpoint should return OK', async () => {
    const app = createApp(false);
    const res = await request(app).get('/health');

    console.log("Health endpoint result:", res.body.status);

    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("OK");
  });

});

// secret.test.js

describe('SECRET_KEY environment variable', () => {

  it('should not exist if not set', () => {
    delete process.env.SECRET_KEY; // remove if exists

    if (process.env.SECRET_KEY) {
      console.log("SECRET_KEY exists!");
    } else {
      console.log("SECRET_KEY does NOT exist!");
    }

    expect(process.env.SECRET_KEY).to.be.undefined;
  });

  it('should exist if set', () => {
    process.env.SECRET_KEY = "mytestsecret";

    if (process.env.SECRET_KEY) {
      console.log("SECRET_KEY exists!");
    } else {
      console.log("SECRET_KEY does NOT exist!");
    }

    expect(process.env.SECRET_KEY).to.not.be.undefined;
    expect(process.env.SECRET_KEY).to.equal("mytestsecret");
  });

});