const express = require('express'); 
const cors = require('cors'); 
const jwt = require('jsonwebtoken'); 
const lib = require('./web-app/dbOperations');

// decalare db object
let db;
// mongo db url
const url = 'mongodb+srv://cis350:cis350@cluster0.n8yq8.mongodb.net/350Proj?retryWrites=true&w=majority';

const webapp = express(); 

webapp.use(express.json());
webapp.use(express.urlencoded({
    extended: true,
}));

webapp.use(cors({
    credentials: true,
    origin: true
}));

//Change the localHost
webapp.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


let users = new Set(); 

let messages = []; 

webapp.post('/join/', (req, resp) => {
    // check that the username was sent
    if(!req.body.username || req.body.username.length === 0){
        resp.status(400).json({error: 'missing username'});
        return;
    }
    // get username
    const username = req.body.username;
    // create the JWT
    const userToken = jwt.sign({
        name: username,
    }, 'this_is_a_secret_key', {expiresIn: '30s'});

    users.add(username); 
    resp.status(201).json({token: userToken});
});


webapp.post('/verify/', (req, resp) => {
    // check that the token was sent
    if(!req.body.token || req.body.token.length === 0){
        resp.status(400).json({error: 'missing token'});
        return;
    }
    // get the token
    const userToken = req.body.token;
    
    // verify the user token
    jwt.verify(userToken, 'this_is_a_secret_key', function(err, ){
        if(err){
            
            // check if the error is an expiration error
            if(err.name === 'TokenExpiredError'){
                resp.status(302).json({error: 'session expired'});
                return;
            }
        }
        resp.json({message: 'session valid'});
    })
});

webapp.get('/users', (_req, res) =>{
    console.log('users', users);
     res.json({
         data: Array.from(users),
     })
});

webapp.get('/messages', ( _req, resp ) => {
    resp.json({data: messages, });
});

webapp.post('/messages', ( req, resp ) => {
    if(!req.body.from || !req.body.to || !req.body.content) {
        resp.status(400).json({error: 'missing message field(s)'});
        return;
    }
    messages.push({
        from: req.body.from, 
        to: req.body.to, 
        content: req.body.content
    });
    resp.status(201).json({receipt: 'ok'});

});







// Root endpoint
webapp.get('/', (req, res) => {
  res.json({ message: 'root' });
});

