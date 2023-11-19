import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import Video from 'react-native-video';

const VideoProcessingPage = ({ route, navigation }) => {
  const { videoUri } = route.params;
  const [fullScreen, setFullScreen] = useState(false);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
  };

  const handleSubmit = async () => {
    const videoData = new FormData();
    videoData.append('video', {
      uri: videoUri,
      type: 'video/mp4',
      name: 'upload.mp4'
    });

    try {
      const response = await axios.post('https://your-server.com/upload', videoData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Alert.alert('Upload Successful', 'Your video was successfully uploaded!');
      navigation.goBack(); // Optional: Navigate back after upload
    } catch (error) {
      console.error('Error uploading video: ', error);
      Alert.alert('Upload Failed', 'Failed to upload video.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFullScreen}>
        <Video 
          source={{ uri: videoUri }}   // Can be a URL or a local file.
          style={fullScreen ? styles.fullScreenVideo : styles.video} // Toggle styles
          controls                    // Include player controls
          resizeMode="cover"          // Fill the whole screen at aspect ratio.
        />
      </TouchableOpacity>
      <Button title="Submit Video" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: '66%', // 2/3 of the page
  },
  fullScreenVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default VideoProcessingPage;
