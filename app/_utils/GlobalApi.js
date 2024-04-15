const {default: axios} = require('axios');

/*function SendEmail(data){
    axios.post("/api/send", data);
}*/

const SendEmail = (data) => axios.post("/api/send", data);

export default {
    SendEmail
}










/*const { default: axios } = require("axios");

const SendEmail = (data) => axios.post("/api/send", data);

export default{
    SendEmail
}*/