import axios from 'axios';

const domain = 'http://localhost:5000';
//const domain = "http://192.168.0.177:5000";

export const addEvent = async (title, date, location, description, imageURL, creator, time) => {
    
    try{
        
        console.log("api adding event");
        const data = "name="+title
                        +"&description="+description
                        +"&date="+date
                        +"&location="+location
                        +"&imgURL="+imageURL
                        +"&creator="+creator
                        +"&time="+time;
        
        console.log("this is the data: " + data);
        const response = await axios.post(`${domain}/events`, data);
        console.log("event added");
        return response.status;
    }catch(e){
        console.log("api add event failed");
        throw e;
    }
}

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

export const getEventsList = async () => {
    try{
        const response = await axios.get(`${domain}/events`);
        return response.data;
    }catch(e){
        console.error(e);
    }
}
