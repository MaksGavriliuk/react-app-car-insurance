import axios from 'axios';

class InsuranceCalculateService {
    async calculate(userCarDTO) {
        try {
            const { insuranceType, carId, userId } = userCarDTO;
            const url = `http://localhost:8080/calculate?insurance-type=${insuranceType}`;
            const data = {
                carId: carId,
                userId: userId
            };

            const response = await axios.post(url, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new InsuranceCalculateService();