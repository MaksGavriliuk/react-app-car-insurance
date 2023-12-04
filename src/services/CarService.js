import axios from "axios";


class CarService {

    async saveCar(car) {
        try {

            const carResponse = await axios.post('http://localhost:8080/cars/create', car);
            const savedCar = carResponse.data;

            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user.id;

            const userCar = {
                userId: userId,
                carId: savedCar.id
            };

            const response = await axios.post('http://localhost:8080/user-cars/create', userCar);
            return response.data;

        } catch (error) {
            throw error;
        }
    }

}

export default new CarService();