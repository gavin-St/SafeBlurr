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

const VideoProcessingPage = ({ route, navigation }) => {
  let { videoUri } = route.params;

  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleFullScreen = () => {
    setFullScreen(!fullScreen);
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
        "http://100.64.5.247:3000/process",
        videoData,
        {
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
      <Text>Your recorded video: </Text>
      <Video
        source={{ uri: videoUri }}
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onError={(e) => console.log("Video Error:", e)}
      />
      {/* add form options and shit here*/}
      <Button title="Submit Video" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "66%",
  },
  loading: {
    flex: 1,
    backgroundColor: '#2fc5b7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: "50%",
    height: "50%",
    resizeMode: 'contain',
  },
});

export default VideoProcessingPage;
