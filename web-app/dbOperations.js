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
        const result = await db.collection('accounts').deleteOne({user});
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
        const results = await db.collection('account').find(user);
        return results;
    } catch (e) {
        return null;
    }
}

//update neighborhood
const updateNeighborhood = async (db, user, neighbood) => {
    try{
        const result = await db.collection('account').updateOne({phoneNumber: user.phoneNumber},{$set:{neighborhood: neighbood}});
        console.log(`changed user: ${user.phoneNumber} neighborhood to ${neighbood}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update neighborhood');
    }
}

//update email
const updateEmail = async (db, user, email) => {
    try{
        const result = await db.collection('account').updateOne({phoneNumber: user.phoneNumber},{$set:{email: email}});
        console.log(`changed user: ${user.phoneNumber} email to ${email}`);
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
        console.log(`added user with id: ${result.insertedId}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not add event');
    }
}

//delete event from the database
const deleteEvent = async (db, eventID) => {
    try{
        const result = await db.collection('events').deleteOne({eventID});
        console.log(`deleted player with id: ${result.deletedId} and user info: ${eventID}`);
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
        console.error(err);
        throw new Error('could not get all events from database');
    }
}

//get event from the database
async function getEvent(db, eventID){
    try {
        const results = await db.collection('events').find(eventID);
        return results;
    } catch (e) {
        return null;
    }
}

//update event date
const updateDate = async (db, eventID, date) => {
    try{
        const result = await db.collection('events').updateOne({eventID: eventID},{$set:{date: date}});
        console.log(`changed event: ${eventID} date to ${date}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update date of event');
    }
}

//update event time
const updateTime = async (db, eventID, time) => {
    try{
        const result = await db.collection('events').updateOne({eventID: eventID},{$set:{time: time}});
        console.log(`changed event: ${eventID} time to ${time}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update time of event');
    }
}

//update event location
const updateLocation = async (db, eventID, location) => {
    try{
        const result = await db.collection('events').updateOne({eventID: eventID},{$set:{location: location}});
        console.log(`changed event: ${eventID} location to ${location}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update location of event');
    }
}

//update event host
const updateHost = async (db, eventID, hostID) => {
    try{
        const result = await db.collection('events').updateOne({eventID: eventID},{$set:{host: hostID}});
        console.log(`changed event: ${eventID} host user to ${hostID}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update host user of event');
    }
}

//update invited users
const updateInvitedUsers = async (db, eventID, invitedUsers) => {
    try{
        const result = await db.collection('events').updateOne({eventID: eventID},{$set:{invitedUsers: invitedUsers}});
        console.log(`changed event: ${eventID} invited users to ${invitedUsers}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update invited users of event');
    }
}

//update event description
const updateDescription = async (db, eventID, description) => {
    try{
        const result = await db.collection('events').updateOne({eventID: eventID},{$set:{description: description}});
        console.log(`changed event: ${eventID} description to ${description}`);
        return result;
    } catch(err){
        console.error(err);
        throw new Error('could not update teh description of the event');
    }
}

module.exports = {connect,addUser, deleteUser, getUser, deleteEvent, 
    addEvent, getAllEvents, getEvent, updateDate, updateEmail, updateHost, 
    updateDescription, updateLocation, updateInvitedUsers, updateTime, updateNeighborhood};



    
// const main = async () => {
//     let db = await connect('mongodb+srv://cis350:cis350@cluster0.n8yq8.mongodb.net/350Proj?retryWrites=true&w=majority');
// }

// main();

