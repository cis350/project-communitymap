import axios from 'axios';

const domain = 'http://localhost:5000';
//const domain = "http://192.168.0.177:5000";

<<<<<<< HEAD
export const addEvent = async (title, date, location, description, imageURL, creator, time) => {
    
    try{
        
        console.log("api adding event");
        const data = "name="+title
                        +"&description="+description
                        +"&date="+date
                        +"&location="+location
                        +"&imgURL="+imageURL
                        +"&creator="+creator
                        +"&time="+time
        
        console.log("this is the data: " + data);
        const response = await axios.post(`${domain}/events`, data);
        console.log("event added");
        return response.status;
    }catch(e){
        console.log("api add event failed");
        throw e;
    }
}

// export const signup = async (user, title) => {
//     try {
//         const response = await axios.put(`${domain}/signup`);
//     return response.status;
//     }catch(e){
//         throw e;
//     }
// }

export const getEventsList = async () => {
    try{
        const response = await axios.get(`${domain}/events`);
        return response.data;
    }catch(e){
        console.error(e);
    }
}
=======
export const addEvent = async (
  title,
  date,
  location,
  description,
  imageURL,
  creator
) => {
  const response = await axios.post(`${domain}/events`, {
    name: title,
    description: description,
    date: date,
    location: location,
    imagURL: imageURL,
    creator: creator,
  });
  // note: location needs to be a {latitude: X, longitude: Y} object
  return response.status;
};

export const signup = async (user, title) => {
  const response = await axios.put(`${domain}/signup`);
  return response.status;
};

export const getEventsList = async () => {
  const response = await axios.get(`${domain}/events`);
  return response.data;
};
>>>>>>> e3ec134cf6685bcdb1bdab068fbe1b68d76fa121
