import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
} from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles/HomePageStyles";

const HomePage = ({ navigation }) => {
  const [cameraVisible, setCameraVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const [videos, setVideos] = useState([]);
  const [captions, setCaptions] = useState(false);
  const [audio, setAudio] = useState(false);
  const [meta, setMeta] = useState(false);

  // Request camera and media library permissions
  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(
        cameraStatus.status === "granted" &&
          mediaLibraryStatus.status === "granted"
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // Fetch last 5 videos
      if (hasPermission) {
        const { assets } = await MediaLibrary.getAssetsAsync({
          mediaType: "video",
          first: 5,
          sortBy: MediaLibrary.SortBy.creationTime,
        });
        setVideos(assets);
      }
    })();
  }, [hasPermission]);

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

  const handleVideo = async (uri) => {
    if (uri.startsWith("ph://")) {
      const assetId = uri.slice(5).split("/")[0];
      try {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(assetId);
        if (assetInfo.localUri) {
          navigation.navigate("VideoProcessing", {
            videoUri: assetInfo.localUri,
          });
        } else {
          Alert.alert("Error", "Unable to access video");
        }
      } catch (error) {
        console.error("Error accessing media library", error);
        Alert.alert("Error", "An error occurred while accessing the video");
      }
    } else {
      navigation.navigate("VideoProcessing", { videoUri: uri });
    }
  };

  if (hasPermission === null || hasPermission === false) {
    return (
      <View>
        <Text>
          {hasPermission === null
            ? "Requesting permissions..."
            : "No access to camera"}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>My Videos</Text>
      {/* map over last 5 videos in camera roll and display them */}
      <ScrollView horizontal>
        {videos.map((video, index) => (
          <TouchableOpacity key={index} onPress={() => handleVideo(video.uri)}>
            <Image
              source={{ uri: video.uri }}
              style={{ width: 400, height: 400, marginRight: 15 }}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text>Settings</Text>
      {/* setting toggle shit goes here */}
      <View style={{ flexDirection: "row" }}>
        <View style={{ flexDirection: "column" }}>
          <Text>Captions</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#2fc5b7" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#ffffff"
            onValueChange={() => {
              setCaptions((prev) => !prev);
            }}
            value={captions}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text>Blur Audio</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#2fc5b7" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#ffffff"
            onValueChange={() => {
              setAudio((prev) => !prev);
            }}
            value={audio}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text>Clean</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#2fc5b7" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#ffffff"
            onValueChange={() => {
              setMeta((prev) => !prev);
            }}
            value={meta}
          />
        </View>
      </View>
      <Button title="Open Camera" onPress={openCamera} />
      <Modal
        visible={cameraVisible}
        onRequestClose={closeCamera}
        animationType="slide"
        transparent={false}
      >
        <Camera
          style={{ flex: 1 }}
          ref={cameraRef}
          type={Camera.Constants.Type.back}
        >
          <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
            <MaterialIcons name="close" size={40} color="white" />
          </TouchableOpacity>
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={
                isRecording ? styles.recordingButton : styles.notRecordingButton
              }
              onPress={isRecording ? stopRecording : startRecording}
            >
              {isRecording && <View style={styles.innerCircle} />}
            </TouchableOpacity>
          </View>
        </Camera>
      </Modal>
    </View>
  );
};

export default HomePage;
