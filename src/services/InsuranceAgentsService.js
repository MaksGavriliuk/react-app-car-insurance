import axios from 'axios';
import userService from "./UserService";

class InsuranceAgentsService {

    async fetchInsuranceAgents() {
        try {
            const response = await axios.get('http://localhost:8080/agents');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async calculatePremium(contract) {
        try {
            const premiumCalculation = {
                insuranceAgentId: userService.getId(),
                amount: contract.amount,
                percent: contract.insuranceType.percent
            }
            // const agentId = userService.getId();
            const response = await axios.post(`http://localhost:8080/agents/premium`, premiumCalculation);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}
export default new InsuranceAgentsService();