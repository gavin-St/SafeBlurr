import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Modal, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';

const HomePage = ({ navigation }) => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  // Request camera and media library permissions
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted' && mediaLibraryStatus.status === 'granted');
    })();
  }, []);

  const openCamera = () => {
    setCameraVisible(true);
  };

  const closeCamera = () => {
    setCameraVisible(false);
    if (isRecording) {
      stopRecording();
    }
  };

  const startRecording = async () => {
    if (cameraRef.current) {
      setIsRecording(true);
      const video = await cameraRef.current.recordAsync();
      if (video) {
        uploadVideo(video.uri);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const uploadVideo = async (uri) => {
    const videoData = new FormData();
    videoData.append('video', {
      uri: uri,
      type: 'video/mp4', // or another video format if known
      name: 'upload.mp4'
    });
    console.log(videoData);
    try {
      const response = await axios.post('https://your-server.com/upload', videoData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      Alert.alert('Upload Successful', 'Your video was successfully uploaded!');
    } catch (error) {
      console.error('Error uploading video: ', error);
      Alert.alert('Upload Failed', 'Failed to upload video.');
    }
  };

  if (hasPermission === null || hasPermission === false) {
    return <View><Text>{hasPermission === null ? 'Requesting permissions...' : 'No access to camera'}</Text></View>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home Screen</Text>
      <Button title="Open Camera" onPress={openCamera} />

      <Modal
        visible={cameraVisible}
        onRequestClose={closeCamera}
        animationType="slide"
      >
        <Camera style={{ flex: 1 }} ref={cameraRef} type={Camera.Constants.Type.back}>
          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'center', margin: 20 }}>
            {isRecording ? (
              <Button title="Stop Recording" onPress={stopRecording} />
            ) : (
              <Button title="Start Recording" onPress={startRecording} />
            )}
            <Button title="Close Camera" onPress={closeCamera} />
          </View>
        </Camera>
      </Modal>
    </View>
  );
};

export default HomePage;
