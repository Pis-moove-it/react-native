import { StyleSheet } from 'react-native';
import Colors from '../../helpers/Colors';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: Colors.white,
	},
	titleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		//marginTop: 50,
		height: '30%',
		marginTop: '5%',
		//marginBottom: '10%',
		//borderColor: Colors.black,
		//borderWidth: 1,
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold',
		color: Colors.primary,
		//marginTop: '20%',
	},
	buttonContainer: {
		justifyContent: 'space-evenly',
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginHorizontal: 0, 
		//borderColor: Colors.black,
		//borderWidth: 1,
	},
	portraitButton: {
		backgroundColor: Colors.primary,
		width: '60%',
		height: '25%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginHorizontal: 5, 
	},
	landscapeButton: {
		backgroundColor: Colors.primary,
		width: '30%',
		height: '60%',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginHorizontal: 5, 
	},
	textButton: {
		fontSize: 20,
		color: Colors.white,
	}
});

export default styles;
