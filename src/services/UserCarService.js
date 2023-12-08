import axios from 'axios';

class UserCarService {
    async getUserCar(userId, carId) {
        try {
            const response = await axios.get(`http://localhost:8080/user-cars?user-id=${userId}&car-id=${carId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new UserCarService();