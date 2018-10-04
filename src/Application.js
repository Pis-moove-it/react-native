import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Screens, registerScreens } from './components/Navigation';
import { store, persist } from './reducers';

class Application {
  constructor(rootStore, provider) {
    this.store = rootStore;
    this.provider = provider;
  }

  startLoggedInApp = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: Screens.User,
      },
      animationType: 'fade',
      drawer: {
        right: {
          screen: Screens.Drawer,
          passProps: {},
          disableOpenGesture: true,
          fixedWidth: 600,
        },
        disableOpenGesture: true,
      },
    });
  };

  startLoggedOutApp = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: Screens.Login,
      },
      animationType: 'fade',
      drawer: {
        right: {
          screen: Screens.Drawer,
          passProps: {},
          disableOpenGesture: true,
          fixedWidth: 600,
        },
        disableOpenGesture: true,
      },
    });
  };

  startApp = () => {
    console.disableYellowBox = true;
    registerScreens(this.store, this.provider);
    persist(() => {
      this.startLoggedOutApp();
    });
  };
}

export default new Application(store, Provider);
