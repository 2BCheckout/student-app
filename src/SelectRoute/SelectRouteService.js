import axios from 'axios'
import Toaster from '../helpers/FetchToast'

export const populateRoutes = (apiUrl, token) => {
    axios.defaults.headers.common['Authorization'] = token
    return axios.get(`${apiUrl}/Routes`)
}