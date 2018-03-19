import { DrawerNavigator } from 'react-navigation';
import HomeScreen from '../home/HomeScreen';
import AwaitRequestScreen from '../AwaitRequest/AwaitRequestScreen';
import SelectRouteScreen from '../SelectRoute/SelectRouteScreen';
import MapViewScreen from '../MapView/MapViewScreen';
import LoginScreen from '../login/LoginScreen';

const drawerNavigator = DrawerNavigator({
	Home: { screen: HomeScreen },
	// AwaitRequest: { screen: AwaitRequestScreen },
	SelectRoute: { screen: SelectRouteScreen },
	MapView: { screen: MapViewScreen },
	Logout: { screen: LoginScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'SelectRoute',
});

export default drawerNavigator