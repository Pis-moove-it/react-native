import { Navigation } from 'react-native-navigation';
import Login from './Login';
import Roles from './Roles';
import Home from './Home';
import Profile from './Profile';
import Gather from './Gather';
import Weigh from './Weigh';
import Bale from './Bale';

export const Screens = {
  Login: 'Login',
  Roles: 'Roles',
  Home: 'Home',
  Profile: 'Profile',
  Gather: 'Gather',
  Weigh: 'Weigh',
  Bale: 'Bale',
};

export const registerScreens = (store, provider) => {
  // Register all screens of the app
  Navigation.registerComponent(Screens.Login, () => Login, store, provider);
  Navigation.registerComponent(Screens.Roles, () => Roles, store, provider);
  Navigation.registerComponent(Screens.Home, () => Home, store, provider);
  Navigation.registerComponent(Screens.Profile, () => Profile, store, provider);
  Navigation.registerComponent(Screens.Gather, () => Gather, store, provider);
  Navigation.registerComponent(Screens.Weigh, () => Weigh, store, provider);
  Navigation.registerComponent(Screens.Bale, () => Bale, store, provider);
};
