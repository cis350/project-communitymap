import axios from 'axios';

const domain = 'http://localhost:8080';
 
export const joinChat = async (username) => {
    try{
        if(username.length > 0) {
            const response = await axios.post(`${domain}/join`, `${username}`); 
            return response.data.token;
        }
    } catch(e) {
        console.log(e); 
    }
}

export const addEvent = async (title, date, location, description, imageUrl) => {
    const response = await axios.post(`${domain}/events`)
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