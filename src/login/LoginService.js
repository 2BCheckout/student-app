import { AsyncStorage } from 'react-native'
import axios from 'axios'

export const login = (username, password, apiUrl, navigation) => {
	axios
	.post(`${apiUrl}/students/login?include=user`, { username, password })
	.then(response => {
        if (response.status === 200 && response.data.id) {
            axios.defaults.headers.common['Authorization'] = response.data.id
            console.log(response.data)
            navigation.navigate('Home')
        }
        AsyncStorage.setItem('@studentStorage:apiUrl', apiUrl)
        // return response.data
        // return new Promise((resolve) => resolve(response.data))
    })
    .catch((error) => {
    	console.log(error.response.data)
        // return error.response.data
        // return new Promise((resolve, reject) => reject(error.response.data))
    })
}
