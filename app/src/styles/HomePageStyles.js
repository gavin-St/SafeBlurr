import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    top: 36,
    right: 25,
  },
});

export default styles;
