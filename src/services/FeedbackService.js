import axios from 'axios';

class FeedbackService {

    async deleteFeedback(id) {
        try {
            const response = await axios.delete(`http://localhost:8080/feedbacks/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async saveFeedback(feedback) {
        try {
            const response = await axios.post('http://localhost:8080/feedbacks/create', feedback);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

}

export default new FeedbackService();