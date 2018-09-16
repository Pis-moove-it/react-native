import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	formContainer: {
		alignSelf: 'center',
		margin: 15,
	},
	logo: {
		alignSelf: 'center',
		height: 150,
		width: 150,
		margin: 75,
		zIndex: 1,
	},
	pickerContainer: {
		alignSelf: 'center',
		alignItems:'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 75,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: Colors.gray,
	},
	icon: {
		height: 30,
		width: 30,
		margin: 15,
	},
	picker: {
		width: 150,
		margin: 15,
	},
	button: {
		backgroundColor: Colors.primary,
	},
	textButton: {
		color: Colors.white,
	},
});

export default styles;
