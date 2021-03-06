import axios from "axios";

export default {
    createGroup: (userData) => {
        console.log("Axios createGroup");
        return axios.post("/api/create_group", userData);
    },

    userData: () => {
        console.log("Axios getting stuff");
        return axios.get("/api/user_data");
    },

    logout: () => {
        console.log("Axios logging group out");
        return axios.get("/logout");
    }
}