import axios from 'axios';

class ContractService {

    async fetchEngineVolumes() {
        try {
            const response = await axios.get('http://localhost:8080/engine-volumes');
            return response.data;
        } catch (error) {
            throw error;
        }
    }



    // async deleteEngineVolume(id) {
    //     try {
    //         const response = await axios.delete(`http://localhost:8080/engine-volumes/${id}`);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    //
    // async updateEngineVolume(engineVolume) {
    //     try {
    //         const response = await axios.put(`http://localhost:8080/engine-volumes/${engineVolume.id}`, engineVolume);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    //
    // async saveEngineVolume(engineVolume) {
    //     try {
    //         const response = await axios.post('http://localhost:8080/engine-volumes/create', engineVolume);
    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}

export default new ContractService();