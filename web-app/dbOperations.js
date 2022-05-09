//import MongoDb driver
const {MongoClient} = require('mongodb');

//0. connect to the db and return connection object
const connect = async (url) => {
    try{
        const con = (await MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})).db();
        console.log(`Connected to database: ${con.databaseName}`);
        return con;
    } catch(err){
        console.error(err);
        throw new Error('could not connect to db');
    }
}

//---Operations for accounts---
//add account to the dataBase
const addUser = async (db, newUser) => {
    try{
        const result = await db.collection('accounts').insertOne(newUser);
        console.log(`added user with id: ${result.insertedId}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not add user');
    }
}

//delete account from the database
const deleteUser = async (db, user) => {
    try{
        const result = await db.collection('accounts').deleteOne({username: user.username});
        console.log(`deleted player with id: ${result.deletedId} and user info: ${user}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not delete user');
    }
}

//get a users account from the database
async function getUser(db, user){
    try {
        const results = await db.collection('accounts').find({ username: user.username });
        return results;
    } catch (e) {
        return null;
    }
}

//update neighborhood
const updateNeighborhood = async (db, user) => {
    try{
        const result = await db.collection('accounts').updateOne({username: user.username},{$set:{neighborhood: user.neighbood}});
        console.log(`updated neighborhood`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update neighborhood');
    }
}

//update email
const updateEmail = async (db, user) => {
    try{
        const result = await db.collection('accounts').updateOne({username: user.username},{$set:{email: user.email}});
        console.log(`updated email`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update email');
    }
}

//update phone
const updatePhone = async (db, user) => {
    try{
        const result = await db.collection('accounts').updateOne({username: user.username},{$set:{phone: user.phone}});
        console.log(`updated phone`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update email');
    }
}

//update password
const updatePassword = async (db, user) => {
    try{
        const result = await db.collection('accounts').updateOne({username: user.username},{$set:{password: user.password}});
        console.log(`updated password`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update email');
    }
}

//---Operations for events---
const addEvent = async (db, newEvent) => {
    try{
        const result = await db.collection('events').insertOne(newEvent);
        console.log(`added event with id: ${result.insertedId}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not add event');
    }
}

//delete event from the database
const deleteEvent = async (db, name) => {
    try{
        const result = await db.collection('events').deleteOne({name: name});
        console.log(`deleted event`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not delete event');
    }
}

//get all events from the database
async function getAllEvents(db){
    try {
        const results = await db.collection('events').find({}).toArray();
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('could not get all events from database');
    }
}
//get event from the database
async function getEvent(db, name){
    try {
        const results = await db.collection('events').find({name: name}).toArray();
        console.log(results);
        return results;
    } catch (e) {
        console.error(e);
        return null;
    }
}

async function getMyEvents(db, name){
    try{
        
        const results = await db.collection('events').find({creator: name}).toArray();
        return results;
    } catch (e) {
        console.error(e);
        throw new Error('coud not get my events from database');
    }
}

async function signUp(db, username, eventTitle){
    try{
        const event = await getEvent(db, eventTitle);
        if (event.length !== 0){
            let myevent = event[0];
            let signedUp = [];
            if (!myevent.hasOwnProperty('signedUp')){
                signedUp = [username];
            } else if (myevent.signedUp.length === 0) {
                signedUp = [username];
            } else {
                if (!myevent.signedUp.includes(username)){
                    signedUp = myevent.signedUp.push(username);
                } else {
                    signedUp = myevent.signedUp;
                }
            }
            await db.collection('events').updateOne({name:eventTitle},{$set:{signedUp : signedUp}});
            
        }

    } catch (e) {
        console.error(e);
    }
}



//update event date
const updateDate = async (db, event) => {
    try{
        const result = await db.collection('events').updateOne({name: event.name},{$set:{date: event.date}});
        console.log(`updated event date`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update date of event');
    }
}

//update event time
const updateTime = async (db, event) => {
    try{
        const result = await db.collection('events').updateOne({name: event.name},{$set:{time: event.time}});
        console.log(`updated event time`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update time of event');
    }
}

//update event location
const updateLocation = async (db, event) => {
    try{
        const result = await db.collection('events').updateOne({name: event.name},{$set:{location: event.location}});
        console.log(`updated event location`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update location of event');
    }
}

//update event description
const updateDescription = async (db, event) => {
    try{
        const result = await db.collection('events').updateOne({name: event.name},{$set:{description: event.description}});
        console.log(`changed event description`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update the description of the event');
    }
}

//update event image
const updateImgURL = async (db, event) => {
    try{
        const result = await db.collection('events').updateOne({name: event.name},{$set:{imgURL: event.imgURL}});
        console.log(`changed event img`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update the image of the event');
    }
}

module.exports = {connect,addUser, deleteUser, getUser, deleteEvent, updatePhone, updateEmail,
    addEvent, getAllEvents, getEvent, updateDate, updatePassword, updateImgURL,
    updateDescription, updateLocation, updateTime, updateNeighborhood, getMyEvents, signUp};



    
// const main = async () => {
//     let db = await connect('mongodb+srv://cis350:cis350@cluster0.n8yq8.mongodb.net/350Proj?retryWrites=true&w=majority');
// }

// main();

