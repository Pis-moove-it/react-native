import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: Colors.white,
	},
	formContainer: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginHorizontal: 50,
		padding: 25,
	},
	pickerContainer: {
		alignSelf: 'stretch',
		alignItems:'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 75,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: Colors.gray,
	},
	icon: {
		height: 50,
		width: 50,
		margin: 15,
	},
	picker: {
		width: 150,
		margin: 20,
	},
	logo: {
		alignSelf: 'center',
		height: 250,
		width: 250,
		zIndex: 1,
	},
	button: {
		backgroundColor: Colors.primary,
	},
	textButton: {
		color: Colors.white,
	},
});

export default styles;
