import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        padding: 10,
        flex: 1,
        alignItems: "center"
    },
    videoText: {
        marginTop: 20,
        padding: 10,
        fontSize: 20,
    },
    video: {
      width: "95%",
      height: "62%",
    },
    loading: {
      flex: 1,
      backgroundColor: '#2fc5b7',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      width: "50%",
      height: "50%",
      resizeMode: 'contain',
    },
    button: {
        backgroundColor: 'white',          // White background
        borderColor: '#2fc5b7',            // Accent border color
        borderWidth: 2,                    // Border width
        borderRadius: 10,                  // Rounded corners
        padding:10,
        width: "39%",
        alignItems: 'center',              // Center content horizontally
        justifyContent: 'center',          // Center content vertically
        shadowColor: '#2fc5b7',            // Shadow color (optional)
        shadowOpacity: 0.3,                // Shadow opacity (optional)
        shadowRadius: 10,                  // Shadow blur radius (optional)
        shadowOffset: { width: 0, height: 4 }, // Shadow offset (optional)
        marginTop: 10,
        marginLeft: 10
      },
      buttonText: {
        color: '#2fc5b7',                 // Text color
        fontSize: 16,                     // Font size
        fontWeight: 'bold',               // Font weight
      },
  });

  export default styles;

