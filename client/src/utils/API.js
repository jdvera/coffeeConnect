import axios from "axios";

export default {
    createGroup: (userData) => {
        console.log("API createGroup");
        return axios.post("/api/createGroup", userData);
    },

    getGroups: () => {
        console.log("getting stuff");
        return axios.get("/api/groups");
    }
}