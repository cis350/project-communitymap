// import supertest
const request = require('supertest');

// import our web app
const webapp = require('./server');

// Import database operations
const dbLib = require('./web-app/dbOperations');

// MongoDB URL
const url = 'mongodb+srv://cis350:cis350@cluster0.n8yq8.mongodb.net/350Proj?retryWrites=true&w=majority';
beforeAll(async () => {
  webapp.listen();
  await dbLib.connect(url);
});

// test add player

describe('/account endpoint tests (add ONLY)', () => {
  test('/account add new user endpoint status code response 400', () => request(webapp).post('/accounts/')
    .send({ username: '', password:'a', phone:'', email:''}).expect(400)
    .then((response) => expect(JSON.parse(response.text).error).toBe('bad input parameters')));
  test('/status code 201 response', () => request(webapp).post('/accounts/')
    .send({username: 'testUser6', email:'test@test.com', phone:'1231231234', password:'123', neighborhood:'Ucity'}).expect(201)
    .then((response) => expect(JSON.parse(response.text).message).toContain('account with id')));
});

describe('/account/:name endpoint tests', () => {
  test('/account/:name 200 response', () => request(webapp).get('/accounts/:name')
    .send({ name: 'aria'}).expect(200))
});

describe('/account/:name deleting an account endpoint', () => {
  test('/account/:name delete account status code response 400', () => request(webapp).delete('/accounts/:name')
    .send({ name: '', password:'a', phone:'', email:''}).expect(409));
  test('/status code 409 response', () => request(webapp).delete('/accounts/:name')
    .send({name: 'testUser8', email:'test@test.com', phone:'1231231234', password:'123', neighborhood:'Ucity'}).expect(409)
    .then((response) => expect(JSON.parse(response.text).error).toContain('does not exist')));
});

describe('/events make ecent endpoint tests ', () => {
  test('/events add new event endpoint status code response 201', () => request(webapp).post('/events/')
    .send({name: 'aria'}).expect(201)
    .then((response) => expect(JSON.parse(response.text).message).toContain('with id')));

});

describe('/events/ get event endpoint', () => {
  test('/event/ get event no search string status code response 200', () => request(webapp).get('/events/')
    .send({ name: ''}).expect(200));
  test('/event/ get event with search string status code response 200', () => request(webapp).get('/events/')
    .send({ searchString: 'aria'}).expect(200));
});

describe('/my-events/:name get endpoint', () => {
  test('/my-events/:name get event for specified name status code response 200', () => request(webapp).get('/my-events/:name')
    .send({ name: 'aria'}).expect(200));
});

describe('/signup post event endpoint', () => {
  test('/signup post status code 200', () => request(webapp).post('/signup')
    .send({ username: 'aria', eventTitle:'birthday'}).expect(200)
    .then((response) => expect(JSON.parse(response.text).message).toContain('signed up')));
});

describe('/events/:name delete account endpoint', () => {
  test('/events/:name delete status code 400', () => request(webapp).delete('/events/:name')
    .send({ name: '', eventTitle:'birthday'}).expect(409));
  test('/events/:name delete status code 409', () => request(webapp).delete('/events/:name')
    .send({ name: 'aria532'}).expect(409)
    .then((response) => expect(JSON.parse(response.text).error).toContain('does not exist')));
});









