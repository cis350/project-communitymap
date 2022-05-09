const express = require('express'); 
const cors = require('cors'); 
const jwt = require('jsonwebtoken'); 


const webapp = express(); 

webapp.use(express.json());
webapp.use(express.urlencoded({
    extended: true,
}));

webapp.use(cors({
    credentials: true,
    origin: true
}));

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
 
const port = 8080; 

webapp.listen(port, () => {
    console.log(`server running on port: ${port}`);
}); 