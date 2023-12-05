import axios from 'axios';

class RegistrationService {

    async register(user) {
        try {
            const userWithAuthentication = {
                userAuthentication: {
                    login: user.login,
                    password: user.password
                },
                surname: user.surname,
                name: user.name,
                patronymic: user.patronymic,
                sex: user.sex,
                age: user.age,
                experience: user.experience
            }
            const response = await axios.post('http://localhost:8080/auth/register', userWithAuthentication);
            return response.data;
        } catch(error) {
            throw error;
        }
    }

    async writeToken(token, user) {
        localStorage.setItem('jwtToken', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
    }

}

export default new RegistrationService();