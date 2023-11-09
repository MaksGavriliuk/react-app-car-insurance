import axios from 'axios';

const ALL_BRANDS = 'http://localhost:8080/brands';

export async function fetchBrands() {
    try {
        const response = await axios.get(ALL_BRANDS);
        return response.data;
    } catch (error) {
        throw error;
    }
}