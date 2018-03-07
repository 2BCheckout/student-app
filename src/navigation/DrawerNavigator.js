import { DrawerNavigator } from 'react-navigation';
import HomeScreen from '../home/HomeScreen';
import AwaitRequestScreen from '../AwaitRequest/AwaitRequestScreen';
import SelectRouteScreen from '../SelectRoute/SelectRouteScreen';
import MapViewScreen from '../MapView/MapViewScreen';

const drawerNavigator = DrawerNavigator({
	Home: { screen: HomeScreen },
	AwaitRequest: { screen: AwaitRequestScreen },
	SelectRoute: { screen: SelectRouteScreen },
	MapView: { screen: MapViewScreen }
}, {
    headerMode: 'none',
    initialRouteName: 'Home',
});

export default drawerNavigator