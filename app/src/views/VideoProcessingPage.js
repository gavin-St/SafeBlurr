import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, TouchableOpacity, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import axios from 'axios';

const VideoProcessingPage = ({ route, navigation }) => {
  let { videoUri } = route.params;
  videoUri = "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4";

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

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleFullScreen}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      </TouchableOpacity>
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
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
