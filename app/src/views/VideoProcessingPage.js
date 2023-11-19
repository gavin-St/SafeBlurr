import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { Video, resizeMode } from 'expo-av';
import axios from 'axios';

const VideoProcessingPage = ({ route, navigation }) => {
  let { videoUri } = route.params;
  videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
  const [videoRef, setVideoRef] = useState(null);

  useEffect(() => {
    if (videoRef) {
      (async () => {
        await videoRef.loadAsync(
          { uri: videoUri },
          {}, // Any initial status for the video
          false // Download first - set to true if the video should be downloaded to the device cache first
        );
      })();
    }
  }, [videoRef]);

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

    console.log(video)

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
      <Text>HELP</Text>
      <TouchableOpacity onPress={toggleFullScreen}>
        <Video
          ref={ref => setVideoRef(ref)}
          source={{ uri: videoUri }}
          style={fullScreen ? styles.fullScreenVideo : styles.video}
          useNativeControls // If you want to show video controls
          resizeMode="contain" // Or 'cover' depending on your preference
          shouldPlay
          onError={(e) => console.log('Video Error:', e)} // Log errors
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
    height: '66%', 
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