//endpoints
// 1. adding a new account endpoint
webapp.post('/accounts', async (_req, resp) => {
  if (!_req.body.username || _req.body.username.length === 0) {
    resp.status(400).json({ error: 'bad input parameters' });
  } else if ((await lib.getUser(db, { username: _req.body.username })).length !== 0) {
    resp.status(409).json({ error: 'account already exists' });
  } else {
    try {
      await lib.addUser(db, { username: _req.body.username, email: _req.body.email, 
        phone: _req.body.phone, password: _req.body.password,
         neighborhood: _req.body.neighborhood});
      resp.status(201).json({ message: 'account with id added' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
});

// 2. signing into an account endpoint, getting accounts events endpoint, getting account info endpoint
webapp.get('/accounts', async (_req, resp) => {
  try {
    const results = await lib.getUser(db, { username: _req.body.username });
    resp.status(200).json({data: results});
  } catch (error) {
    resp.status(500).json({ error: 'try again later' });
  }
});

// 3. deleting an account endpoint
webapp.delete('/accounts', async (_req, resp) => {
  // req should include username of the account to delete
  if (!_req.body.username || _req.body.username.length === 0) {
    resp.status(400).json({ error: 'bad input parameters' });
  } else if ((await lib.getPlayer(db, { username: _req.body.username })).length === 0) {
    resp.status(409).json({ error: 'account does not exist' });
  } else {
    try {
      await lib.deleteUser(db, _req.body.username);
      resp.status(200).json({ message: 'Account deleted' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
});

//event had name, description, date, time, location, imgURL, creator
// 4. making an event endpoint
webapp.post('/events', async (_req, resp) => {
  //checks that events name is unique
  console.log(_req.body);
  console.log(_req.body.imgURL);
  if ((await lib.getEvent(db, { name: _req.body.name })).length !== 0) {
    resp.status(409).json({ error: 'event already exists with same name' });
  } else {
    try {
      await lib.addEvent(db, { name: _req.body.name, description: _req.body.description, 
        date: _req.body.date, location: _req.body.location, imgURL: _req.body.imgURL, 
        time: _req.body.time, creator: _req.body.creator });
      resp.status(201).json({ message: 'event with id added' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
});

// 5. get info about a particualr event or all events endpoint
webapp.get('/events', async (_req, resp) => {
  //get all events if no searchString provided (name of event)
  if (typeof _req.body.searchString === 'undefined') {
    try {
      const results = await lib.getAllEvents(db);
      resp.status(200).json({ data: results });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  } else {
    try {
      const results = await lib.getEvent(db, _req.body.searchString);
      resp.status(200).json({ data: results });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
});

webapp.get('/my-events/:name', async (_req, resp) =>{
  try{
    //console.log(_req.params.name);
    console.log("getting my events for "+ _req.params.name);
    const results = await lib.getMyEvents(db, _req.params.name);
    resp.status(200).json({ data: results});
  } catch (e) {
    resp.status(500).json({ error: 'try again later' });
  }
});

webapp.post('/signup', async (_req, resp) => {
  console.log("trying to sign up");
  try{
    console.log('signing up'+_req.body.username + " " + _req.body.eventTitle);
    await lib.signUp(db, _req.body.username, _req.body.eventTitle);
    resp.status(200).json({message: 'signed up for event'});
  } catch (e) {
    resp.status(500).json({error: 'try again later'});
  }
});

// 6. deleting an event 
webapp.delete('/events', async (_req, resp) => {
  //req should have name (name of event) and currentAccount (username of the current account)
  if (!_req.body.name || _req.body.name.length === 0) {
    resp.status(400).json({ error: 'bad input parameters' });
  } else if ((await lib.getEvent(db, { searchString: _req.body.name })).length === 0) {
    resp.status(409).json({ error: 'event does not exist' });
  } else if (_req.body.currentAccount !== (await lib.getEvent(db, { searchString: _req.body.name })).creator) {
    resp.status(409).json({ error: 'account not authorized' });
  } else {
    try {
      await lib.deleteEvent(db, _req.body.name);
      resp.status(200).json({ message: 'Event deleted' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
});

// 7. updating the information of an event
webapp.put('/events', async (_req, resp) => {
  //name is mandatory
  //checks what attribute is to be updated
  //location
  if (typeof _req.body.location !== 'undefined') {
    try {
      await lib.updateLocation(db, { name: _req.body.name, location: _req.body.location });
      resp.status(200).json({ message: 'Events location updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
  //description
  if (typeof _req.body.description !== 'undefined') {
    try {
      await lib.updateDescription(db, { name: _req.body.name, description: _req.body.description });
      resp.status(200).json({ message: 'Events location updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
  //date
  if (typeof _req.body.date !== 'undefined') {
    try {
      await lib.updateDate(db, { name: _req.body.name, date: _req.body.date });
      resp.status(200).json({ message: 'Events time updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
  //time
  if (typeof _req.body.time !== 'undefined') {
    try {
      await lib.updateTime(db, { name: _req.body.name, time: _req.body.time });
      resp.status(200).json({ message: 'Events time updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
  //imgURL
  if (typeof _req.body.imgURL !== 'undefined') {
    try {
      await lib.updateImgURL(db, { name: _req.body.name, imgURL: _req.body.imgURL });
      resp.status(200).json({ message: 'Events image updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
});

// 8. updating the information of an account
webapp.put('/accounts', async (_req, resp) => {
  //username is mandatory
  //checks what attribute is to be updated
  //email
  if (typeof _req.body.email !== 'undefined') {
    try {
      await lib.updateEmail(db, { name: _req.body.name, email: _req.body.emial });
      resp.status(200).json({ message: 'account emial updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
  //password
  if (typeof _req.body.password !== 'undefined') {
    try {
      await lib.updatePassword(db, { name: _req.body.name, password: _req.body.password });
      resp.status(200).json({ message: 'accounts password updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
  //phone
  if (typeof _req.body.phone !== 'undefined') {
    try {
      await lib.updatePhone(db, { name: _req.body.name, date: _req.body.date });
      resp.status(200).json({ message: 'Events time updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
  //neighborhood
  if (typeof _req.body.neighborhood !== 'undefined') {
    try {
      await lib.updateNeighborhood(db, { name: _req.body.name, neighborhood: _req.body.neighborhood });
      resp.status(200).json({ message: 'Events time updated' });
    } catch (error) {
      resp.status(500).json({ error: 'try again later' });
    }
  }
});

// Default response for any other request
webapp.use((_req, res) => {
  res.status(404);
});

const port = 8080; 

webapp.listen(port, async () => {
  db = await lib.connect(url);
  console.log(`server running on port: ${port}`);
}); 

module.exports = webapp; // export to test
