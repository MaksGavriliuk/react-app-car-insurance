import axios from 'axios';

class InsuranceTypeService {
    async fetchInsuranceTypes() {
        try {
            const response = await axios.get('http://localhost:8080/ins-types');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteInsuranceType(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/ins-types/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateInsuranceType(insuranceType) {
        try {
            const response = await axios.put(
                `http://localhost:8080/ins-types/${insuranceType.id}`,
                insuranceType
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async saveInsuranceType(insuranceType) {
        try {
            const response = await axios.post('http://localhost:8080/ins-types/create', insuranceType);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new InsuranceTypeService();