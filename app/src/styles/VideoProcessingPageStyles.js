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
        backgroundColor: 'white',
        borderColor: '#2fc5b7',
        borderWidth: 2, 
        borderRadius: 10,             
        padding:10,
        width: "39%",
        alignItems: 'center', 
        justifyContent: 'center',
        shadowColor: '#2fc5b7',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 }, 
        marginTop: 10,
        marginLeft: 10
      },
      buttonText: {
        color: '#2fc5b7', 
        fontSize: 16, 
        fontWeight: 'bold', 
      },
  });

  export default styles;

