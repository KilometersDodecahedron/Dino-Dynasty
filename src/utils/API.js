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
        return axios.put("/api/users/" + userName, data);
    },
    //score method
    getRoqueScores: function() {
        return axios.get("/api/scores/rogue");
    },
    getDinoScores: function() {
        return axios.get("/api/scores/dino");
    },
    getScoreByName:  function(id) {
        return axios.get("/api/scores/method/" + id);
    },
    deleteScore: function(id) {
        return axios.delete("/api/scores/" + id);
    },
    createScore: function(data) {
        return axios.post("/api/scores", data);
    },
    updateScore: function(userName, data) {
        return axios.put("/api/scores/method/" + userName, data);
    },
}