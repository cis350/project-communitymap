// import dbOperations
const dbModule = require('./dbOperations');

// declare db object
let db;

// mongo db url
const url = 'mongodb+srv://cis350:cis350@cluster0.n8yq8.mongodb.net/350Proj?retryWrites=true&w=majority';

// declare test data
const user1 = { username: 'testUser', email:'test@test.com', phone:'1231231234', password:'123', neighborhood:'Ucity'  };
const event = { name: 'testEvent', description:'fun', date:'today', time:'now', location:'here', imgURL:'www' , creator:'me'  };
//event had name, description, date, time, location, imgURL, creator


// clear dataBase
const clearDatabase = async () => {
  try {
    const result = await db.collection('accounts').deleteMany({});
    const { deletedCount } = result;
    if (deletedCount === 0) {
      console.log('warning', 'user was not deleted');
    } else {
      // console.log('info', 'Successfully deleted player');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};
const clearDatabaseE = async () => {
  try {
    const result = await db.collection('events').deleteMany({});
    const { deletedCount } = result;
    if (deletedCount === 0) {
      console.log('warning', 'event was not deleted');
    } else {
      // console.log('info', 'Successfully deleted player');
    }
  } catch (err) {
    console.log('error', err.message);
  }
};
afterEach(async () => {
  await clearDatabase();
  await clearDatabaseE();
});

// 0. test connection
test('addPlayer throws exception', async () =>{
  // wrong password
  const url1 = 'mongodb+srv://cis350:cis351@cluster0.n8yq8.mongodb.net/350Proj?retryWrites=true&w=majority';
  try {
    db = await dbModule.connect(url1);
  } catch (error) {
    // test error message
    expect(error.message).toBe('could not connect to db');
  }
});

// 1. test add a account
test('addUser inserts a new User', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // call addUser
  await dbModule.addUser(db, user1);
  // find testUser in the database
  const newUser = await db.collection('accounts').findOne({username: 'testUser'});
  // test that newUser is testUser
  expect(newUser.username).toEqual('testUser');
});
test('addUser throws exception', async () =>{
  // incorrect Doccument
  const user2 = 'testUser';
  db = await dbModule.connect(url);
  try {
    await dbModule.addUser(db, user2);
  } catch (error) {
    // test error message
    expect(error.message).toBe('could not add user');
  }
});

// 2. testing deleteUser
test('deleteUser deletes a user', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add user
  await dbModule.addUser(db, user1);
  // call deleteUser
  await dbModule.deleteUser(db, user1.username);
  // find testUser in the database
  const search = await db.collection('accounts').findOne({username: 'testUser'});
  // test that newUser is not there anymore 
  expect(search).toEqual(null);
});

// 3. testing update
test('updateNeighborhood updates a users neighborhood', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add user
  await dbModule.addUser(db, user1);
  const initial = await db.collection('accounts').findOne({username: 'testUser'});
  expect(initial.neighborhood).toEqual('Ucity');
  // call updateNeighborhood
  await dbModule.updateNeighborhood(db, {username: 'testUser', neighborhood: 'testNH'});
  // find testUser in the database
  const after = await db.collection('accounts').findOne({username: 'testUser'});
  // test that it was updated
  expect(after.neighborhood).toEqual('testNH');
});
test('updatePhone updates a users phone', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add user
  await dbModule.addUser(db, user1);
  const initial = await db.collection('accounts').findOne({username: 'testUser'});
  expect(initial.phone).toEqual('1231231234');
  // call updatePhone
  await dbModule.updatePhone(db, {username: 'testUser', phone: '123'});
  // find testUser in the database
  const after = await db.collection('accounts').findOne({username: 'testUser'});
  // test that it was updated
  expect(after.phone).toEqual('123');
});
test('updateEmail updates a users email', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add user
  await dbModule.addUser(db, user1);
  const initial = await db.collection('accounts').findOne({username: 'testUser'});
  expect(initial.email).toEqual('test@test.com');
  // call updateEmial
  await dbModule.updateEmail(db, {username: 'testUser', email: 'a@test.com'});
  // find testUser in the database
  const after = await db.collection('accounts').findOne({username: 'testUser'});
  // test that it was updated
  expect(after.email).toEqual('a@test.com');
});
test('updatePassword updates a users password', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add user
  await dbModule.addUser(db, user1);
  const initial = await db.collection('accounts').findOne({username: 'testUser'});
  expect(initial.password).toEqual('123');
  // call updatePassword
  await dbModule.updatePassword(db, {username: 'testUser', password: '321'});
  // find testUser in the database
  const after = await db.collection('accounts').findOne({username: 'testUser'});
  // test that it was updated
  expect(after.password).toEqual('321');
});

// 4. testing getUser
test('getUser retrieves specific User', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // call addUser
  await dbModule.addUser(db, { username: 'testUser1', email:'test1@test.com', phone:'1', password:'1', neighborhood:'1NH'  });
  await dbModule.addUser(db, { username: 'testUser2', email:'test2@test.com', phone:'2', password:'2', neighborhood:'2NH'  });
  await dbModule.addUser(db, { username: 'testUser3', email:'test3@test.com', phone:'3', password:'3', neighborhood:'3NH'  });
  // call getUser
  const user = await dbModule.getUser(db, 'testUser2');
  const usersDB = await db.collection('accounts').findOne({username: 'testUser2'});
  // test that user matches  usersDB
  expect(user).toEqual(new Array(usersDB));
});

