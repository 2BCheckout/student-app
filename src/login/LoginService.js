import { AsyncStorage } from 'react-native'
import axios from 'axios'
import Toaster from '../helpers/FetchToast'

export const login = (username, password, apiUrl, navigation, drawerAction) => {
	axios
	.post(`${apiUrl}/students/login?include=user`, { username, password })
	.then(response => {
        if (response.status === 200 && response.data.id) {
            axios.defaults.headers.common['Authorization'] = response.data.id
            console.log(response.data)
            navigation.navigate('HomeStack')
            drawerAction()
        }
        AsyncStorage.multiSet([['@studentStorage:apiUrl', apiUrl], ['@studentStorage:token', response.data.id]])
    })
    .catch((error) => {
    	console.log(error)
        Toaster('Error', `No se pudo iniciar sesion: ${error.message}`,
            () => {
                login(username, password, apiUrl, navigation, drawerAction)
            })
    })
}

export const logout = (apiUrl, token, navigation, drawerAction) => {
    axios.defaults.headers.common['Authorization'] = token
    axios
    .post(`${apiUrl}/students/logout`)
    .then(response => {
        if (response.status === 204) {
            axios.defaults.headers.common['Authorization'] = null
            AsyncStorage.removeItem('@studentStorage:token')
            drawerAction()
        }else{
            Toaster('Error','No se pudo establecer conexion con el servidor',
            () => {
                logout(apiUrl, token, navigate, drawerAction)
            },
            () => {
                // navigation.navigate('Home')
            })
        }
    })
    .catch(error => {
        Toaster('Error','No se pudo establecer conexion con el servidor',
        () => {
            logout(apiUrl, token, navigate, drawerAction)
        },
        () => {
            // navigation.navigate('Home')
        })
    })
}