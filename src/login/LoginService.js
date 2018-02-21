import axios from 'axios';

export const login = (username, password) => {
	axios
	.post(`https://1ecc65be.ngrok.io/api/students/login?include=user`, { username, password })
	.then(response => {
        axios.defaults.headers.common['Authorization'] = response.data.id;
        console.log(response.data);
        return response.data;
    })
    .catch((error) => {
    	console.log(error.response.data);
        return error.response.data;
    });
}
