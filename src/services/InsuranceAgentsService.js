import axios from 'axios';

class InsuranceAgentsService {

    async fetchInsuranceAgents() {
        try {
            const response = await axios.get('http://localhost:8080/agents');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}
export default new InsuranceAgentsService();