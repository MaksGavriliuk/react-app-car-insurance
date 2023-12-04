import axios from 'axios';

class ContractService {

    async fetchContracts() {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const userId = user.id
            const response = await axios.get(`http://localhost:8080/engine-volumes?user-id=${userId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
}

export default new ContractService();