import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import axios from 'axios';

const VideoProcessingPage = ({ route, navigation }) => {
  let { videoUri } = route.params;
  // videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";
  const [videoRef, setVideoRef] = useState(null);

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
      <Text>Your recorded video: </Text>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onError={(e) => console.log('Video Error:', e)} // Log errors
      />
      {/* add form options and shit here*/}
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
  }
});

export default VideoProcessingPage;
