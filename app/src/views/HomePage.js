import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Button, Modal, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';

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
        closeCamera();
        handleVideo(video.uri);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const handleVideo = (uri) => {
    navigation.navigate('VideoProcessing', { videoUri: uri });
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
        transparent={false}
      >
        <Camera style={{ flex: 1 }} ref={cameraRef} type={Camera.Constants.Type.back}>
            <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
              <MaterialIcons name="close" size={40} color="white" />
            </TouchableOpacity>
          <View style={styles.cameraControls}>
            <TouchableOpacity style={isRecording ? styles.recordingButton : styles.notRecordingButton} onPress={isRecording ? stopRecording : startRecording}>
              {isRecording && <View style={styles.innerCircle} />}
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
    </View>
  );
};

// Add styles
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraControls: {
        position: 'absolute',
        bottom: 36, // Position at the bottom of the screen
        left: 0,
        right: 0,
        alignItems: 'center', // Center horizontally
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

export default HomePage;
