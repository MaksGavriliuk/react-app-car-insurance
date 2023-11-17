import axios from 'axios';

class AuthenticationService {
    async sendRequest(auth, headers = {}) {
        try {
            const response = await axios.post('http://localhost:8080/auth/authentication', auth);
            return response.data;
        } catch (error) {
            throw new Error(`Error sending request: ${error.message}`);
        }
    }

    async login(auth) {
        const token = localStorage.getItem('jwtToken');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return this.sendRequest(auth, headers);
    }
}

export default new AuthenticationService();