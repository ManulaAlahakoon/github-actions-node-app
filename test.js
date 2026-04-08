const request = require('supertest');
const createApp = require('./app');
const { expect } = require('chai');

describe('Node App Tests', () => {

  it('should return false if SECRET_KEY not set', async () => {
    delete process.env.SECRET_KEY; // remove any previous secret

    const app = createApp(false); // do NOT load .env in test
    const res = await request(app).get('/');

    // ✅ log result in CI / console
    console.log("SECRET_KEY test result (should be false):", res.body.secret_set);

    expect(res.status).to.equal(200);
    expect(res.body.secret_set).to.equal(false);
  });

  it('should return true if SECRET_KEY is set', async () => {
    process.env.SECRET_KEY = "mytestsecret";

    const app = createApp(false); // do not reload .env
    const res = await request(app).get('/');

    // ✅ log result in CI / console
    console.log("SECRET_KEY test result (should be true):", res.body.secret_set);

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