import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 12,
    marginBottom: -2,
    fontSize: 20,
    fontWeight: "600",
  },
  cameraControls: {
    position: 'absolute',
    bottom: 36,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordingButton: {
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 40,
    padding: 15,
    alignSelf: 'center',
  },
  notRecordingButton: {
    borderWidth: 6,
    borderColor: 'white',
    borderRadius: 40,
    width: 70,
    height: 70,
    padding: 15,
    alignSelf: 'center',
  },
  innerCircle: {
    width: 26,
    height: 26,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 15,
  },
  videoSlider: {
    padding : 10,
    paddingRight: 15,
  },
  videoItem: {
    width: 400,
    height: 400,
    marginBottom: 15,
    borderWidth: 7,
    borderColor: '#FFFFFF',
    borderRadius: 10,
  },
  videoImage: {
    width: '100%',
    height: '100%', 
  },
  button: {
    flexDirection: "row",
    backgroundColor: 'white',
    borderColor: '#2fc5b7', 
    borderWidth: 2, 
    borderRadius: 10, 
    padding: 10,
    width: "39%",
    alignItems: 'center', 
    justifyContent: 'center',
    shadowColor: '#2fc5b7', 
    shadowOpacity: 0.3, 
    shadowRadius: 10, 
    shadowOffset: { width: 0, height: 4 }, 
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#2fc5b7', 
    fontSize: 16, 
    fontWeight: 'bold',
  },
});

export default styles;
