import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Progress from 'react-native-progress';
import styles from "../styles/VideoProcessingPageStyles";
import VideoOptions from '../components/VideoOptions'; // Adjust the import path

const VideoProcessingPage = ({ route, navigation }) => {
  const { videoUri } = route.params;
  const [loading, setLoading] = useState(false);
  const [videoSettings, setVideoSettings] = useState({});

  const handleOptionsChange = (newSettings) => {
    setVideoSettings(newSettings);
    // Additional logic when options change
  };

  const saveVideoToFileSystem = async (videoBlob) => {
    try {
      const uri = FileSystem.documentDirectory + "downloadedVideo.mp4";
      let base64Data = videoBlob;
      if (videoBlob instanceof Blob) {
        base64Data = await blobToBase64(videoBlob);
      }
      await FileSystem.writeAsStringAsync(uri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return uri;
    } catch (error) {
      console.error("Error saving video:", error);
      throw error;
    }
  };

  // convert blob to base64 is needed
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const base64 = dataUrl.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const saveVideoToGallery = async (fileUri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Downloaded Videos", asset, false);
      //Alert.alert('Video saved', 'Your video was successfully saved in the gallery!');
    } catch (error) {
      console.error("Error saving video to gallery:", error);
      Alert.alert("Error", "Failed to save video to gallery.");
    }
  };

  const handleSubmit = async () => {
    const videoData = new FormData();
    videoData.append("video", {
      uri: videoUri,
      type: "video/mp4",
      name: "upload.mp4",
    });

    try {
      setLoading(true);
      console.log("attempting upload...");
      const response = await axios.post(
        "http://35.0.135.225:3000/process",
        videoData,
        {
          videoSettings: {videoSettings},
          responseType: "blob",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("received!");
      const videoBlob = response.data;
      const fileUri = await saveVideoToFileSystem(videoBlob);
      console.log(fileUri);
      await saveVideoToGallery(fileUri);
      setLoading(false);
      Alert.alert(
        "Saved to Camera Roll",
        "Your video was successfully saved to camera roll!"
      );
      navigation.goBack(); // Optional: Navigate back after upload
    } catch (error) {
      console.error("Error uploading video: ", error);
      Alert.alert("Upload Failed", "Failed to upload video.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <Image
          source={require('../assets/logo2.png')}
          style={styles.logo}
        />
        <Text style={{ color: "#FFFFFF" }}>
          Processing Video...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.videoText}>Your Video </Text> */}
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onError={(e) => console.log("Video Error:", e)}
      />
      <VideoOptions onOptionsChange={handleOptionsChange} />
      <View style={{alignItems: "center"}}>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit Video</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoProcessingPage;
