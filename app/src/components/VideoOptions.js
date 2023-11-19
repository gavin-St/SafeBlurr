import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput } from 'react-native';

const VideoOptions = ({ onOptionsChange }) => {
  const [options, setOptions] = useState({
    captions: false,
    blurAudio: false,
    blurFace: false,
    clean: false,
  });
  const [compressionQuality, setCompressionQuality] = useState('');

  const handleToggle = (option) => {
    const newOptions = { ...options, [option]: !options[option] };
    setOptions(newOptions);
    onOptionsChange(newOptions);
  };

  return (
    <View>
      <Text style={styles.title}>Safe Settings</Text>
      <View style={styles.optionsContainer}>
        <View style={styles.option}>
          <Text style={styles.optionText}>Captions</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#2fc5b7" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#ffffff"
            onValueChange={() => handleToggle('captions')}
            value={options.captions}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Blur Audio</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#2fc5b7" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#ffffff"
            onValueChange={() => handleToggle('blurAudio')}
            value={options.blurAudio}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Blur Faces</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#2fc5b7" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#ffffff"
            onValueChange={() => handleToggle('blurFace')}
            value={options.blurFace}
          />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionText}>Clean</Text>
          <Switch
            trackColor={{ false: "#ffffff", true: "#2fc5b7" }}
            thumbColor={"#ffffff"}
            ios_backgroundColor="#ffffff"
            onValueChange={() => handleToggle('clean')}
            value={options.clean}
          />
        </View>
      </View>
      <View style={styles.option}>
        <Text style={styles.optionText}>Compression Quality</Text>
        <TextInput 
          style={styles.input} 
          value={compressionQuality} 
          onChangeText={setCompressionQuality} 
          placeholder="Enter quality (0-100)"
          keyboardType="numeric"  // Ensures only numbers are entered
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  optionsContainer: {
    flexDirection: 'row',
    padding: "10"
  },
  option: {
    flexDirection: 'column',
    marginRight: 10, // Add space between switches
    marginTop: -2,
    padding: 12,
  },
  optionText: {
    marginBottom: 7
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
    width: 120,  // Adjust the width as needed
  },
});

export default VideoOptions;
