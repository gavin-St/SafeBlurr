import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    padding: 12,
    alignItems: 'left',
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
    width: 400, // Set the width for each video
    height: 400, // Set the height for each video
    marginBottom: 15, // Space between each video item
    borderWidth: 7, // Width of the border
    borderColor: '#FFFFFF', // Color of the border
    borderRadius: 10, // Radius of the border corners
  },
  videoImage: {
    width: '100%', // Use 100% of the parent container's width
    height: '100%', // Use 100% of the parent container's height
    // Add other styles as needed
  },
  button: {
    flexDirection: "row",
    backgroundColor: 'white',          // White background
    borderColor: '#2fc5b7',            // Accent border color
    borderWidth: 2,                    // Border width
    borderRadius: 10,                  // Rounded corners
    padding: 10,
    width: "39%",
    alignItems: 'center',              // Center content horizontally
    justifyContent: 'center',          // Center content vertically
    shadowColor: '#2fc5b7',            // Shadow color (optional)
    shadowOpacity: 0.3,                // Shadow opacity (optional)
    shadowRadius: 10,                  // Shadow blur radius (optional)
    shadowOffset: { width: 0, height: 4 }, // Shadow offset (optional)
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#2fc5b7',                 // Text color
    fontSize: 16,                     // Font size
    fontWeight: 'bold',               // Font weight
  },
});

export default styles;
