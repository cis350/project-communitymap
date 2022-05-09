import axios from 'axios';
const domain ='http://localhost:8080';

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
      const response = await axios.get(`${domain}/accounts`, `username=${username}`); 
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
      const response = await axios.delete(`${domain}/accounts`, `username=${username}`); 
      return response.status; 
    }
  } catch(err)  {
    console.log(err);
  }
}

export const updateUser = async (username, email, password) => {
  try {
    if(username.length > 0) {
      const response = await axios.delete(`${domain}/accounts`, 
      `username=${username}$password=${password}$email=${email}`); 
      return response.status; 
    }
  } catch(err)  {
    console.log(err);
  }
}

//put - update 
export const addEvent = async (title, date, location, description, imageUrl) => {
    const response = await axios.post(`${domain}/events`);
    return response.status;
}

export const signup = async (user, title) => {
    const response = await axios.put(`${domain}/signup`);
    return response.status;

}

export const getEventsList = async () => {
    const response = await axios.get(`${domain}/events`);
    return response.data;
}

