const API_BASE_ADDRESS = 'http://localhost:3000';

export default class Api {
    static getUsers() {
        return API_BASE_ADDRESS + "/users";
    }
}