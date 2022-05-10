import axios from 'axios';
const domain = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? 'http://localhost:8080':'';

// joinChat takes the username as a parameter
// and sends it to the server. And return the JWT

export const joinChat = async (username) =>{
    try{
        if(username.length > 0){
            const response = await axios.post(`${domain}/join`, `username=${username}`);
            return response.data.token;
        }
    }
    catch(err){
        console.error(err);

    }
}

export const verifySession = async (userToken) =>{
    try{
        if(userToken.length > 0){
            const response = await axios.post(`${domain}/verify`, `token=${userToken}`);
            return response.status;
        }
    }
    catch(err){
        // console.error(err);
        return 302; // return 302
    }
}

export const getUsers = async () =>{
    try{
            const response = await axios.get(`${domain}/users`);
            return response.data.data;
    }
    catch(err){
        return 'error'; // return  error
    }
}

// retrieves all the messages
export const getMessages = async () =>{
    try{
            const response = await axios.get(`${domain}/messages`);
            return response.data.data;
    }
    catch(err){
        return 'error'; // return  error
    }
}

// send a message to the server
export const sendMessage = async (from, to, content) =>{
    try{
        if(from.length> 0 && to.length > 0 && content.length > 0){
            const response = await axios.post(`${domain}/messages`,
            `from=${from}&to=${to}&content=${content}`);
            return response.status;
        }
    }
    catch(err){
        console.error(err);
    }
}

function isValid(username, phone, email, password, re_password) {
  if(password !== re_password)
    throw new Error('passwords dont match');
  if(!(/^\d+$/.test(phone)))
    throw new Error('not a valid phone number');
  if((username.match(/^[0-9A-Za-z]+$/) === null))
    throw new Error('not a valid username');
  if(!email.includes('@'))
    throw new Error('not a valid email');
}

//Post
export const addUser = async (username, phone, email, password, re_password) => {
  try {
    if(username.length> 0 && phone.length > 0 && email.length > 0 && password.length > 0 ){
      isValid(username, phone, email, password, re_password);
      const data = "username=" + username
                    +"&phone=" + phone
                    +"&email=" + email
                    +"&password=" +password; 
      const response = await axios.post(`${domain}/accounts`, data);
      // `username=${username}$phone=${phone}$password=${password}$email=${email}`); 
      return response.status; 
    }
  } catch(err) {
    console.log(err)
  }
}

//Get
export const getUser = async (username) => {
  try {
    if(username.length > 0) {
      const response = await axios.get(`${domain}/accounts/${username}`); 
      return response.data.data; 
    }
  } catch(err)  {
    console.log(err);
  }
}

//Delete
export const deleteUser = async (username) => {
  try {
    if(username.length > 0) {
      const response = await axios.delete(`${domain}/accounts/${username}`); 
      return response.status; 
    }
  } catch(err)  {
    console.log(err);
  }
}

export const updateUserPassword = async (username, password) => {
  try {
    if(username.length > 0) {
      const response = await axios.put(`${domain}/accounts`, 
      `username=${username}&password=${password}`); 
      return response.status; 
    }
  } catch(err)  {
    console.log(err);
  }
}

export const updateUserEmail = async (username, email) => {
  try {
    if(username.length > 0) {
      console.log("In API ");
      const response = await axios.put(`${domain}/accounts`, 
      `username=${username}&email=${email}`); 
      return response.status; 
    }
  } catch(err)  {
    console.log(err);
  }
}

export const addEvent = async (title, date, location, description, imageURL, creator, time, longitude, latitude) => {
    
  try{
      
      console.log("api adding event");
      const data = "name="+title
                      +"&description="+description
                      +"&date="+date
                      +"&location="+location
                      +"&imgURL="+imageURL
                      +"&creator="+creator
                      +"&time="+time
                      +"&longitude="+longitude
                      +"&latitude="+latitude;
      
      console.log("this is the data: " + data);
      const response = await axios.post(`${domain}/events`, data);
      console.log("event added");
      return response.status;
  }catch(e){
      console.log("api add event failed");
      throw e;
  }
}
// API for events
export const signup = async (user, name) => {
  try {
      console.log("trying to sign up");
      const data = "username="+user + "&eventTitle="+name;
      console.log(data);
      const response = await axios.post(`${domain}/signup`, data);
      console.log("signed up");
      return response.status;
  }catch(e){
      throw e;
  }
}

export const getMyEvents = async (name) => {
  try {
      const response = await axios.get(`${domain}/my-events/`+name);
      return response.data;
  } catch (e) {
      console.error(e);
  }
}


//Delete
export const deleteEvent = async (name) => {
  try {
    if(name.length > 0) {
      const response = await axios.delete(`${domain}/events/${name}`); 
      return response.status; 
    }
  } catch(err)  {
    console.log(err);
  }
}

export const getEventsList = async () => {
  try{
      const response = await axios.get(`${domain}/events`);
      return response.data;
  }catch(e){
      console.error(e);
  }
}