//---- EVENTS OPERATIONS ----
// 1. test add a account
test('addEvent inserts a new event', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // call addEvent
  await dbModule.addEvent(db, event);
  // find testEvent in the database
  const newEvent = await db.collection('events').findOne({name: 'testEvent'});
  // test that newEvent is testEvent
  expect(newEvent.name).toEqual('testEvent');
});
test('addEvent throws exception', async () =>{
  // incorrect Doccument
  const event2 = 'testEvent';
  db = await dbModule.connect(url);
  try {
    await dbModule.addEvent(db, event2);
  } catch (error) {
    // test error message
    expect(error.message).toBe('could not add event');
  }
});

// 2. testing deleteEvent
test('deleteEvent deletes a event', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // call addEvent
  await dbModule.addEvent(db, event);
  // call deleteevent
  await dbModule.deleteEvent(db, event.name);
  // find testEvent in the database
  const search = await db.collection('events').findOne({name: 'testEvent'});
  // test that newEvent is not there anymore 
  expect(search).toEqual(null);
});

//event had name, description, date, time, location, imgURL, creator
// 3. testing update
test('updateDate updates a events date', async () =>{
  jest.setTimeout(30000);
  // connect to the db
  db = await dbModule.connect(url);
  // add event
  await dbModule.addEvent(db, event);
  const initial = await db.collection('events').findOne({name: 'testEvent'});
  expect(initial.date).toEqual('today');
  // call updateDate
  await dbModule.updateDate(db, {name: 'testEvent', date: 'today1'});
  // find testUser in the database
  const after = await db.collection('events').findOne({name: 'testEvent'});
  // test that it was updated
  expect(after.date).toEqual('today1');
});
test('updateTime updates a events time', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add event
  await dbModule.addEvent(db, event);
  const initial = await db.collection('events').findOne({name: 'testEvent'});
  expect(initial.time).toEqual('now');
  // call updateTime
  await dbModule.updateTime(db, {name: 'testEvent', time: 'now'});
  // find testUser in the database
  const after = await db.collection('events').findOne({name: 'testEvent'});
  // test that it was updated
  expect(after.time).toEqual('now');
});
test('updateDescription updates a events description', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add event
  await dbModule.addEvent(db, event);
  const initial = await db.collection('events').findOne({name: 'testEvent'});
  expect(initial.description).toEqual('fun');
  // call updateDate
  await dbModule.updateDescription(db, {name: 'testEvent', description: 'fun1'});
  // find testUser in the database
  const after = await db.collection('events').findOne({name: 'testEvent'});
  // test that it was updated
  expect(after.description).toEqual('fun1');
});
test('updateIMG updates a events imgURL', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add event
  await dbModule.addEvent(db, event);
  const initial = await db.collection('events').findOne({name: 'testEvent'});
  expect(initial.imgURL).toEqual('www');
  // call updateIMGURL
  await dbModule.updateImgURL(db, {name: 'testEvent', imgURL: 'qqq'});
  // find testUser in the database
  const after = await db.collection('events').findOne({name: 'testEvent'});
  // test that it was updated
  expect(after.imgURL).toEqual('qqq');
});
test('updateLocation updates a events location', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // add event
  await dbModule.addEvent(db, event);
  const initial = await db.collection('events').findOne({name: 'testEvent'});
  expect(initial.location).toEqual('here');
  // call updateIMGURL
  await dbModule.updateLocation(db, {name: 'testEvent', location: 'here1'});
  // find testUser in the database
  const after = await db.collection('events').findOne({name: 'testEvent'});
  // test that it was updated
  expect(after.location).toEqual('here1');
});

// 4. testing getEvent
test('getEvent retrieves specific event', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // call addEvent
  await dbModule.addEvent(db, { name: 'testEvent1', description:'fun1', date:'today1', time:'now1', location:'here1', imgURL:'www1' , creator:'me1'  });
  await dbModule.addEvent(db, { name: 'testEvent2', description:'fun2', date:'today2', time:'now2', location:'here2', imgURL:'www2' , creator:'me2'  });
  // call getEvent
  const user = await dbModule.getEvent(db, 'testEvent2');
  const usersDB = await db.collection('events').findOne({name: 'testEvent2'});
  // test that user matches  usersDB
  expect(user).toEqual(new Array(usersDB));
});

// 5. test getAllEvents
test('getAllEvents retrieves all events', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // call addEvents
  await dbModule.addEvent(db, { name: 'testEvent1', description:'fun', date:'today1', time:'now1', location:'here1', imgURL:'www1' , creator:'me1'  });
  await dbModule.addEvent(db, { name: 'testEvent2', description:'fun', date:'today2', time:'now2', location:'here2', imgURL:'www2' , creator:'me2'  });
  // call sort top
  const events = await dbModule.getAllEvents(db);
  // check that they match
  const eventsDB = await db.collection('events').findOne({name: 'testEvent1'});
  const eventsDB2 = await db.collection('events').findOne({name: 'testEvent2'});
  expect(events).toEqual([eventsDB,eventsDB2]);
});

// 6. testing getMyEvent
test('getMyEvents retrieves specific Users events', async () =>{
  // connect to the db
  db = await dbModule.connect(url);
  // call addEvent
  await dbModule.addEvent(db, { name: 'testEvent1', description:'fun1', date:'today1', time:'now1', location:'here1', imgURL:'www1' , creator:'me1'  });
  await dbModule.addEvent(db, { name: 'testEvent2', description:'fun2', date:'today2', time:'now2', location:'here2', imgURL:'www2' , creator:'me2'  });
  // call getEvent
  const event2 = await dbModule.getEvent(db, 'testEvent2');
  const myEvent = await dbModule.getMyEvents(db, 'me2');

  // test that user matches  usersDB
  expect(myEvent).toEqual(event2);
});
