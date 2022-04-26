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