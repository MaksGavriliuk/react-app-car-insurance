import axios from 'axios';

class AuthenticationService {

    async login(auth) {
        try {
            const response = await axios.post('http://localhost:8080/auth/authentication', auth);
            localStorage.setItem('jwtToken', JSON.stringify(response.data.token));
            localStorage.setItem('user', JSON.stringify(response.data.user));
            await this.setHeaders(response.data.token)
            return response.data;
        } catch (error) {
            throw new Error(`Error sending request: ${error.message}`);
        }
    }

    async setHeaders(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // for all requests
    }

}

export default new AuthenticationService();