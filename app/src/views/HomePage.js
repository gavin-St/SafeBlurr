import React from 'react';
import { View, Text, Button } from 'react-native';
// ... import camera package ...

const HomePage = ({ navigation }) => {
  const openCamera = () => {
    // Logic to open the camera
  };

  return (
    <View>
      <Text>Home Screen</Text>
      <Button title="Open Camera" onPress={openCamera} />
    </View>
  );
};

export default HomePage;
