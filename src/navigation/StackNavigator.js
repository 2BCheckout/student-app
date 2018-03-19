
import { StackNavigator } from 'react-navigation'
import LoginScreen from '../login/LoginScreen'
import DrawerNavigator from './DrawerNavigator'

const stackNavigator = StackNavigator({
    Login: { screen: LoginScreen },
    HomeStack: { screen: DrawerNavigator },
}, {
    headerMode: 'none',
    initialRouteName: 'Login'
})

export default stackNavigator