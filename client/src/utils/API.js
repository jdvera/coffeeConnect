import axios from "axios";

export default {
    createGroup: (userData) => {
        console.log("API createGroup");
        return axios.post("/api/signup", userData);
    },

    loginGroup: (userData) => {
        console.log("API loginGroup");
        return axios.post("/api/login", userData);
    },


    getGroups: () => {
        console.log("getting stuff");
        return axios.get("/api/groups");
    }
}