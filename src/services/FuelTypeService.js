import axios from 'axios';

class FuelTypeService {

    async fetchFuelTypes() {
        try {
            const response = await axios.get('http://localhost:8080/fuel-types');
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteFuelType(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/fuel-types/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateFuelType(fuelType) {
        try {
            const response = await axios.put(`http://localhost:8080/fuel-types/${fuelType.id}`, fuelType);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async saveFuelType(fuelType) {
        try {
            const response = await axios.post('http://localhost:8080/fuel-types/create', fuelType);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default new FuelTypeService();