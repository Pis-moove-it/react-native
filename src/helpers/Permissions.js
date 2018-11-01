import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Reciclando',
    });
  } catch (err) {}
}

export default requestLocationPermission;
