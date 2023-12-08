import axios from 'axios';

class UserService {

    async fetchUsers() {
        try {
            const response = await axios.get('http://localhost:8080/users');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async fetchUserById(userId) {
        try {
            const response = await axios.get(`http://localhost:8080/users/${this.getId()}`);
            return response.data;
        } catch (error) {
            throw  error;
        }
    }

    getUser() {
        const user = JSON.parse(localStorage.getItem('user'))
        if (user !== null)
            return user;
    }

    getId() {
        return this.getUser().id;
    }

    async fetchCars() {
        try {
            const response = await axios.get(`http://localhost:8080/user-cars/cars/${this.getId()}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default new UserService();