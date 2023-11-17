import axios from 'axios';

class BrandService {

    async fetchBrands() {
        try {
            const token = localStorage.getItem('jwtToken');
            const headers = token ? {Authorization: `Bearer ${token}`} : {};
            const response = await axios.get('http://localhost:8080/brands', {headers});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async deleteBrand(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/brands/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateBrand(brand) {
        try {
            const response = await axios.put(`http://localhost:8080/brands/${brand.id}`, brand);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async saveBrand(brand) {
        try {
            const response = await axios.post(`http://localhost:8080/brands/create`, brand);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default new BrandService();