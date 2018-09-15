import { Navigation } from 'react-native-navigation';
import Login from './Login';
import Roles from './Roles';
import Home from './Home';
import Profile from './Profile';

export const Screens = {
	Login: 'Login',
	Roles: 'Roles',
	Home: 'Home',
	Profile: 'Profile',
};

export const registerScreens = (store, provider) => {
	// Register all screens of the app
	Navigation.registerComponent(Screens.Login, () => Login, store, provider);
	Navigation.registerComponent(Screens.Roles, () => Roles, store, provider);
	Navigation.registerComponent(Screens.Home, () => Home, store, provider);
	Navigation.registerComponent(Screens.Profile, () => Profile, store, provider);	
};
