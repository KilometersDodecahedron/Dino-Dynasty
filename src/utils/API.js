import axois from "axios";

export default {
    //get all users
    getUsers: function() {
        return axios.get("/api/users");
    },
    getUserByName: function(id) {
        return axios.get("/api/users/" + id);
    },
    deleteUser: function(id) {
        return axios.delete("/api/users/" + id);
    },
    //NOTE this goes in the BODY rather than the PARAMS
    createUser: function(data) {
        return axios.post("/api/users", data);
    },
    updateUser: function(userName, data) {
        return axios.put("/api/users" + userName, data);
    },
}