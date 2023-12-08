import axios from 'axios';

class ContractService {

    async fetchEngineVolumes() {
        try {
            const response = await axios.get('http://localhost:8080/contracts');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async fetchNotApprovedContracts() {
        try {
            const response = await axios.get('http://localhost:8080/contracts/not-approved');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async fetchApprovedContracts() {
        try {
            const agent = JSON.parse(localStorage.getItem('user'));
            const response = await axios.get(`http://localhost:8080/contracts/approved/${agent.id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    async deleteContract(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/contracts/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateContract(contract) {
        try {
            const agent = JSON.parse(localStorage.getItem('user'))
            const contractRequest = {
                userCarId: contract.userCar.id,
                insuranceAgentId: agent.id,
                insuranceTypeId: contract.insuranceType.id,
                startDate: contract.startDate,
                endDate: contract.endDate,
                amount: contract.amount,
                payoutAmount: contract.payoutAmount,
                status: 'одобрено'
            }
            const response = await axios.put(`http://localhost:8080/contracts/${contract.id}`, contractRequest);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async statistic(contractFilter) {
        try {
            const response = await axios.post('http://localhost:8080/contracts/statistic', contractFilter);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


    //
    // async saveEngineVolume(engineVolume) {
    //     try {
    //         const response = await axios.post('http://localhost:8080/engine-volumes/create', engineVolume);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async saveContract(contract) {
        try {
            console.log(contract)
            const response = await axios.post('http://localhost:8080/contracts/create', contract);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new ContractService();