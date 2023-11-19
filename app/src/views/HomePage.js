import React, { useState, useRef } from 'react';
import { View, Text, Button, Modal, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

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
        saveVideo(video.uri);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const saveVideo = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri); // Save the video to the media library
      await MediaLibrary.createAlbumAsync('YourAlbumName', asset, false);
      Alert.alert('Video saved', 'Your video was successfully saved in the gallery!');
    } catch (error) {
      console.log('Error saving video: ', error);
      Alert.alert('Error', 'Failed to save video.');
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
