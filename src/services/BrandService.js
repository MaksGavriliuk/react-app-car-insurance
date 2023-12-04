import axios from 'axios';

class BrandService {

    async fetchBrands() {
        try {
            const response = await axios.get('http://localhost:8080/brands')
            return response.data;
            // const token = JSON.parse(localStorage.getItem('jwtToken'))
            // const requestOptions = {
            //     method: 'GET',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            // };
            //
            // fetch('http://localhost:8080/brands', requestOptions)
            //     .then(response => {
            //         if (!response.ok) {
            //             throw new Error('Error sending request');
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         return data;
            //     })
        } catch (error) {
            throw error;
        }
    }

    async setHeaders() {
        const token = JSON.parse(localStorage.getItem('jwtToken'))
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
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