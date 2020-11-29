// process.env.NODE_ENV = 'test';
// //const jest = require('jest');
// const server = require('../server.js');
// const request = require('supertest');
// //require("dotenv").config();
// const apiKey = process.env.API_KEY

// afterAll(async () => {
//     server.stop();
// });

// describe('verify /', () => {
//     it('We get a missing API key response', async (done) => {
//         request(server).get('/').then((response) => {
//             expect(response.statusCode).toBe(400);
//         done();
//         });
//     });
// });

// describe('/', () => {
//     it('should get 200 HAPPY PATH', (done) => {
//         request(server)
//         .get("/")
//         .set({api_key: apiKey})
//         .end((err, res) => {
//             expect(res.statusCode).toBe(200);
//             done();
//         });
//     });
// });
