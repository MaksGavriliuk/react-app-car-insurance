import axios from 'axios';

const BRAND_API_BASE_URL = 'http://localhost:8080/brands';

class BrandService {
    getBrands() {
        return axios.get(BRAND_API_BASE_URL);
    }
}

export default new BrandService();