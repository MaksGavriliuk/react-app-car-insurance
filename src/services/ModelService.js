import axios from 'axios';

const ALL_MODELS = 'http://localhost:8080/models';


export async function fetchModels() {
    try {
        const response = await axios.get(ALL_MODELS);
        return response.data;
    } catch (error) {
        throw error;
    }
}