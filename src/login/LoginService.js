import axios from 'axios';

export const login = (username, password, navigation) => {
	axios
	.post(`https://b60e91a9.ngrok.io/api/students/login?include=user`, { username, password })
	.then(response => {
        axios.defaults.headers.common['Authorization'] = response.data.id;
        console.log(response.data);
        navigation.navigate('Home');
        // return response.data;
        // return new Promise((resolve) => resolve(response.data));
    })
    .catch((error) => {
    	console.log(error.response.data);
        // return error.response.data;
        // return new Promise((resolve, reject) => reject(error.response.data));
    });
}
