import axios from "axios";

export default {
    createGroup: (userData) => {
        if(userData.reqPass) {
            console.log("Axios createGroup");
            return axios.post("/api/signup", userData);
        }
        else {
            console.log("API createGroup NoPass");
            return axios.post("/api/signupNoPass", userData);
        }
    },

    loginGroup: (userData) => {
        if(userData.password) {
            console.log("Axios loginGroup");
            return axios.post("/api/login", userData);
        }
        else {
            console.log("Axios loginGroup NoPass");
            return axios.post("/api/loginNoPass", userData);
        }
        
    },


    getUser: () => {
        console.log("Axios getting stuff");
        return axios.get("/api/user_data");
    },

    logout: () => {
        console.log("Axios logging group out");
        return axios.get("/logout");
    }
}