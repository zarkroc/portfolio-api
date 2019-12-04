// process.env.NODE_ENV = 'test';
// //const jest = require('jest');
// const server = require('../server.js');
// const request = require('supertest');


// afterAll(async () => {
//     server.stop();
// });


// describe('verify /', () => {
//     it('We get a valid response', async (done) => {
//         request(server).get('/').then((response) => {
//             expect(response.statusCode).toBe(200);
//         expect(response.body.data.about.name).toEqual("Tomas Perers");
//         expect(response.body.data.about.description).toBeDefined();
//         expect(response.body.data.about.interest).toBeDefined();
//         expect(response.body.data.about.location).toBeDefined();
//         expect(response.body.data.title).toBeDefined();
//         done();
//         });
//     });
// });