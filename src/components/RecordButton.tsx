import React from 'react';
import { Pressable, StyleSheet, View, Dimensions } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
};

const RecordButton: React.FC<Props> = ({ isRecording, onStart, onStop }) => {
  return (
    <Pressable
      onPress={isRecording ? onStop : onStart}
      style={({ pressed }) => [
        styles.button,
        pressed && { opacity: 0.8 },
        isRecording && styles.recording,
      ]}
    >
      <View style={styles.innerCircle} />
    </Pressable>
  );
};

export default RecordButton;

const styles = StyleSheet.create({
  button: {
    width: screenWidth * 0.18,
    height: screenWidth * 0.18,
    borderRadius: screenWidth * 0.09,
    backgroundColor: '#b5b504',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  recording: {
    backgroundColor: '#8f0000',
  },
  innerCircle: {
    width: screenWidth * 0.07,
    height: screenWidth * 0.07,
    backgroundColor: '#adadad',
    borderRadius: 6,
    borderWidth: 1,
  },
});
